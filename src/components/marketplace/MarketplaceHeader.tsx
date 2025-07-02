'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Bell, 
  User, 
  Shield, 
  Gem, 
  Settings,
  Wallet,
  CheckCircle,
  XCircle,
  X,
} from 'lucide-react';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function MarketplaceHeader() {
  const [notifications] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isSocialLoginOpen, setIsSocialLoginOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
  });

  const connectWallet = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await connect({ connector: injected() });
      setIsCardOpen(false); // Close card after successful connection
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    try {
      disconnect();
      setIsCardOpen(false); // Close card after disconnection
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const openSocialLogin = () => {
    setIsSocialLoginOpen(true);
    setIsCardOpen(false); // Close wallet card when opening social login
  };

  const closeSocialLogin = () => {
    setIsSocialLoginOpen(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Gem className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  KunBit
                </span>
              </Link>
            
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Marketplace
              </Link>
              <Link href="/orders" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Orders
              </Link>
              <Link href="/my-collectibles" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                My Collectibles
              </Link>
            </nav>



            {/* Actions */}
            <div className="flex items-center gap-3">

              <div className="hidden md:flex items-center gap-1">
                <Badge variant="secondary" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
                {/* <Badge variant="outline" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  DAO
                </Badge> */}
              </div>
              {/* Search */}
              {/* <Button variant="ghost" size="sm" className="hidden md:flex">
                <Search className="h-4 w-4" />
              </Button> */}

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative mr-2">
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* Create Listing */}
              <Link href="/list-item">
                <Button size="sm" className="hidden md:flex">
                  <Plus className="h-4 w-4 mr-2" />
                  List Item
                </Button>
              </Link>

              {/* Connect Wallet / User Menu */}
              <div className="relative">
                {isConnected && address ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => setIsCardOpen(true)}
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden md:block">
                      {formatAddress(address)}
                    </span>
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => setIsCardOpen(true)}
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="hidden md:block">Connect Wallet</span>
                  </Button>
                )}
              </div>

              {/* Mobile Menu */}
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-sm font-medium text-gray-700">
                  Browse
                </Link>
                <Link href="/orders" className="text-sm font-medium text-gray-700">
                  Orders
                </Link>
                <Link href="/my-collectibles" className="text-sm font-medium text-gray-700">
                  My Collectibles
                </Link>
              </div>
              <Link href="/list-item">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  List
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Wallet Connection Card */}
      {isCardOpen && (
        <div className="fixed top-20 right-4 z-50">
          <Card className="w-80">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  {isConnected ? (
                    <>
                      <Wallet className="h-4 w-4" />
                      Wallet Connected
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4" />
                      Connect Wallet
                    </>
                  )}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCardOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {isConnected && address ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Address:</span>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {formatAddress(address)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Balance:</span>
                    <span className="text-sm font-medium">
                      {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-gray-500">
                      Secure connection via MetaMask
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={disconnectWallet}
                    className="w-full"
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600">
                    Connect your wallet to start trading digital collectibles with full security and authenticity verification.
                  </p>
                  
                  {error && (
                    <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">{error}</span>
                    </div>
                  )}
                  
                  <Button
                    onClick={connectWallet}
                    disabled={isLoading || isPending}
                    className="w-full"
                  >
                    {isLoading || isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Connecting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        Connect MetaMask
                      </div>
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <Button variant="outline" className="w-full" onClick={openSocialLogin}>
                      Connect by Email or Social
                    </Button>
                    <div className="flex items-center justify-center gap-2 pt-4 border-t">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="text-xs text-gray-500">
                        Protected by Privy
                      </span>
                    </div>
                  </div>
                  
                  {/* <div className="flex items-center gap-2 pt-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-gray-500">
                      Secure Web3 connection required
                    </span>
                  </div> */}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Social Login Modal */}
      {isSocialLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 mx-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4" />
                  Connect with Privy
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeSocialLogin}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Choose your preferred login method to securely connect to the marketplace
              </p>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => console.log('Email login')}>
                  <div className="w-5 h-5 bg-gray-600 rounded mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">@</span>
                  </div>
                  Continue with Email
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={() => console.log('Google login')}>
                  <div className="w-5 h-5 bg-red-500 rounded mr-3 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  Continue with Google
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={() => console.log('Twitter login')}>
                  <div className="w-5 h-5 bg-blue-400 rounded mr-3 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">𝕏</span>
                  </div>
                  Continue with Twitter
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={() => console.log('Discord login')}>
                  <div className="w-5 h-5 bg-indigo-600 rounded mr-3 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">D</span>
                  </div>
                  Continue with Discord
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-2 pt-4 border-t">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-gray-500">
                  Protected by Privy
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
} 