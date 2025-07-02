'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Shield, CheckCircle, XCircle, X } from 'lucide-react';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

interface WalletConnectProps {
  onConnect: () => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isCardOpen, setIsCardOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
  });

  useEffect(() => {
    if (isConnected && address) {
      onConnect();
    }
  }, [isConnected, address, onConnect]);

  const connectWallet = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await connect({ connector: injected() });
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
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // If wallet is connected, show the connected state card
  if (isConnected && address) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Card className="w-80">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Wallet className="h-4 w-4" />
                Wallet Connected
                <CheckCircle className="h-4 w-4 text-green-500" />
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
          </CardContent>
        </Card>
      </div>
    );
  }

  // If card is not open, show just the connect wallet button
  if (!isCardOpen) {
    return (
      <div className="fixed top-20 right-4 z-50">
        <Button
          onClick={() => setIsCardOpen(true)}
          className="flex items-center gap-2"
        >
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
    );
  }

  // Show the full connect wallet card when open
  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="w-80">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4" />
              Connect Wallet
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
          
          <div className="flex items-center gap-2 pt-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-gray-500">
              Secure Web3 connection required
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 