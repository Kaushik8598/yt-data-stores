import type {
  YouTubeAnalyticsResponse,
  CountryAudience,
  DayActivityHeatmap,
  HourlyAudienceActivity,
} from "@/types/youtube";

/**
 * Calculates hourly activity score for US audience based on EST hour converted to IST.
 * Peak US traffic occurs between 2:00 PM - 9:00 PM EST (corresponding to 11:30 PM - 6:30 AM IST).
 * The optimal upload window is 1-2 hours prior: 12:00 PM - 2:00 PM EST (9:30 PM - 11:30 PM IST).
 */
function generateHourlyActivity(dayIndex: number): HourlyAudienceActivity[] {
  const isWeekend = dayIndex === 0 || dayIndex === 6; // Sunday or Saturday

  return Array.from({ length: 24 }, (_, hourIST) => {
    // Convert IST hour to EST (IST is UTC+5:30, EST is UTC-5; difference is 10.5 hours)
    // Approximate whole-hour offset: EST = (IST - 10 + 24) % 24 (ignoring half-hour for bucket)
    const hourEST = (hourIST - 10 + 24) % 24;

    // US Audience viewing curve:
    // Low: 1 AM - 7 AM EST
    // Moderate: 8 AM - 12 PM EST
    // High: 12 PM - 4 PM EST
    // Peak: 4 PM - 9 PM EST
    // Tapering: 10 PM - 12 AM EST
    let score = 20;

    if (isWeekend) {
      if (hourEST >= 9 && hourEST <= 14) score = 85 + (hourIST % 10);
      else if (hourEST > 14 && hourEST <= 21) score = 95 - (hourIST % 8);
      else if (hourEST >= 6 && hourEST < 9) score = 55;
      else score = 25;
    } else {
      if (hourEST >= 14 && hourEST <= 21) score = 88 + (hourIST % 10); // Peak
      else if (hourEST >= 11 && hourEST < 14) score = 75; // Pre-peak (Ideal upload window)
      else if (hourEST >= 7 && hourEST < 11) score = 50;
      else score = 20;
    }

    // Ensure within 0-100 bounds
    const normalizedScore = Math.min(100, Math.max(10, score));

    let activityLevel: HourlyAudienceActivity["activityLevel"] = "low";
    if (normalizedScore >= 85) activityLevel = "peak";
    else if (normalizedScore >= 70) activityLevel = "high";
    else if (normalizedScore >= 45) activityLevel = "moderate";

    const periodIST = hourIST >= 12 ? "PM" : "AM";
    const displayHourIST = hourIST % 12 === 0 ? 12 : hourIST % 12;

    const periodEST = hourEST >= 12 ? "PM" : "AM";
    const displayHourEST = hourEST % 12 === 0 ? 12 : hourEST % 12;

    return {
      hour24: hourIST,
      hourDisplayIST: `${displayHourIST}:00 ${periodIST}`,
      hourDisplayEST: `${displayHourEST}:00 ${periodEST}`,
      activityScore: normalizedScore,
      activityLevel,
    };
  });
}

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getWeeklyHeatmap(): DayActivityHeatmap[] {
  return DAYS_OF_WEEK.map((dayName, dayIndex) => {
    const isWeekend = dayIndex === 0 || dayIndex === 6;

    return {
      dayName,
      dayIndex,
      peakWindowIST: isWeekend ? "5:30 PM - 9:30 PM IST" : "8:30 PM - 11:30 PM IST",
      peakWindowEST: isWeekend ? "8:00 AM - 12:00 PM EST" : "11:00 AM - 2:00 PM EST",
      hours: generateHourlyActivity(dayIndex),
    };
  });
}

export function getGeographyAudience(): CountryAudience[] {
  return [
    {
      countryCode: "US",
      countryName: "United States",
      views: 142850,
      percentage: 54.2,
      averageDuration: "5m 48s",
      flag: "🇺🇸",
    },
    {
      countryCode: "GB",
      countryName: "United Kingdom",
      views: 38200,
      percentage: 14.5,
      averageDuration: "5m 12s",
      flag: "🇬🇧",
    },
    {
      countryCode: "CA",
      countryName: "Canada",
      views: 31600,
      percentage: 12.0,
      averageDuration: "5m 30s",
      flag: "🇨🇦",
    },
    {
      countryCode: "AU",
      countryName: "Australia",
      views: 18450,
      percentage: 7.0,
      averageDuration: "5m 05s",
      flag: "🇦🇺",
    },
    {
      countryCode: "IN",
      countryName: "India",
      views: 15800,
      percentage: 6.0,
      averageDuration: "4m 20s",
      flag: "🇮🇳",
    },
    {
      countryCode: "OTHER",
      countryName: "Other Regions",
      views: 16600,
      percentage: 6.3,
      averageDuration: "4m 10s",
      flag: "🌐",
    },
  ];
}

export function getYouTubeAnalytics(): YouTubeAnalyticsResponse {
  const geography = getGeographyAudience();
  const usItem = geography.find((item) => item.countryCode === "US");
  const usAudiencePercentage = usItem?.percentage ?? 54.2;

  const currentDayIndex = new Date().getDay();
  const isWeekend = currentDayIndex === 0 || currentDayIndex === 6;

  return {
    overview: {
      channelId: "UC_DEMO_CHANNEL_01",
      channelTitle: "YT Data Stores Pro",
      totalViews: 263500,
      engagedViews: 182400,
      watchTimeHours: 24150,
      averageViewDuration: "5m 32s",
      subscribersGained: 3420,
      lastUpdated: new Date().toISOString(),
    },
    geography,
    usAudiencePercentage,
    bestTime: {
      dayOfWeek: DAYS_OF_WEEK[currentDayIndex] ?? "Today",
      bestTimeIST: isWeekend ? "06:30 PM - 08:30 PM IST" : "09:00 PM - 11:30 PM IST",
      bestTimeEST: isWeekend ? "09:00 AM - 11:00 AM EST" : "11:30 AM - 02:00 PM EST",
      bestTimePST: isWeekend ? "06:00 AM - 08:00 AM PST" : "08:30 AM - 11:00 AM PST",
      peakHourIST: isWeekend ? 19 : 21,
      confidenceScore: 94,
      reason:
        "US viewership reaches maximum density between 2:00 PM - 8:00 PM EST. Uploading 2 hours prior gives YouTube's recommendation engine sufficient buffer to index and rank your video for peak evening US leisure hours.",
      expectedEngagementBoost: "+38% more initial click-throughs within first 4 hours",
    },
    weeklyHeatmap: getWeeklyHeatmap(),
  };
}
