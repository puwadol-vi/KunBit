import { ethers } from 'ethers';
import { NFT_ABI, ESCROW_ABI, FRACTIONAL_ABI, REPUTATION_ABI, CONTRACT_ADDRESSES } from './blockchain';
import { Collectible, DigitalCertificate } from './types';

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string | number | boolean; timestamp?: string }>;
  properties?: {
    files?: Array<{ uri: string; type: string }>;
  };
}

interface LogEvent {
  fragment?: {
    name: string;
  };
  args?: {
    to?: string;
    tokenId?: ethers.BigNumberish;
  };
}

export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  constructor() {
    // Initialize provider only on client side
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum as any);
    }
  }

  async connectWallet(): Promise<string> {
    if (!this.provider) {
      throw new Error('No Ethereum provider found');
    }

    try {
      await this.provider.send('eth_requestAccounts', []);
      this.signer = await this.provider.getSigner();
      return await this.signer.getAddress();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  async getConnectedAddress(): Promise<string | null> {
    if (!this.signer) return null;
    return await this.signer.getAddress();
  }

  // NFT Functions
  async mintNFT(collectible: Collectible, metadata: NFTMetadata): Promise<string> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const nftContract = new ethers.Contract(CONTRACT_ADDRESSES.NFT, NFT_ABI, this.signer);
    
    // Upload metadata to IPFS
    const metadataUri = await this.uploadToIPFS(metadata);
    
    // Mint NFT
    const tx = await nftContract.mint(await this.signer.getAddress(), metadataUri);
    const receipt = await tx.wait();
    
    // Get token ID from event
    const signerAddress = await this.signer.getAddress();
    const event = receipt.logs.find((log: LogEvent) => 
      log.fragment?.name === 'Transfer' && log.args?.to === signerAddress
    );
    
    return event?.args?.tokenId?.toString() || '';
  }

  async transferNFT(tokenId: string, to: string): Promise<void> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const nftContract = new ethers.Contract(CONTRACT_ADDRESSES.NFT, NFT_ABI, this.signer);
    const tx = await nftContract.transferFrom(await this.signer.getAddress(), to, tokenId);
    await tx.wait();
  }

  async getNFTOwner(tokenId: string): Promise<string> {
    if (!this.provider) throw new Error('No provider available');
    
    const nftContract = new ethers.Contract(CONTRACT_ADDRESSES.NFT, NFT_ABI, this.provider);
    return await nftContract.ownerOf(tokenId);
  }

  async getNFTMetadata(tokenId: string): Promise<NFTMetadata> {
    if (!this.provider) throw new Error('No provider available');
    
    const nftContract = new ethers.Contract(CONTRACT_ADDRESSES.NFT, NFT_ABI, this.provider);
    const uri = await nftContract.tokenURI(tokenId);
    const response = await fetch(uri);
    return await response.json();
  }

  // Digital Certificate Functions
  async createDigitalCertificate(certificate: DigitalCertificate): Promise<string> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const nftContract = new ethers.Contract(CONTRACT_ADDRESSES.NFT, NFT_ABI, this.signer);
    
    // Create certificate metadata
    const certificateMetadata: NFTMetadata = {
      name: `Digital Certificate - ${certificate.serialNumber}`,
      description: `Authenticity certificate for ${certificate.metadata.brand} ${certificate.metadata.model}`,
      image: certificate.metadata.images[0],
      attributes: [
        { trait_type: 'Serial Number', value: certificate.serialNumber },
        { trait_type: 'Manufacturer', value: certificate.manufacturer },
        { trait_type: 'Production Date', value: certificate.productionDate.toISOString() },
        { trait_type: 'Authenticity Verified', value: certificate.authenticityVerified },
        { trait_type: 'Verified By', value: certificate.verifiedBy.join(', ') },
        { trait_type: 'Brand', value: certificate.metadata.brand },
        { trait_type: 'Model', value: certificate.metadata.model },
        { trait_type: 'Condition', value: certificate.metadata.condition },
      ],
      properties: {
        files: certificate.metadata.documents.map((doc) => ({
          uri: doc,
          type: 'application/pdf'
        }))
      }
    };
    
    const metadataUri = await this.uploadToIPFS(certificateMetadata);
    const tx = await nftContract.mint(await this.signer.getAddress(), metadataUri);
    const receipt = await tx.wait();
    
    const signerAddress = await this.signer.getAddress();
    const event = receipt.logs.find((log: LogEvent) => 
      log.fragment?.name === 'Transfer' && log.args?.to === signerAddress
    );
    
    return event?.args?.tokenId?.toString() || '';
  }

  async verifyAuthenticity(tokenId: string, verifierAddress: string): Promise<void> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    // This would typically involve a more complex verification system
    // For now, we'll just update the metadata
    const metadata = await this.getNFTMetadata(tokenId);
    metadata.attributes.push({
      trait_type: 'Verified By',
      value: verifierAddress,
      timestamp: new Date().toISOString()
    });
    
    await this.uploadToIPFS(metadata);
    // Note: In a real implementation, you'd need a contract function to update metadata
  }

  // Fractional Ownership Functions
  async createFractionalOwnership(
    collectibleId: string,
    totalShares: number,
    pricePerShare: number
  ): Promise<string> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const fractionalContract = new ethers.Contract(
      CONTRACT_ADDRESSES.FRACTIONAL,
      FRACTIONAL_ABI,
      this.signer
    );
    
    const tx = await fractionalContract.createFractional(
      collectibleId,
      totalShares,
      ethers.parseEther(pricePerShare.toString())
    );
    
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }

  async buyShares(fractionalId: string, shares: number): Promise<void> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const fractionalContract = new ethers.Contract(
      CONTRACT_ADDRESSES.FRACTIONAL,
      FRACTIONAL_ABI,
      this.signer
    );
    
    const pricePerShare = await fractionalContract.pricePerShare();
    const totalCost = pricePerShare * BigInt(shares);
    
    const tx = await fractionalContract.buyShares(shares, { value: totalCost });
    await tx.wait();
  }

  async sellShares(fractionalId: string, shares: number): Promise<void> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const fractionalContract = new ethers.Contract(
      CONTRACT_ADDRESSES.FRACTIONAL,
      FRACTIONAL_ABI,
      this.signer
    );
    
    const tx = await fractionalContract.sellShares(shares);
    await tx.wait();
  }

  async getShareBalance(fractionalId: string, address: string): Promise<number> {
    if (!this.provider) throw new Error('No provider available');
    
    const fractionalContract = new ethers.Contract(
      CONTRACT_ADDRESSES.FRACTIONAL,
      FRACTIONAL_ABI,
      this.provider
    );
    
    const balance = await fractionalContract.balanceOf(address);
    return Number(balance);
  }

  // Escrow Functions
  async createEscrow(
    buyer: string,
    seller: string,
    amount: number
  ): Promise<string> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const escrowContract = new ethers.Contract(
      CONTRACT_ADDRESSES.ESCROW,
      ESCROW_ABI,
      this.signer
    );
    
    const tx = await escrowContract.createEscrow(
      buyer,
      seller,
      ethers.parseEther(amount.toString()),
      { value: ethers.parseEther(amount.toString()) }
    );
    
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }

  async confirmDelivery(): Promise<void> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const escrowContract = new ethers.Contract(
      CONTRACT_ADDRESSES.ESCROW,
      ESCROW_ABI,
      this.signer
    );
    
    const tx = await escrowContract.confirmDelivery();
    await tx.wait();
  }

  async initiateDispute(reason: string): Promise<void> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const escrowContract = new ethers.Contract(
      CONTRACT_ADDRESSES.ESCROW,
      ESCROW_ABI,
      this.signer
    );
    
    const tx = await escrowContract.initiateDispute(reason);
    await tx.wait();
  }

  async resolveDispute(refundBuyer: boolean): Promise<void> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const escrowContract = new ethers.Contract(
      CONTRACT_ADDRESSES.ESCROW,
      ESCROW_ABI,
      this.signer
    );
    
    const tx = await escrowContract.resolveDispute(refundBuyer);
    await tx.wait();
  }

  // Reputation Functions
  async updateReputationScore(address: string, score: number): Promise<void> {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const reputationContract = new ethers.Contract(
      CONTRACT_ADDRESSES.REPUTATION,
      REPUTATION_ABI,
      this.signer
    );
    
    const tx = await reputationContract.updateScore(address, score);
    await tx.wait();
  }

  async getReputationScore(address: string): Promise<number> {
    if (!this.provider) throw new Error('No provider available');
    
    const reputationContract = new ethers.Contract(
      CONTRACT_ADDRESSES.REPUTATION,
      REPUTATION_ABI,
      this.provider
    );
    
    const score = await reputationContract.getScore(address);
    return Number(score);
  }

  // IPFS Functions
  async uploadToIPFS(data: NFTMetadata): Promise<string> {
    try {
      const response = await fetch('/api/ipfs/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload to IPFS');
      }
      
      const result = await response.json();
      return result.ipfsHash;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  }

  async uploadFileToIPFS(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/ipfs/upload-file', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload file to IPFS');
      }
      
      const result = await response.json();
      return result.ipfsHash;
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      throw error;
    }
  }

  // Utility Functions
  async getBalance(address: string): Promise<string> {
    if (!this.provider) throw new Error('No provider available');
    
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  async signMessage(message: string): Promise<string> {
    if (!this.signer) throw new Error('Wallet not connected');
    return await this.signer.signMessage(message);
  }

  async verifySignature(message: string, signature: string, address: string): Promise<boolean> {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  }
}

// Singleton instance
export const blockchainService = new BlockchainService(); 