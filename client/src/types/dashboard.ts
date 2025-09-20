export interface DashboardData {
  totalCertificates: number;
  monthlyGrowth: number;
  verifications: number;
  securityLevel: string;
  activeCertificates: number;
  monthlyStats: Array<{
    month: string;
    certificates: number;
    verifications: number;
  }>;
  certificatesByGrade: Array<{
    grade: string;
    count: number;
  }>;
  qualityMetrics: {
    averageProcessingTime: number;
    accuracyRate: number;
    customerSatisfaction: number;
    errorRate: number;
  };
  popularShapes: Array<{
    shape: string;
    count: number;
    trend: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    status: 'completed' | 'success' | 'passed' | 'pending';
    user?: string;
  }>;
}