"use client";

import { useState } from "react";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { CollectibleCard } from '@/components/marketplace/CollectibleCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Mock users
const users = [
  { id: "user1", name: "sneakerhead88", verified: true },
  { id: "user2", name: "yeezyking", verified: false },
  { id: "user3", name: "vintagefan", verified: true },
  { id: "user4", name: "luxurybags", verified: true },
  { id: "user5", name: "watchguru", verified: false },
  { id: "user6", name: "artlover", verified: true },
  { id: "user7", name: "bagqueen", verified: false },
];

// Mock collectibles
const collectibles = [
  {
    id: "c1",
    name: "Nike Air Jordan 1 Retro High OG",
    brand: "Nike",
    type: "Shoes",
    description: "Chicago colorway, limited edition release. Size US 10. Mint condition.",
    price: 25000,
    currency: "THB",
    custodyStatus: "warehouse",
    seller: users[0],
    image: "Nike Air Jordan 1 Retro High OG.avif",
  },
  {
    id: "c2",
    name: "Adidas Yeezy Boost 350 V2",
    brand: "Adidas",
    type: "Shoes",
    description: "Beluga colorway, original box included. Size US 9. Excellent condition.",
    price: 18000,
    currency: "THB",
    custodyStatus: "owner",
    seller: users[0],
    image: "/Adidas Yeezy Boost 350 V2.avif",
  },
  {
    id: "c3",
    name: "Converse Chuck Taylor All Star 70",
    brand: "Converse",
    type: "Shoes",
    description: "Classic black high-top, vintage edition. Size US 8. Good condition.",
    price: 3500,
    currency: "THB",
    custodyStatus: "warehouse",
    seller: users[0],
    image: "/Converse Chuck Taylor All Star 70.avif",
  },
  {
    id: "c4",
    name: "Hermès Birkin 30cm",
    brand: "Hermès",
    type: "Bags",
    description: "Togo leather Birkin bag in black, mint condition.",
    price: 450000,
    currency: "THB",
    custodyStatus: "owner",
    seller: users[0],
    image: "/Hermès Birkin 30cm.avif",
  },
  {
    id: "c5",
    name: "Rolex Submariner 116610LN",
    brand: "Rolex",
    type: "Watches",
    description: "Classic black dial Submariner with date, excellent condition.",
    price: 850000,
    currency: "THB",
    custodyStatus: "warehouse",
    seller: users[0],
    image: "/Rolex Submariner 116610LN.jpg",
  },
];

const allBrands = Array.from(new Set(collectibles.map((c) => c.brand)));
const allTypes = Array.from(new Set(collectibles.map((c) => c.type)));

const currentUser = users[0]; // Assume sneakerhead88 is logged in

export default function MyCollectiblesPage() {
  const [brandFilter, setBrandFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Only show collectibles owned by current user
  const myCollectibles = collectibles.filter((c) => c.seller.id === currentUser.id);

  const filtered = myCollectibles.filter(
    (c) =>
      (searchTerm === "" || c.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (brandFilter === "all" || c.brand === brandFilter) &&
      (typeFilter === "all" || c.type === typeFilter)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Collectibles</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search your collectibles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div className="flex gap-2 items-center">
            <span className="font-semibold">Brand:</span>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="all">All Brands</option>
              {allBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-semibold">Type:</span>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {allTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <CollectibleCard key={c.id} collectible={c} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-12">No collectibles found for the selected filters.</div>
        )}
      </main>
    </div>
  );
} 