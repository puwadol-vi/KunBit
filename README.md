# KunBit - Digital Collectibles Marketplace

A comprehensive Web3 marketplace for digital collectibles with advanced features including fractional ownership, escrow services, authenticity verification, and DAO governance.

## 🚀 Features

### 1. Digital Certificate & Authenticity Tag (มือ 1)
- **NFT-based Digital Certificates**: Every collectible gets a unique NFT certificate with serial number, production date, and metadata
- **Brand Verification**: Authorized brands can verify authenticity on-chain using verified wallets
- **Anti-Counterfeit Protection**: Reduces fake items in secondary market and builds trust

### 2. Fractional Ownership (ซื้อเป็นเจ้าของร่วม)
- **Shared Ownership**: Multiple users can own fractions of high-value collectibles
- **Democratic Voting**: Shareholders vote on major decisions like selling the entire NFT
- **Increased Liquidity**: Makes expensive items accessible to more collectors

### 3. Escrow Smart Contract (มี dispute flow ชัดเจน)
- **Secure Transactions**: Funds held in smart contract until delivery confirmation
- **Dispute Resolution**: Clear process with evidence submission and DAO voting
- **Automated Rules**: Return shipments require tracking numbers, etc.

### 4. Reputation System (NFT per Category)
- **Category-Specific Profiles**: Separate reputation NFTs for different collectible types
- **Transaction History**: Tracks purchases, sales, reviews, and disputes
- **Whitelist Access**: High-reputation users get early access and special privileges

### 5. KYC + Physical Custody (Optional)
- **High-Value Verification**: Items over 100k THB can use certified custody nodes
- **Physical Inspection**: Professional verification of condition and authenticity
- **KYC Integration**: Optional identity verification for enhanced trust

### 6. Advanced Marketplace Features
- **Watchlist & Bounties**: Set alerts and offer rewards for specific items
- **Bid System**: Auto-matching bids with available listings
- **Smart Alerts**: Notifications for similar items and price changes

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Blockchain**: Ethers.js, Wagmi, Viem
- **Smart Contracts**: Solidity (Ethereum/Polygon)
- **Storage**: IPFS for metadata and files
- **State Management**: React Query, React Hook Form
- **Authentication**: Web3 wallet connection (MetaMask, WalletConnect)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd KunBit-tracking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_nft_contract_address
   NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS=your_escrow_contract_address
   NEXT_PUBLIC_FRACTIONAL_CONTRACT_ADDRESS=your_fractional_contract_address
   NEXT_PUBLIC_REPUTATION_CONTRACT_ADDRESS=your_reputation_contract_address
   NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
   NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── ipfs/         # IPFS upload endpoints
│   ├── dashboard/        # Dashboard pages
│   └── page.tsx          # Homepage
├── components/           # React components
│   ├── marketplace/     # Marketplace-specific components
│   │   ├── CollectiblesGrid.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StatsOverview.tsx
│   │   └── MarketplaceHeader.tsx
│   ├── ui/              # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   └── WalletConnect.tsx
├── lib/                 # Utility libraries
│   ├── blockchain.ts    # Blockchain configuration
│   ├── blockchain-service.ts # Smart contract interactions
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
```

## 🔧 Smart Contracts

The application uses several smart contracts:

1. **NFT Contract**: ERC-721 for digital certificates and collectibles
2. **Escrow Contract**: Secure transaction handling with dispute resolution
3. **Fractional Contract**: ERC-20 tokens representing ownership shares
4. **Reputation Contract**: NFT-based reputation scoring system

## 🎯 Key Components

### WalletConnect
- Secure Web3 wallet connection
- Real-time balance display
- Connection status management

### Marketplace Header
- Navigation to all major features
- Notification system
- User account management

### Collectibles Grid
- Responsive grid layout
- Item details and pricing
- Authenticity status indicators

### Category Filter
- Filter by collectible type
- Search functionality
- Real-time filtering

## 🚀 Deployment

### Prerequisites
- Node.js 18+ 
- MetaMask or compatible Web3 wallet
- IPFS node or Pinata account
- Smart contracts deployed to target network

### Build for Production
```bash
npm run build
npm start
```

## 🔒 Security Features

- **Smart Contract Audits**: All contracts should be audited before deployment
- **Access Control**: Role-based permissions for admin functions
- **Input Validation**: Comprehensive validation on all user inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **Secure Storage**: IPFS for decentralized, tamper-proof storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Join our community Discord

## 🔮 Roadmap

- [ ] Smart contract deployment scripts
- [ ] Advanced search and filtering
- [ ] Mobile app development
- [ ] Multi-chain support
- [ ] Advanced analytics dashboard
- [ ] Social features and community
- [ ] AI-powered authenticity detection
- [ ] Integration with major marketplaces

---

**Built with ❤️ for the digital collectibles community**
