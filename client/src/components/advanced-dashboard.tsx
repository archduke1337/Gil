import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, Tooltip as RechartsTooltip
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Diamond, FileText, Shield,
  Eye, Activity, Award, Filter, Download
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { DashboardData } from "@/types/dashboard";

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

interface CustomCardProps {
  className?: string;
  children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ className, children }) => (
  <Card className={className}>{children}</Card>
);

interface DashboardStats {
  totalCertificates: number;
  activeCertificates: number;
  verifications: number;
  securityLevel: string;
  monthlyGrowth: number;
  monthlyStats: Array<{
    month: string;
    certificates: number;
    verifications: number;
    revenue?: number;
  }>;
  certificatesByGrade: Array<{
    grade: string;
    count: number;
    percentage?: number;
  }>;
  qualityMetrics: {
    averageProcessingTime: number;
    accuracyRate: number;
    customerSatisfaction: number;
    errorRate: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    status: string;
    user?: string;
  }>;
}

export default function AdvancedDashboard() {
  const [dateRange, setDateRange] = useState("30d");
  const { data: stats = mockData, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats', dateRange],
    refetchInterval: 30000,
    initialData: mockData
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive certificate management insights</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CustomCard className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Total Certificates</p>
                <p className="text-3xl font-bold">{stats.totalCertificates.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+{stats.monthlyGrowth}% this month</span>
                </div>
              </div>
              <Diamond className="w-12 h-12 text-emerald-200" />
            </div>
          </CardContent>
        </CustomCard>

        <CustomCard className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Verifications</p>
                <p className="text-3xl font-bold">{stats.verifications.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Eye className="w-4 h-4 mr-1" />
                  <span className="text-sm">Secure tracking enabled</span>
                </div>
              </div>
              <Shield className="w-12 h-12 text-blue-200" />
            </div>
          </CardContent>
        </CustomCard>

        <CustomCard className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Security Level</p>
                <p className="text-3xl font-bold">{stats.securityLevel}</p>
                <div className="flex items-center mt-2">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="text-sm">All systems secure</span>
                </div>
              </div>
              <Award className="w-12 h-12 text-purple-200" />
            </div>
          </CardContent>
        </CustomCard>

        <CustomCard className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Active Certificates</p>
                <p className="text-3xl font-bold">{stats.activeCertificates.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 mr-1" />
                  <span className="text-sm">{((stats.activeCertificates / stats.totalCertificates) * 100).toFixed(1)}% active</span>
                </div>
              </div>
              <FileText className="w-12 h-12 text-orange-200" />
            </div>
          </CardContent>
        </CustomCard>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Monthly Trends</span>
            </CardTitle>
            <CardDescription>Certificate generation and verification trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Area 
                  type="monotone" 
                  dataKey="certificates" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="verifications" 
                  stackId="2" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </CustomCard>

        {/* Color Grade Distribution */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Diamond className="w-5 h-5" />
              <span>Color Grade Distribution</span>
            </CardTitle>
            <CardDescription>Breakdown of certificates by color grade</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.certificatesByGrade}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ grade, count }) => `${grade} (${count})`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.certificatesByGrade.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </CustomCard>
      </div>

      {/* Quality Metrics */}
      <CustomCard>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Quality Metrics</span>
          </CardTitle>
          <CardDescription>Performance and quality indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Processing Time</span>
              <span className="text-sm text-gray-600">{stats.qualityMetrics.averageProcessingTime} hours avg</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Accuracy Rate</span>
              <span className="text-sm text-gray-600">{stats.qualityMetrics.accuracyRate}%</span>
            </div>
            <Progress value={stats.qualityMetrics.accuracyRate} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Customer Satisfaction</span>
              <span className="text-sm text-gray-600">{stats.qualityMetrics.customerSatisfaction}/5.0</span>
            </div>
            <Progress value={stats.qualityMetrics.customerSatisfaction * 20} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Error Rate</span>
              <span className="text-sm text-gray-600">{stats.qualityMetrics.errorRate}%</span>
            </div>
            <Progress value={100 - (stats.qualityMetrics.errorRate * 33.33)} className="h-2" />
          </div>
        </CardContent>
      </CustomCard>

      {/* Recent Activity */}
      <CustomCard>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Latest system activities and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' :
                    activity.status === 'success' ? 'bg-blue-500' :
                    activity.status === 'passed' ? 'bg-emerald-500' : 'bg-gray-500'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <Badge variant={
                  activity.status === 'completed' ? 'default' :
                  activity.status === 'success' ? 'secondary' :
                  activity.status === 'passed' ? 'outline' : 'destructive'
                }>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </CustomCard>
    </div>
  );
interface DashboardStats {
  totalCertificates: number;
  activeCertificates: number;
  verifications: number;
  securityLevel: string;
  monthlyGrowth: number;
  monthlyStats: Array<{
    month: string;
    certificates: number;
    verifications: number;
    revenue?: number;
  }>;
  certificatesByGrade: Array<{
    grade: string;
    count: number;
    percentage?: number;
  }>;
  qualityMetrics: {
    averageProcessingTime: number;
    accuracyRate: number;
    customerSatisfaction: number;
    errorRate: number;
  };
  popularShapes?: Array<{
    shape: string;
    count: number;
    trend?: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    status: string;
    user?: string;
  }>;
}

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, Tooltip as RechartsTooltip
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Diamond, FileText, Shield,
  Eye, Activity, Award, Filter, Download
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

interface CustomCardProps {
  className?: string;
  children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ className, children }) => (
  <Card className={className}>{children}</Card>
);

interface DashboardStats {
  totalCertificates: number;
  activeCertificates: number;
  verifications: number;
  securityLevel: string;
  monthlyGrowth: number;
  monthlyStats: Array<{
    month: string;
    certificates: number;
    verifications: number;
    revenue?: number;
  }>;
  certificatesByGrade: Array<{
    grade: string;
    count: number;
    percentage?: number;
  }>;
  qualityMetrics: {
    averageProcessingTime: number;
    accuracyRate: number;
    customerSatisfaction: number;
    errorRate: number;
  };
  popularShapes?: Array<{
    shape: string;
    count: number;
    trend?: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    status: string;
    user?: string;
  }>;
}
  totalCertificates: 2456,
  activeCertificates: 1876,
  verifications: 3987,
  securityLevel: "High",
  monthlyGrowth: 18.2,
  monthlyStats: [
    { month: "Jul", certificates: 89, verifications: 567 },
    { month: "Aug", certificates: 124, verifications: 743 },
    { month: "Sep", certificates: 156, verifications: 891 },
    { month: "Oct", certificates: 198, verifications: 1234 },
    { month: "Nov", certificates: 234, verifications: 1456 },
    { month: "Dec", certificates: 267, verifications: 1678 }
  ],
  certificatesByGrade: [
    { grade: "D-F", count: 124 },
    { grade: "G-H", count: 186 },
    { grade: "I-J", count: 149 },
    { grade: "K-M", count: 39 }
  ],
  qualityMetrics: {
    averageProcessingTime: 2.4,
    accuracyRate: 99.7,
    customerSatisfaction: 4.8,
    errorRate: 0.3
  },
  popularShapes: [
    { shape: "Round", count: 456, trend: 12 },
    { shape: "Princess", count: 234, trend: -3 },
    { shape: "Emerald", count: 123, trend: 8 },
    { shape: "Oval", count: 89, trend: 15 },
    { shape: "Marquise", count: 67, trend: -1 }
  ],
  recentActivity: [
    { 
      id: "1", 
      type: "certification",
      description: "New Diamond Certificate Issued",
      timestamp: "2024-03-10T09:30:00Z",
      status: "completed",
      user: "John Doe"
    },
    { 
      id: "2",
      type: "verification",
      description: "Certificate Verification Request",
      timestamp: "2024-03-10T10:15:00Z",
      status: "pending",
      user: "Jane Smith"
    }
  ]
};
      { month: "Nov", certificates: 234, verifications: 1456, revenue: 28700 },
      { month: "Dec", certificates: 267, verifications: 1678, revenue: 32100 }
    ],
    qualityMetrics: {
      averageProcessingTime: 2.4,
      accuracyRate: 99.7,
      customerSatisfaction: 4.8,
      errorRate: 0.3
    },
    popularShapes: [
      { shape: "Round", count: 456, trend: 12 },
      { shape: "Princess", count: 234, trend: -3 },
      { shape: "Emerald", count: 123, trend: 8 },
      { shape: "Oval", count: 89, trend: 15 },
      { shape: "Marquise", count: 67, trend: -1 }
    ]
  };

  const currentStats = stats || mockData;

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive certificate management insights</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CustomCard className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Total Certificates</p>
                <p className="text-3xl font-bold">{currentStats.totalCertificates.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+{currentStats.monthlyGrowth}% this month</span>
                </div>
              </div>
              <Diamond className="w-12 h-12 text-emerald-200" />
            </div>
          </CardContent>
        </CustomCard>

        <CustomCard className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Verifications</p>
                <p className="text-3xl font-bold">{currentStats.verifications.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Eye className="w-4 h-4 mr-1" />
                  <span className="text-sm">+18% this week</span>
                </div>
              </div>
              <Shield className="w-12 h-12 text-blue-200" />
            </div>
          </CardContent>
        </CustomCard>

        <CustomCard className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Security Level</p>
                <p className="text-3xl font-bold">{currentStats.securityLevel}</p>
                <div className="flex items-center mt-2">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="text-sm">All systems secure</span>
                </div>
              </div>
              <Award className="w-12 h-12 text-purple-200" />
            </div>
          </CardContent>
        </CustomCard>

        <CustomCard className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Active Certificates</p>
                <p className="text-3xl font-bold">{currentStats.activeCertificates.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 mr-1" />
                  <span className="text-sm">{((currentStats.activeCertificates / currentStats.totalCertificates) * 100).toFixed(1)}% active</span>
                </div>
              </div>
              <FileText className="w-12 h-12 text-orange-200" />
            </div>
          </CardContent>
        </CustomCard>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Monthly Trends</span>
            </CardTitle>
            <CardDescription>Certificate generation and verification trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentStats.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="certificates" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="verifications" 
                  stackId="2" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Color Grade Distribution */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Diamond className="w-5 h-5" />
              <span>Color Grade Distribution</span>
            </CardTitle>
            <CardDescription>Breakdown of certificates by color grade</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentStats.certificatesByGrade}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({grade, percentage}) => `${grade} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {currentStats.certificatesByGrade.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </CustomCard>
      </div>

      {/* Quality Metrics & Popular Shapes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Metrics */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Quality Metrics</span>
            </CardTitle>
            <CardDescription>Performance and quality indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Processing Time</span>
                <span className="text-sm text-gray-600">{currentStats.qualityMetrics.averageProcessingTime} hours avg</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Accuracy Rate</span>
                <span className="text-sm text-gray-600">{currentStats.qualityMetrics.accuracyRate}%</span>
              </div>
              <Progress value={currentStats.qualityMetrics.accuracyRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-sm text-gray-600">{currentStats.qualityMetrics.customerSatisfaction}/5.0</span>
              </div>
              <Progress value={currentStats.qualityMetrics.customerSatisfaction * 20} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Error Rate</span>
                <span className="text-sm text-gray-600">{currentStats.qualityMetrics.errorRate}%</span>
              </div>
              <Progress value={100 - (currentStats.qualityMetrics.errorRate * 33.33)} className="h-2" />
            </div>
          </CardContent>
        </CustomCard>

        {/* Popular Shapes */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Diamond className="w-5 h-5" />
              <span>Popular Diamond Shapes</span>
            </CardTitle>
            <CardDescription>Most requested diamond shapes and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentStats.popularShapes.map((shape, index) => (
                <div key={shape.shape} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="font-medium">{shape.shape}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">{shape.count}</span>
                    <div className="flex items-center">
                      {shape.trend > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm ml-1 ${shape.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {Math.abs(shape.trend)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <CustomCard>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Latest system activities and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentStats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' :
                    activity.status === 'success' ? 'bg-blue-500' :
                    activity.status === 'passed' ? 'bg-emerald-500' : 'bg-gray-500'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <Badge variant={
                  activity.status === 'completed' ? 'default' :
                  activity.status === 'success' ? 'secondary' :
                  activity.status === 'passed' ? 'outline' : 'destructive'
                }>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </CustomCard>
    </div>
  );
}