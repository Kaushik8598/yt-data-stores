export interface ChannelOverview {
  channelId: string;
  channelTitle: string;
  totalViews: number;
  engagedViews: number;
  watchTimeHours: number;
  averageViewDuration: string;
  subscribersGained: number;
  lastUpdated: string;
}

export interface CountryAudience {
  countryCode: string;
  countryName: string;
  views: number;
  percentage: number;
  averageDuration: string;
  flag: string;
}

export interface BestTimeRecommendation {
  dayOfWeek: string;
  bestTimeIST: string;
  bestTimeEST: string;
  bestTimePST: string;
  peakHourIST: number;
  confidenceScore: number;
  reason: string;
  expectedEngagementBoost: string;
}

export interface HourlyAudienceActivity {
  hour24: number;
  hourDisplayIST: string;
  hourDisplayEST: string;
  activityScore: number; // 0 to 100
  activityLevel: "low" | "moderate" | "high" | "peak";
}

export interface DayActivityHeatmap {
  dayName: string;
  dayIndex: number;
  peakWindowIST: string;
  peakWindowEST: string;
  hours: HourlyAudienceActivity[];
}

export interface YouTubeAnalyticsResponse {
  overview: ChannelOverview;
  geography: CountryAudience[];
  bestTime: BestTimeRecommendation;
  weeklyHeatmap: DayActivityHeatmap[];
  usAudiencePercentage: number;
}
