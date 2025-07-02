'use client';

import { useState } from 'react';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { CollectibleCard } from '@/components/marketplace/CollectibleCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Mock data for demonstration
const mockCollectibles = [
  {
    id: '1',
    name: 'Louis Vuitton Neverfull MM',
    brand: 'Louis Vuitton',
    type: 'Bags',
    description: 'Classic monogram canvas tote bag, excellent condition with original dust bag.',
    price: 85000,
    currency: 'THB',
    custodyStatus: 'owner',
    seller: { name: 'bagqueen', verified: false },
    image: '/Louis Vuitton Neverfull MM.avif',
  },
  {
    id: '2',
    name: 'Omega Speedmaster Professional',
    brand: 'Omega',
    type: 'Watches',
    description: 'Moonwatch chronograph, stainless steel case. Excellent condition with box and papers.',
    price: 280000,
    currency: 'THB',
    custodyStatus: 'warehouse',
    seller: { name: 'watchguru', verified: false },
    image: '/Omega Speedmaster Professional.avif',
  },
  {
    id: '3',
    name: 'Banksy "Girl with Balloon" Print',
    brand: 'Banksy',
    type: 'Art',
    description: 'Limited edition screen print, signed and numbered. Excellent condition.',
    price: 150000,
    currency: 'THB',
    custodyStatus: 'owner',
    seller: { name: 'artlover', verified: true },
    image: '/Banksy \'Girl with Balloon\' Print.webp',
  },
  {
    id: '4',
    name: 'Chanel Classic Flap Bag',
    brand: 'Chanel',
    type: 'Bags',
    description: 'Classic flap bag in black caviar leather, gold hardware. Mint condition.',
    price: 180000,
    currency: 'THB',
    custodyStatus: 'warehouse',
    seller: { name: 'bagqueen', verified: false },
    image: '/Chanel Classic Flap Bag.avif',
  },
  {
    id: '5',
    name: 'Hermès Kelly 25',
    brand: 'Hermès',
    type: 'Bags',
    description: 'Kelly bag in Epsom leather, gold hardware. Excellent condition with box.',
    price: 380000,
    currency: 'THB',
    custodyStatus: 'owner',
    seller: { name: 'luxurybags', verified: true },
    image: '/Hermès Kelly 25.avif',
  },
  {
    id: '6',
    name: 'Nike Dunk Low Retro',
    brand: 'Nike',
    type: 'Shoes',
    description: 'Classic dunk low in white and green. Size US 9. Good condition.',
    price: 8500,
    currency: 'THB',
    custodyStatus: 'warehouse',
    seller: { name: 'yeezyking', verified: false },
    image: '/Nike Dunk Low Retro.avif',
  },
  {
    id: '7',
    name: 'Nike Air Jordan 1 Retro High OG',
    brand: 'Nike',
    type: 'Shoes',
    description: 'Chicago colorway, limited edition release. Size US 10. Mint condition.',
    price: 25000,
    currency: 'THB',
    custodyStatus: 'warehouse',
    seller: { name: 'sneakerhead88', verified: true },
    image: 'Nike Air Jordan 1 Retro High OG.avif',
  },
  {
    id: '8',
    name: 'Adidas Yeezy Boost 350 V2',
    brand: 'Adidas',
    type: 'Shoes',
    description: 'Beluga colorway, original box included. Size US 9. Excellent condition.',
    price: 18000,
    currency: 'THB',
    custodyStatus: 'owner',
    seller: { name: 'yeezyking', verified: false },
    image: '/Adidas Yeezy Boost 350 V2.avif',
  },
  {
    id: '9',
    name: 'Converse Chuck Taylor All Star 70',
    brand: 'Converse',
    type: 'Shoes',
    description: 'Classic black high-top, vintage edition. Size US 8. Good condition.',
    price: 3500,
    currency: 'THB',
    custodyStatus: 'warehouse',
    seller: { name: 'vintagefan', verified: true },
    image: '/Converse Chuck Taylor All Star 70.avif',
  },
  {
    id: '10',
    name: 'Hermès Birkin 30cm',
    brand: 'Hermès',
    type: 'Bags',
    description: 'Togo leather Birkin bag in black, mint condition.',
    price: 450000,
    currency: 'THB',
    custodyStatus: 'owner',
    seller: { name: 'luxurybags', verified: true },
    image: '/Hermès Birkin 30cm.avif',
  },
  {
    id: '11',
    name: 'Rolex Submariner 116610LN',
    brand: 'Rolex',
    type: 'Watches',
    description: 'Classic black dial Submariner with date, excellent condition.',
    price: 850000,
    currency: 'THB',
    custodyStatus: 'warehouse',
    seller: { name: 'watchguru', verified: false },
    image: '/Rolex Submariner 116610LN.jpg',
  },
  // Additional products from orders
  {
    id: '12',
    name: 'Nike Mercurial Superfly 10 Elite x Air Max 95 SE',
    brand: 'Nike',
    type: 'Shoes',
    description: 'Limited edition collaboration, exclusive release. Size US 10.5. New condition.',
    price: 32000,
    currency: 'THB',
    custodyStatus: 'warehouse',
    seller: { name: 'sneakerhead88', verified: true },
    image: 'Nike Mercurial Superfly 10 Elite x Air Max 95 SE.avif',
  },
];

const allBrands = Array.from(new Set(mockCollectibles.map(c => c.brand)));
const allTypes = Array.from(new Set(mockCollectibles.map(c => c.type)));

export default function MarketplacePage() {
  const [brandFilter, setBrandFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockCollectibles.filter(c =>
    (searchTerm === '' || c.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (brandFilter === 'all' || c.brand === brandFilter) &&
    (typeFilter === 'all' || c.type === typeFilter)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Marketplace</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search collectibles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 items-center">
            <span className="font-semibold">Brand:</span>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={brandFilter}
              onChange={e => setBrandFilter(e.target.value)}
            >
              <option value="all">All</option>
              {allBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-semibold">Type:</span>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option value="all">All</option>
              {allTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(c => (
            <CollectibleCard key={c.id} collectible={c} showActions />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-12">No collectibles found for the selected filters.</div>
        )}
      </main>
    </div>
  );
} 