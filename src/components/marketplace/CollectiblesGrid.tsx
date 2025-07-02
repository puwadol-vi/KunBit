'use client';

import { Collectible } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import Image from 'next/image';

interface CollectiblesGridProps {
  collectibles: Collectible[];
  searchQuery?: string;
  selectedCategory?: string;
}

export function CollectiblesGrid({ collectibles, searchQuery = '', selectedCategory = 'all' }: CollectiblesGridProps) {
  // Filter collectibles based on search query and category
  const filteredCollectibles = collectibles.filter((item) => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      item.category.name.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  if (!filteredCollectibles.length) {
    return (
      <div className="text-center text-gray-500 py-12">
        <div className="text-lg font-medium mb-2">No collectibles found</div>
        <div className="text-sm">
          {searchQuery || selectedCategory !== 'all' 
            ? 'Try adjusting your search or filter criteria.'
            : 'No collectibles are currently available.'
          }
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAuthenticityIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAuthenticityColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredCollectibles.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader className="p-0">
            <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
              {item.images && item.images.length > 0 ? (
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              
              {/* Authenticity Badge */}
              <div className="absolute top-2 left-2">
                <Badge className={`flex items-center gap-1 ${getAuthenticityColor(item.authenticityStatus)}`}>
                  {getAuthenticityIcon(item.authenticityStatus)}
                  {item.authenticityStatus}
                </Badge>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-white/90">
                  {item.category.name}
                </Badge>
              </div>
              
              {/* Fractional Ownership Badge */}
              {item.fractionalOwnership && (
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    Fractional
                  </Badge>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-4 space-y-3">
            <div>
              <CardTitle className="text-base font-semibold line-clamp-2 mb-1">
                {item.title}
              </CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
            </div>
            
            {/* Price Information */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-600 text-lg">
                  {formatCurrency(item.currentPrice, item.currency)}
                </span>
                {item.originalPrice > item.currentPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatCurrency(item.originalPrice, item.currency)}
                  </span>
                )}
              </div>
              
              {/* Discount calculation */}
              {item.originalPrice > item.currentPrice && (
                <div className="text-xs text-green-600">
                  {Math.round(((item.originalPrice - item.currentPrice) / item.originalPrice) * 100)}% off
                </div>
              )}
            </div>
            
            {/* Condition and Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                {item.condition}
              </Badge>
              {item.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{item.tags.length - 2} more
                </Badge>
              )}
            </div>
            
            {/* Digital Certificate Info */}
            {item.digitalCertificate && (
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span>Digital Certificate</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 