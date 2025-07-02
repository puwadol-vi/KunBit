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
  Users, 
  PieChart, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye
} from 'lucide-react';

export default function FractionalPage() {
  const [selectedFractional, setSelectedFractional] = useState<string | null>(null);

  const fractionalItems = [
    {
      id: '1',
      name: 'Banksy "Girl with Balloon" Original',
      category: 'art',
      totalValue: 500000,
      totalShares: 1000,
      pricePerShare: 500,
      soldShares: 750,
      image: '/api/placeholder/400/300',
      verified: true,
      description: 'Original Banksy artwork with full provenance and authentication.',
      benefits: [
        'Voting rights on major decisions',
        'Quarterly dividend distributions',
        'Exclusive access to private viewings',
        'Insurance coverage included'
      ],
      timeline: {
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        currentPhase: 'Active Trading'
      },
      governance: {
        minVotes: 51,
        quorum: 30,
        lockPeriod: '30 days'
      }
    },
    {
      id: '2',
      name: 'Rolex Daytona "Paul Newman" 1969',
      category: 'watches',
      totalValue: 250000,
      totalShares: 500,
      pricePerShare: 500,
      soldShares: 320,
      image: '/api/placeholder/400/300',
      verified: true,
      description: 'Rare vintage Rolex Daytona with Paul Newman dial, fully authenticated.',
      benefits: [
        'Shared custody in secure vault',
        'Annual physical inspection',
        'Trading rights on secondary market',
        'Professional maintenance included'
      ],
      timeline: {
        startDate: '2024-02-01',
        endDate: '2024-04-01',
        currentPhase: 'Fundraising'
      },
      governance: {
        minVotes: 60,
        quorum: 40,
        lockPeriod: '45 days'
      }
    },
    {
      id: '3',
      name: 'Hermès Birkin 30cm "Himalaya"',
      category: 'bags',
      totalValue: 180000,
      totalShares: 360,
      pricePerShare: 500,
      soldShares: 180,
      image: '/Hermès Birkin 30cm.avif',
      verified: true,
      description: 'Ultra-rare Hermès Birkin with Himalayan crocodile leather.',
      benefits: [
        'Rotating display schedule',
        'Authentication verification',
        'Storage in climate-controlled facility',
        'Insurance and security coverage'
      ],
      timeline: {
        startDate: '2024-01-20',
        endDate: '2024-03-20',
        currentPhase: 'Fundraising'
      },
      governance: {
        minVotes: 55,
        quorum: 35,
        lockPeriod: '30 days'
      }
    }
  ];

  const calculateProgress = (sold: number, total: number) => {
    return (sold / total) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fractional Ownership
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Co-own high-value collectibles with other investors. Each share represents a portion of ownership 
            with voting rights and profit sharing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">$2.3M</div>
                <div className="text-sm text-gray-600">Total Value Under Management</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600 mb-2">1,860</div>
                <div className="text-sm text-gray-600">Active Shareholders</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Fractional Assets</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-orange-600 mb-2">18.5%</div>
                <div className="text-sm text-gray-600">Average Annual Return</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Shared Ownership
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Multiple investors can own shares of high-value items, making expensive collectibles accessible to everyone.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-green-600" />
                Voting Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Each share comes with voting rights on major decisions like selling, displaying, or maintaining the asset.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Profit Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Shareholders receive proportional profits from sales, exhibitions, or licensing of the shared asset.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Fractional Offerings */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Active Fractional Offerings
            </h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Offering
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {fractionalItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Fundraising Progress</span>
                      <span>{item.soldShares}/{item.totalShares} shares</span>
                    </div>
                    <Progress value={calculateProgress(item.soldShares, item.totalShares)} className="mb-2" />
                    <div className="text-xs text-gray-500">
                      {calculateProgress(item.soldShares, item.totalShares).toFixed(1)}% funded
                    </div>
                  </div>
                  
                  {/* Financial Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Total Value</div>
                      <div className="font-semibold">{formatCurrency(item.totalValue)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Price per Share</div>
                      <div className="font-semibold">{formatCurrency(item.pricePerShare)}</div>
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{item.timeline.currentPhase}</span>
                  </div>
                  
                  {/* Governance */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium mb-2">Governance</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Min Votes:</span> {item.governance.minVotes}%
                      </div>
                      <div>
                        <span className="text-gray-500">Quorum:</span> {item.governance.quorum}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Buy Shares
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Fractional Ownership Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Asset Selection</h3>
              <p className="text-sm text-gray-600">
                High-value collectibles are selected and professionally authenticated
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Tokenization</h3>
              <p className="text-sm text-gray-600">
                The asset is divided into shares represented by fractional NFTs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Trading</h3>
              <p className="text-sm text-gray-600">
                Shares are sold to investors who can trade them on the marketplace
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Governance</h3>
              <p className="text-sm text-gray-600">
                Shareholders vote on decisions and share in profits
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Fractional Investing?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join the future of collective ownership and make high-value collectibles accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Browse Available Shares
            </Button>
            <Button variant="outline" size="lg">
              Learn More About Governance
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 