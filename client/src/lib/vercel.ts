import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

export function initializeVercel() {
  // Initialize Vercel Analytics
  injectAnalytics();
  
  // Initialize Vercel Speed Insights
  injectSpeedInsights();
}