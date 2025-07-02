import { Suspense } from 'react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import UserBreakdown from '@/components/dashboard/UserBreakdown';

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Overall Statistics</h2>
          <Suspense fallback={<div>Loading overview...</div>}>
            <DashboardOverview />
          </Suspense>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Breakdown</h2>
          <Suspense fallback={<div>Loading user data...</div>}>
            <UserBreakdown />
          </Suspense>
        </section>
      </div>
    </div>
  );
} 