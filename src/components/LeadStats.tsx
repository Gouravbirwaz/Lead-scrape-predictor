
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, CheckCircle, XCircle } from 'lucide-react';

interface LeadStatsProps {
  totalLeads: number;
  acceptedLeads: number;
  rejectedLeads: number;
  averageQuality: number;
}

export const LeadStats: React.FC<LeadStatsProps> = ({
  totalLeads,
  acceptedLeads,
  rejectedLeads,
  averageQuality
}) => {
  const acceptanceRate = totalLeads > 0 ? (acceptedLeads / totalLeads) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Users className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeads}</div>
          <p className="text-xs opacity-80">Processed leads</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accepted</CardTitle>
          <CheckCircle className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{acceptedLeads}</div>
          <p className="text-xs opacity-80">{acceptanceRate.toFixed(1)}% acceptance rate</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          <XCircle className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{rejectedLeads}</div>
          <p className="text-xs opacity-80">Low quality leads</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Quality</CardTitle>
          <TrendingUp className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(averageQuality * 100)}%</div>
          <p className="text-xs opacity-80">Overall quality score</p>
        </CardContent>
      </Card>
    </div>
  );
};
