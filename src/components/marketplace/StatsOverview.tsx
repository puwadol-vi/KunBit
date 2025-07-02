'use client';

export function StatsOverview() {
  // In a real app, fetch these stats from API
  const stats = {
    totalCollectibles: 128,
    totalUsers: 42,
    totalVolume: 12500000,
    activeListings: 37,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.totalCollectibles}</div>
        <div className="text-xs text-gray-500">Collectibles</div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold text-purple-600">{stats.totalUsers}</div>
        <div className="text-xs text-gray-500">Users</div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold text-green-600">{stats.totalVolume.toLocaleString()} THB</div>
        <div className="text-xs text-gray-500">Total Volume</div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold text-orange-600">{stats.activeListings}</div>
        <div className="text-xs text-gray-500">Active Listings</div>
      </div>
    </div>
  );
} 