'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/table';
import { LineChart } from '@/components/ui/charts/line-chart';

export default function UserBreakdown() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search by user ID or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment History</h3>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Package</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No payment history found
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Message Activity</h3>
          <div className="h-[300px]">
            <LineChart
              data={[]}
              xAxis="date"
              yAxis="messages"
              className="h-full"
            />
          </div>
        </Card>
      </div>
    </div>
  );
} 