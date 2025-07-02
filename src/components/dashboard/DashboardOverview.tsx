'use client';

import { useState } from 'react';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Card } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts/line-chart';
import { BarChart } from '@/components/ui/charts/bar-chart';

export default function DashboardOverview() {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <DateRangePicker
          value={{
            from: dateRange.from,
            to: dateRange.to
          }}
          onChange={(range) => {
            if (range.from && range.to) {
              setDateRange({
                from: range.from,
                to: range.to
              });
            }
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Daily Revenue</h3>
          <p className="text-2xl font-bold mt-2">฿0</p>
          <LineChart
            data={[]}
            xAxis="date"
            yAxis="revenue"
            className="h-20 mt-4"
          />
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Daily Transactions</h3>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between">
              <span className="text-sm">79฿ Package</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">149฿ Package</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">299฿ Package</span>
              <span className="font-medium">0</span>
            </div>
          </div>
          <BarChart
            data={[]}
            xAxis="date"
            yAxis="transactions"
            className="h-20 mt-4"
          />
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Daily Messages</h3>
          <p className="text-2xl font-bold mt-2">0</p>
          <LineChart
            data={[]}
            xAxis="date"
            yAxis="messages"
            className="h-20 mt-4"
          />
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Tokens Earned</h3>
          <p className="text-2xl font-bold mt-2">0</p>
          <LineChart
            data={[]}
            xAxis="date"
            yAxis="tokens"
            className="h-20 mt-4"
          />
        </Card>
      </div>
    </div>
  );
} 