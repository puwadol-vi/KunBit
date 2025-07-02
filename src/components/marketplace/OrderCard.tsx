import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import React from 'react';

export interface OrderCardProps {
  order: {
    id: string;
    product: {
      name: string;
      brand: string;
      type: string;
      image: string;
    };
    seller: {
      name: string;
      verified: boolean;
    };
    buyer: {
      name: string;
      verified: boolean;
    };
    status: string;
  };
  statusMap: Record<string, string>;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'warehouse':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'dispute':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'preparing':
      return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    case 'transit':
      return 'bg-pink-100 text-pink-800 border-pink-200';
    case 'released':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'problem':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function OrderCard({ order, statusMap }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="relative mb-4">
        <img src={order.product.image} alt={order.product.name} className="w-full h-48 object-cover rounded" />
      </div>
      
      <div className="text-lg font-bold mb-2">{order.product.name}</div>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium">Seller:</span>
        <span>{order.seller.name}</span>
        {order.seller.verified ? (
          <Badge className="flex items-center gap-1 bg-green-100 text-green-700">
            <CheckCircle className="h-4 w-4" /> Verified
          </Badge>
        ) : (
          <Badge className="flex items-center gap-1 bg-gray-100 text-gray-500">
            <XCircle className="h-4 w-4" /> Not Verified
          </Badge>
        )}
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium">Buyer:</span>
        <span>{order.buyer.name}</span>
        {order.buyer.verified ? (
          <Badge className="flex items-center gap-1 bg-green-100 text-green-700">
            <CheckCircle className="h-4 w-4" /> Verified
          </Badge>
        ) : (
          <Badge className="flex items-center gap-1 bg-gray-100 text-gray-500">
            <XCircle className="h-4 w-4" /> Not Verified
          </Badge>
        )}
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium">Status:</span>
        <Badge className={`border ${getStatusColor(order.status)}`}>
          {statusMap[order.status] || order.status}
        </Badge>
      </div>
      
      <div className="flex items-center gap-4 mb-2">
        <span className="text-xs bg-gray-100 rounded px-2 py-1">Brand: {order.product.brand}</span>
        <span className="text-xs bg-gray-100 rounded px-2 py-1">Type: {order.product.type}</span>
      </div>
    </div>
  );
} 