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
    clarity: number;
    color: number;
    cut: number;
    overall: number;
  };
  popularShapes: Array<{
    shape: string;
    count: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user?: string;
  }>;
}