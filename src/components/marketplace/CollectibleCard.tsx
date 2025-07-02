import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Warehouse, CheckCircle } from 'lucide-react';
import React from 'react';

export interface CollectibleCardProps {
  collectible: {
    id: string;
    name: string;
    brand: string;
    type: string;
    description: string;
    price?: number;
    currency: string;
    custodyStatus: string;
    seller: { name: string; verified: boolean };
    image: string;
  };
  showActions?: boolean;
}

export function CollectibleCard({ collectible, showActions }: CollectibleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="relative mb-4">
        <img src={collectible.image} alt={collectible.name} className="w-full h-48 object-cover rounded" />
        {collectible.custodyStatus === 'warehouse' && (
          <div className="absolute top-2 right-2">
            <Badge className="flex items-center gap-1 bg-blue-100 text-blue-700">
              <CheckCircle className="h-4 w-4" /> Verified Collectible
            </Badge>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg font-bold">{collectible.name}</span>
      </div>
      <div className="text-gray-600 text-sm mb-2">{collectible.description}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium">Seller:</span>
        <span>{collectible.seller.name}</span>
        {collectible.seller.verified && (
          <Badge className="flex items-center gap-1 bg-green-100 text-green-700">
            <CheckCircle className="h-4 w-4" /> Verified
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-xs bg-gray-100 rounded px-2 py-1">Brand: {collectible.brand}</span>
        <span className="text-xs bg-gray-100 rounded px-2 py-1">Type: {collectible.type}</span>
      </div>
      {collectible.price && (
        <div className="font-bold text-xl mb-4">{collectible.price.toLocaleString()} {collectible.currency}</div>
      )}
      {showActions && (
        <div className="flex gap-2 mt-auto">
          <Button className="w-1/2">Buy</Button>
          <Button variant="outline" className="w-1/2">Buy and Redeem</Button>
        </div>
      )}
    </div>
  );
} 