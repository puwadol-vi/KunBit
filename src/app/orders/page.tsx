"use client";

import React, { useState } from "react";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { OrderCard } from '@/components/marketplace/OrderCard';
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

// Status mapping
const statusMap: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  warehouse: 'In Warehouse',
  dispute: 'Dispute',
  preparing: 'Preparing Item',
  transit: 'In Transit',
  released: 'Payment Released',
  problem: 'Problem with Item',
};

// Mock orders (expanded)
const orders = [
  {
    id: "order1",
    product: { 
      name: "Nike Air Jordan 1 Retro High OG", 
      brand: "Nike", 
      type: "Shoes",
      image: "/Nike Air Jordan 1 Retro High OG.avif"
    },
    seller: users[0],
    buyer: users[1],
    status: "warehouse",
  },
  {
    id: "order2",
    product: { 
      name: "Adidas Yeezy Boost 350 V2", 
      brand: "Adidas", 
      type: "Shoes",
      image: "/Adidas Yeezy Boost 350 V2.avif"
    },
    seller: users[1],
    buyer: users[2],
    status: "preparing",
  },
  {
    id: "order3",
    product: { 
      name: "Converse Chuck Taylor All Star 70", 
      brand: "Converse", 
      type: "Shoes",
      image: "/Converse Chuck Taylor All Star 70.avif"
    },
    seller: users[2],
    buyer: users[0],
    status: "transit",
  },
  {
    id: "order4",
    product: { 
      name: "Hermès Birkin 30cm", 
      brand: "Hermès", 
      type: "Bags",
      image: "/Hermès Birkin 30cm.avif"
    },
    seller: users[3],
    buyer: users[4],
    status: "delivered",
  },
  {
    id: "order5",
    product: { 
      name: "Rolex Submariner 116610LN", 
      brand: "Rolex", 
      type: "Watches",
      image: "/Rolex Submariner 116610LN.jpg"
    },
    seller: users[4],
    buyer: users[3],
    status: "released",
  },
  {
    id: "order6",
    product: { 
      name: "Nike Mercurial Superfly 10 Elite x Air Max 95 SE", 
      brand: "Nike", 
      type: "Shoes",
      image: "Nike Mercurial Superfly 10 Elite x Air Max 95 SE.avif"
    },
    seller: users[0],
    buyer: users[2],
    status: "problem",
  },
  {
    id: "order7",
    product: { 
      name: "Louis Vuitton Neverfull MM", 
      brand: "Louis Vuitton", 
      type: "Bags",
      image: "/Louis Vuitton Neverfull MM.avif"
    },
    seller: users[6],
    buyer: users[1],
    status: "warehouse",
  },
  {
    id: "order8",
    product: { 
      name: "Omega Speedmaster Professional", 
      brand: "Omega", 
      type: "Watches",
      image: "/Omega Speedmaster Professional.avif"
    },
    seller: users[5],
    buyer: users[0],
    status: "preparing",
  },
  {
    id: "order9",
    product: { 
      name: "Banksy 'Girl with Balloon' Print", 
      brand: "Banksy", 
      type: "Art",
      image: "/Banksy 'Girl with Balloon' Print.webp"
    },
    seller: users[5],
    buyer: users[6],
    status: "transit",
  },
  {
    id: "order10",
    product: { 
      name: "Chanel Classic Flap Bag", 
      brand: "Chanel", 
      type: "Bags",
      image: "/Chanel Classic Flap Bag.avif"
    },
    seller: users[6],
    buyer: users[3],
    status: "delivered",
  },
  {
    id: "order11",
    product: { 
      name: "Hermès Kelly 25", 
      brand: "Hermès", 
      type: "Bags",
      image: "/Hermès Kelly 25.avif"
    },
    seller: users[3],
    buyer: users[6],
    status: "released",
  },
  {
    id: "order12",
    product: { 
      name: "Nike Dunk Low Retro", 
      brand: "Nike", 
      type: "Shoes",
      image: "/Nike Dunk Low Retro.avif"
    },
    seller: users[1],
    buyer: users[0],
    status: "problem",
  },
];

const allBrands = Array.from(new Set(orders.map((o) => o.product.brand)));
const allTypes = Array.from(new Set(orders.map((o) => o.product.type)));

const currentUser = users[0]; // Assume sneakerhead88 is logged in

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'my-orders' | 'all-orders'>('my-orders');
  const [myOrdersTab, setMyOrdersTab] = useState<'selling' | 'buying'>('selling');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // My Orders: orders where currentUser is seller or buyer
  const mySellingOrders = orders.filter((o) => o.seller.id === currentUser.id);
  const myBuyingOrders = orders.filter((o) => o.buyer.id === currentUser.id);
  
  // All Orders: filter by user search term if provided, otherwise show all orders NOT involving currentUser
  const allOrders = userSearchTerm 
    ? orders.filter((o) => 
        (o.seller.id !== currentUser.id && o.buyer.id !== currentUser.id) &&
        (o.seller.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
         o.buyer.name.toLowerCase().includes(userSearchTerm.toLowerCase()))
      )
    : orders.filter((o) => o.seller.id !== currentUser.id && o.buyer.id !== currentUser.id);

  const filterOrders = (orderList: typeof orders) =>
    orderList.filter(
      (o) =>
        (searchTerm === '' || o.product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || o.status === statusFilter) &&
        (brandFilter === "all" || o.product.brand === brandFilter) &&
        (typeFilter === "all" || o.product.type === typeFilter)
    );

  const filteredOrders = filterOrders(
    activeTab === 'my-orders' 
      ? (myOrdersTab === 'selling' ? mySellingOrders : myBuyingOrders)
      : allOrders
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <div className="flex gap-4 mb-6 items-center">
          <Button
            variant={activeTab === 'my-orders' ? 'default' : 'outline'}
            onClick={() => setActiveTab('my-orders')}
          >
            My Orders
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'all-orders' ? 'default' : 'outline'}
              onClick={() => setActiveTab('all-orders')}
            >
              All Orders
            </Button>
            {activeTab === 'all-orders' && userSearchTerm && (
              <span className="ml-2 text-2xl font-bold text-gray-700">
                User{" "}
                {userSearchTerm}
              </span>
            )}
          </div>
        </div>
        
        {activeTab === 'my-orders' && (
          <div className="flex gap-4 mb-6">
            <Button
              variant={myOrdersTab === 'selling' ? 'default' : 'outline'}
              onClick={() => setMyOrdersTab('selling')}
            >
              Selling Orders
            </Button>
            <Button
              variant={myOrdersTab === 'buying' ? 'default' : 'outline'}
              onClick={() => setMyOrdersTab('buying')}
            >
              Buying Orders
            </Button>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          {activeTab === 'all-orders' && (
            <div className="flex gap-2 items-center">
              <span className="font-semibold">User:</span>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by user..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
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
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="warehouse">In Warehouse</option>
            <option value="dispute">Dispute</option>
            <option value="preparing">Preparing Item</option>
            <option value="transit">In Transit</option>
            <option value="released">Payment Released</option>
            <option value="problem">Problem with Item</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((o) => {
            return (
              <OrderCard key={o.id} order={o} statusMap={statusMap} />
            );
          })}
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-500 py-12">No orders found for the selected filters.</div>
        )}
      </main>
    </div>
  );
} 