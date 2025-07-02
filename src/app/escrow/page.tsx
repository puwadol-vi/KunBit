'use client';

import { useState } from 'react';
import { Providers } from '@/components/Providers';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  Users,
  FileText,
  Gavel,
  Lock,
  Unlock,
  Eye,
  Send,
  Package,
  Truck
} from 'lucide-react';

export default function EscrowPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'disputed'>('active');

  const escrowTransactions = [
    {
      id: '1',
      item: {
        name: 'Rolex Submariner 116610LN',
        image: '/Rolex Submariner 116610LN.jpg',
        price: 8500,
      },
      buyer: {
        address: '0x1234...5678',
        name: 'John Doe',
        reputation: 4.8,
      },
      seller: {
        address: '0x8765...4321',
        name: 'Jane Smith',
        reputation: 4.9,
      },
      amount: 8500,
      status: 'pending_delivery',
      createdAt: '2024-01-15',
      estimatedDelivery: '2024-01-22',
      escrowFee: 85,
      trackingNumber: 'UPS123456789',
      dispute: null,
    },
    {
      id: '2',
      item: {
        name: 'Hermès Birkin 30cm',
        image: '/Hermès Birkin 30cm.avif',
        price: 12000,
      },
      buyer: {
        address: '0x9876...5432',
        name: 'Alice Johnson',
        reputation: 4.7,
      },
      seller: {
        address: '0x4321...8765',
        name: 'Bob Wilson',
        reputation: 4.6,
      },
      amount: 12000,
      status: 'delivered',
      createdAt: '2024-01-10',
      deliveredAt: '2024-01-18',
      escrowFee: 120,
      trackingNumber: 'FEDEX987654321',
      dispute: null,
    },
    {
      id: '3',
      item: {
        name: 'Banksy "Girl with Balloon" Print',
        image: '/api/placeholder/200/200',
        price: 5000,
      },
      buyer: {
        address: '0x5555...6666',
        name: 'Charlie Brown',
        reputation: 4.5,
      },
      seller: {
        address: '0x7777...8888',
        name: 'Diana Prince',
        reputation: 4.8,
      },
      amount: 5000,
      status: 'disputed',
      createdAt: '2024-01-12',
      dispute: {
        reason: 'Item condition differs from description',
        filedBy: 'buyer',
        filedAt: '2024-01-20',
        evidence: ['photos', 'description_mismatch'],
        daoVotes: {
          buyer: 12,
          seller: 8,
          total: 20,
        },
      },
      escrowFee: 50,
      trackingNumber: 'DHL555666777',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_delivery':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'disputed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_delivery':
        return <Clock className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'disputed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredTransactions = escrowTransactions.filter(tx => {
    if (activeTab === 'active') return tx.status === 'pending_delivery';
    if (activeTab === 'completed') return tx.status === 'delivered';
    if (activeTab === 'disputed') return tx.status === 'disputed';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Secure Escrow Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Protected transactions with smart contract escrow, automated delivery confirmation, 
            and decentralized dispute resolution via DAO voting.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">$1.2M</div>
                <div className="text-sm text-gray-600">Total Escrow Volume</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600 mb-2">98.5%</div>
                <div className="text-sm text-gray-600">Successful Transactions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">156</div>
                <div className="text-sm text-gray-600">Active Escrows</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-orange-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Disputes Resolved</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How Escrow Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                Secure Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Buyer pays into smart contract escrow. Funds are locked until delivery is confirmed or dispute is resolved.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                Delivery Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Seller ships item with tracking. Buyer confirms delivery within 48 hours or can initiate dispute.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-purple-600" />
                DAO Resolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Disputes resolved by DAO voting. Staked token holders vote on evidence to determine outcome.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Escrow Transactions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Escrow Transactions
            </h2>
            <div className="flex gap-2">
              <Button 
                variant={activeTab === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('active')}
              >
                Active
              </Button>
              <Button 
                variant={activeTab === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </Button>
              <Button 
                variant={activeTab === 'disputed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('disputed')}
              >
                Disputed
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredTransactions.map((tx) => (
              <Card key={tx.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Item Image */}
                    <img 
                      src={tx.item.image} 
                      alt={tx.item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    {/* Transaction Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{tx.item.name}</h3>
                          <p className="text-sm text-gray-600">
                            Transaction #{tx.id} • {formatCurrency(tx.amount)}
                          </p>
                        </div>
                        <Badge className={`flex items-center gap-1 ${getStatusColor(tx.status)}`}>
                          {getStatusIcon(tx.status)}
                          {tx.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      
                      {/* Parties */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Buyer</div>
                          <div className="text-sm text-gray-600">{tx.buyer.name}</div>
                          <div className="text-xs text-gray-500">{tx.buyer.address}</div>
                          <div className="text-xs text-gray-500">Reputation: {tx.buyer.reputation}/5</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Seller</div>
                          <div className="text-sm text-gray-600">{tx.seller.name}</div>
                          <div className="text-xs text-gray-500">{tx.seller.address}</div>
                          <div className="text-xs text-gray-500">Reputation: {tx.seller.reputation}/5</div>
                        </div>
                      </div>
                      
                      {/* Transaction Info */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <div className="text-gray-500">Escrow Fee</div>
                          <div className="font-medium">{formatCurrency(tx.escrowFee)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Tracking</div>
                          <div className="font-medium">{tx.trackingNumber}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Created</div>
                          <div className="font-medium">{tx.createdAt}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Est. Delivery</div>
                          <div className="font-medium">{tx.estimatedDelivery}</div>
                        </div>
                      </div>
                      
                      {/* Dispute Info */}
                      {tx.dispute && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <span className="font-medium text-red-800">Dispute Filed</span>
                          </div>
                          <div className="text-sm text-red-700 mb-2">
                            Reason: {tx.dispute.reason}
                          </div>
                          <div className="text-sm text-red-600">
                            Filed by: {tx.dispute.filedBy} on {tx.dispute.filedAt}
                          </div>
                          
                          {/* DAO Voting Progress */}
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>DAO Voting Progress</span>
                              <span>{tx.dispute.daoVotes.total} votes cast</span>
                            </div>
                            <Progress 
                              value={(tx.dispute.daoVotes.buyer / tx.dispute.daoVotes.total) * 100} 
                              className="mb-2" 
                            />
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Buyer: {tx.dispute.daoVotes.buyer} votes</span>
                              <span>Seller: {tx.dispute.daoVotes.seller} votes</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        {tx.status === 'pending_delivery' && (
                          <>
                            <Button size="sm" className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Confirm Delivery
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4" />
                              Report Issue
                            </Button>
                          </>
                        )}
                        {tx.status === 'disputed' && (
                          <>
                            <Button size="sm" className="flex items-center gap-2">
                              <Gavel className="h-4 w-4" />
                              Vote on Dispute
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              View Evidence
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Escrow Process Flow */}
        <div className="bg-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Escrow Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Payment Locked</h3>
              <p className="text-sm text-gray-600">
                Buyer pays into smart contract escrow. Funds are securely locked until conditions are met.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">2. Item Shipped</h3>
              <p className="text-sm text-gray-600">
                Seller ships item with tracking number. Smart contract monitors delivery status.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">3. Delivery Confirmed</h3>
              <p className="text-sm text-gray-600">
                Buyer confirms delivery within 48 hours. Funds automatically released to seller.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gavel className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">4. Dispute Resolution</h3>
              <p className="text-sm text-gray-600">
                If issues arise, DAO members vote on evidence to resolve disputes fairly.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready for Secure Trading?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Experience the most secure way to trade digital collectibles with our smart contract escrow system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Start Secure Transaction
            </Button>
            <Button variant="outline" size="lg">
              Learn About DAO Governance
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 