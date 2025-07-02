export interface User {
  id: string;
  walletAddress: string;
  username: string;
  email?: string;
  avatar?: string;
  kycVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReputationProfile {
  id: string;
  userId: string;
  category: CollectibleCategory;
  totalTransactions: number;
  positiveReviews: number;
  negativeReviews: number;
  disputesWon: number;
  disputesLost: number;
  averageRating: number;
  socialCredit: number;
  nftTokenId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectibleCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  verificationRequired: boolean;
  minValueForCustody: number;
}

export interface DigitalCertificate {
  id: string;
  nftTokenId: string;
  serialNumber: string;
  manufacturer: string;
  productionDate: Date;
  authenticityVerified: boolean;
  verifiedBy: string[];
  metadata: {
    brand: string;
    model: string;
    condition: string;
    materials: string[];
    dimensions?: string;
    weight?: string;
    images: string[];
    documents: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Collectible {
  id: string;
  nftTokenId: string;
  title: string;
  description: string;
  category: CollectibleCategory;
  ownerId: string;
  currentPrice: number;
  originalPrice: number;
  currency: string;
  images: string[];
  digitalCertificate?: DigitalCertificate;
  fractionalOwnership?: FractionalOwnership;
  condition: 'mint' | 'excellent' | 'good' | 'fair' | 'poor';
  authenticityStatus: 'pending' | 'verified' | 'rejected';
  custodyStatus: 'owner' | 'escrow' | 'custody';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FractionalOwnership {
  id: string;
  collectibleId: string;
  totalShares: number;
  availableShares: number;
  pricePerShare: number;
  shareholders: Shareholder[];
  votingThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shareholder {
  userId: string;
  shares: number;
  percentage: number;
  joinedAt: Date;
}

export interface EscrowTransaction {
  id: string;
  collectibleId: string;
  sellerId: string;
  buyerId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'funded' | 'shipped' | 'delivered' | 'completed' | 'disputed' | 'refunded';
  smartContractAddress: string;
  trackingNumber?: string;
  returnTrackingNumber?: string;
  disputeReason?: string;
  disputeEvidence?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Dispute {
  id: string;
  escrowId: string;
  initiatorId: string;
  reason: string;
  evidence: string[];
  status: 'open' | 'voting' | 'resolved';
  votes: DisputeVote[];
  resolution?: 'refund' | 'release' | 'partial';
  createdAt: Date;
  updatedAt: Date;
}

export interface DisputeVote {
  voterId: string;
  vote: 'refund' | 'release' | 'partial';
  reason: string;
  stakeAmount: number;
  votedAt: Date;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: CollectibleCategory;
  maxPrice: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bounty {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: CollectibleCategory;
  reward: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bid {
  id: string;
  userId: string;
  collectibleId?: string;
  category?: CollectibleCategory;
  amount: number;
  currency: string;
  isActive: boolean;
  autoMatch: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  type: 'sale' | 'purchase' | 'fractional_buy' | 'fractional_sell' | 'escrow';
  collectibleId: string;
  sellerId: string;
  buyerId: string;
  amount: number;
  currency: string;
  shares?: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  blockchainTxHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  transactionId: string;
  reviewerId: string;
  reviewedId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Alert {
  id: string;
  userId: string;
  type: 'similar_item' | 'price_drop' | 'new_listing';
  collectibleId?: string;
  category?: CollectibleCategory;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface CustodyNode {
  id: string;
  name: string;
  address: string;
  verificationFee: number;
  supportedCategories: CollectibleCategory[];
  isActive: boolean;
  rating: number;
  totalVerifications: number;
  createdAt: Date;
}

export interface CustodyVerification {
  id: string;
  collectibleId: string;
  nodeId: string;
  status: 'pending' | 'verified' | 'rejected';
  verificationDetails: {
    condition: string;
    authenticity: boolean;
    referencePhotos: string[];
    notes: string;
  };
  fee: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface BrandVerification {
  id: string;
  brandName: string;
  walletAddress: string;
  verifiedAt: Date;
  isActive: boolean;
  supportedCategories: CollectibleCategory[];
}

export interface MarketplaceStats {
  totalCollectibles: number;
  totalUsers: number;
  totalTransactions: number;
  totalVolume: number;
  averagePrice: number;
  activeListings: number;
  categories: {
    category: CollectibleCategory;
    count: number;
    volume: number;
  }[];
}

export type CollectibleStatus = 'draft' | 'listed' | 'sold' | 'delisted';
export type EscrowStatus = 'pending' | 'funded' | 'shipped' | 'delivered' | 'completed' | 'disputed' | 'refunded';
export type DisputeStatus = 'open' | 'voting' | 'resolved';
export type VerificationStatus = 'pending' | 'verified' | 'rejected'; 