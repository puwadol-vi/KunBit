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
  Vote, 
  Gavel, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  FileText,
  Award,
  Star,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';

export default function DAOPage() {
  const [activeTab, setActiveTab] = useState<'proposals' | 'disputes' | 'governance' | 'rewards'>('proposals');

  const proposals = [
    {
      id: '1',
      title: 'Increase Escrow Fee to 1.5%',
      description: 'Proposal to increase escrow fees from 1% to 1.5% to improve dispute resolution funding.',
      category: 'fee_change',
      status: 'active',
      createdBy: '0x1234...5678',
      createdAt: '2024-01-15',
      endDate: '2024-01-25',
      votes: {
        for: 1250,
        against: 320,
        total: 1570,
      },
      quorum: 1000,
      minVotes: 51,
      rewards: 50,
    },
    {
      id: '2',
      title: 'Add New Brand Verification Partner',
      description: 'Proposal to add Cartier as an official brand verification partner.',
      category: 'partnership',
      status: 'active',
      createdBy: '0x8765...4321',
      createdAt: '2024-01-18',
      endDate: '2024-01-28',
      votes: {
        for: 890,
        against: 120,
        total: 1010,
      },
      quorum: 1000,
      minVotes: 51,
      rewards: 30,
    },
    {
      id: '3',
      title: 'Implement New Dispute Resolution Process',
      description: 'Proposal to implement a new 3-tier dispute resolution system.',
      category: 'governance',
      status: 'passed',
      createdBy: '0x9876...5432',
      createdAt: '2024-01-10',
      endDate: '2024-01-20',
      votes: {
        for: 1450,
        against: 250,
        total: 1700,
      },
      quorum: 1000,
      minVotes: 51,
      rewards: 75,
    },
  ];

  const disputes = [
    {
      id: '1',
      title: 'Rolex Submariner Authenticity Dispute',
      description: 'Buyer claims the Rolex Submariner is counterfeit based on serial number verification.',
      status: 'voting',
      filedBy: '0x5555...6666',
      filedAt: '2024-01-20',
      evidence: [
        'Serial number verification report',
        'Expert authentication photos',
        'Original purchase receipt',
      ],
      votes: {
        buyer: 45,
        seller: 32,
        total: 77,
      },
      endDate: '2024-01-25',
      rewards: 25,
    },
    {
      id: '2',
      title: 'Hermès Birkin Condition Dispute',
      description: 'Buyer claims the bag condition differs significantly from the listing description.',
      status: 'resolved',
      filedBy: '0x7777...8888',
      filedAt: '2024-01-15',
      evidence: [
        'Condition comparison photos',
        'Original listing screenshots',
        'Third-party inspection report',
      ],
      votes: {
        buyer: 28,
        seller: 15,
        total: 43,
      },
      resolution: 'Refund buyer 30% of purchase price',
      rewards: 20,
    },
  ];

  const governanceStats = {
    totalMembers: 2840,
    activeVoters: 1250,
    totalProposals: 45,
    passedProposals: 32,
    totalDisputes: 156,
    resolvedDisputes: 142,
    totalRewards: 2840,
  };

  const userStats = {
    votingPower: 1250,
    stakedTokens: 5000,
    participatedVotes: 23,
    earnedRewards: 180,
    reputation: 4.8,
  };

  const calculateProgress = (current: number, total: number) => {
    return (current / total) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'voting':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4" />;
      case 'passed':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4" />;
      case 'voting':
        return <Vote className="h-4 w-4" />;
      case 'resolved':
        return <Gavel className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Decentralized Autonomous Organization
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Participate in governance, vote on proposals, resolve disputes, and earn rewards 
            by contributing to the marketplace ecosystem.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">{governanceStats.totalMembers}</div>
                <div className="text-sm text-gray-600">Total Members</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600 mb-2">{governanceStats.activeVoters}</div>
                <div className="text-sm text-gray-600">Active Voters</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">{governanceStats.totalProposals}</div>
                <div className="text-sm text-gray-600">Total Proposals</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-orange-600 mb-2">{governanceStats.totalRewards}</div>
                <div className="text-sm text-gray-600">Total Rewards Distributed</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User Stats */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{userStats.votingPower}</div>
                  <div className="text-sm text-gray-600">Voting Power</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">{userStats.stakedTokens}</div>
                  <div className="text-sm text-gray-600">Staked Tokens</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{userStats.participatedVotes}</div>
                  <div className="text-sm text-gray-600">Votes Participated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">{userStats.earnedRewards}</div>
                  <div className="text-sm text-gray-600">Earned Rewards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-2">{userStats.reputation}</div>
                  <div className="text-sm text-gray-600">Reputation Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button 
            variant={activeTab === 'proposals' ? 'default' : 'outline'}
            onClick={() => setActiveTab('proposals')}
            className="flex items-center gap-2"
          >
            <Vote className="h-4 w-4" />
            Governance Proposals
          </Button>
          <Button 
            variant={activeTab === 'disputes' ? 'default' : 'outline'}
            onClick={() => setActiveTab('disputes')}
            className="flex items-center gap-2"
          >
            <Gavel className="h-4 w-4" />
            Dispute Resolution
          </Button>
          <Button 
            variant={activeTab === 'governance' ? 'default' : 'outline'}
            onClick={() => setActiveTab('governance')}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Governance Info
          </Button>
          <Button 
            variant={activeTab === 'rewards' ? 'default' : 'outline'}
            onClick={() => setActiveTab('rewards')}
            className="flex items-center gap-2"
          >
            <Award className="h-4 w-4" />
            Rewards & Staking
          </Button>
        </div>

        {/* Governance Proposals */}
        {activeTab === 'proposals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Active Proposals
              </h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Proposal
              </Button>
            </div>
            
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{proposal.title}</h3>
                        <p className="text-gray-600 mb-3">{proposal.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>By: {proposal.createdBy}</span>
                          <span>Created: {proposal.createdAt}</span>
                          <span>Ends: {proposal.endDate}</span>
                        </div>
                      </div>
                      <Badge className={`flex items-center gap-1 ${getStatusColor(proposal.status)}`}>
                        {getStatusIcon(proposal.status)}
                        {proposal.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    {/* Voting Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Voting Progress</span>
                        <span>{proposal.votes.total} votes cast</span>
                      </div>
                      <Progress value={calculateProgress(proposal.votes.total, proposal.quorum)} className="mb-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>For: {proposal.votes.for} ({((proposal.votes.for / proposal.votes.total) * 100).toFixed(1)}%)</span>
                        <span>Against: {proposal.votes.against} ({((proposal.votes.against / proposal.votes.total) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                    
                    {/* Requirements */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-gray-500">Quorum</div>
                        <div className="font-medium">{proposal.quorum}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Min Votes</div>
                        <div className="font-medium">{proposal.minVotes}%</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Rewards</div>
                        <div className="font-medium">{proposal.rewards} tokens</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Category</div>
                        <div className="font-medium capitalize">{proposal.category.replace('_', ' ')}</div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex items-center gap-2">
                        <Vote className="h-4 w-4" />
                        Vote For
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Vote Against
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Dispute Resolution */}
        {activeTab === 'disputes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Active Disputes
              </h2>
              <Button className="flex items-center gap-2">
                <Gavel className="h-4 w-4" />
                View All Disputes
              </Button>
            </div>
            
            <div className="space-y-4">
              {disputes.map((dispute) => (
                <Card key={dispute.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{dispute.title}</h3>
                        <p className="text-gray-600 mb-3">{dispute.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Filed by: {dispute.filedBy}</span>
                          <span>Filed: {dispute.filedAt}</span>
                          <span>Ends: {dispute.endDate}</span>
                        </div>
                      </div>
                      <Badge className={`flex items-center gap-1 ${getStatusColor(dispute.status)}`}>
                        {getStatusIcon(dispute.status)}
                        {dispute.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    {/* Evidence */}
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Evidence Submitted</div>
                      <div className="space-y-1">
                        {dispute.evidence.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <FileText className="h-3 w-3" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Voting Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Voting Progress</span>
                        <span>{dispute.votes.total} votes cast</span>
                      </div>
                      <Progress 
                        value={(dispute.votes.buyer / dispute.votes.total) * 100} 
                        className="mb-2" 
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Buyer: {dispute.votes.buyer} votes</span>
                        <span>Seller: {dispute.votes.seller} votes</span>
                      </div>
                    </div>
                    
                    {/* Resolution */}
                    {dispute.resolution && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <div className="text-sm font-medium text-green-800 mb-1">Resolution</div>
                        <div className="text-sm text-green-700">{dispute.resolution}</div>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex items-center gap-2">
                        <Vote className="h-4 w-4" />
                        Vote for Buyer
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Vote className="h-4 w-4" />
                        Vote for Seller
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Evidence
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Governance Info */}
        {activeTab === 'governance' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Governance Information
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Voting Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Minimum Staked Tokens</span>
                      <span className="text-sm font-medium">1,000 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Voting Power Multiplier</span>
                      <span className="text-sm font-medium">1 token = 1 vote</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Proposal Quorum</span>
                      <span className="text-sm font-medium">1,000 votes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Dispute Quorum</span>
                      <span className="text-sm font-medium">50 votes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Voting Period</span>
                      <span className="text-sm font-medium">7-14 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Governance Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Proposals</span>
                      <span className="text-sm font-medium">{governanceStats.totalProposals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Passed Proposals</span>
                      <span className="text-sm font-medium">{governanceStats.passedProposals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="text-sm font-medium">
                        {((governanceStats.passedProposals / governanceStats.totalProposals) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Disputes</span>
                      <span className="text-sm font-medium">{governanceStats.totalDisputes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Resolved Disputes</span>
                      <span className="text-sm font-medium">{governanceStats.resolvedDisputes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Rewards & Staking */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Rewards & Staking
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Earning Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium">Voting on Proposals</div>
                        <div className="text-sm text-gray-600">Earn tokens for participating in governance</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600">25-75 tokens</div>
                        <div className="text-xs text-gray-500">per vote</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">Dispute Resolution</div>
                        <div className="text-sm text-gray-600">Earn tokens for resolving disputes</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">20-50 tokens</div>
                        <div className="text-xs text-gray-500">per dispute</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium">Staking Rewards</div>
                        <div className="text-sm text-gray-600">Earn passive income from staking</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">8-12% APY</div>
                        <div className="text-xs text-gray-500">annual return</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Staking Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Your Staked Amount</span>
                      <span className="text-sm font-medium">{userStats.stakedTokens} tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Current APY</span>
                      <span className="text-sm font-medium">10.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Lock Period</span>
                      <span className="text-sm font-medium">30 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Unstaking Fee</span>
                      <span className="text-sm font-medium">1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Rewards Earned</span>
                      <span className="text-sm font-medium">{userStats.earnedRewards} tokens</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1" size="sm">
                      Stake More
                    </Button>
                    <Button variant="outline" size="sm">
                      Unstake
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Participate in Governance?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join the DAO and help shape the future of the digital collectibles marketplace while earning rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2">
              <Vote className="h-5 w-5" />
              Start Voting
            </Button>
            <Button variant="outline" size="lg">
              Learn About Staking
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 