import * as React from "react";
import { CommonCard } from "@/components/common/common-card";
import { Progress } from "@/components/ui/progress";
import type { CountryAudience } from "@/types/youtube";

interface USAudienceCardProps {
  geography?: CountryAudience[];
}

export function USAudienceCard({ geography = [] }: USAudienceCardProps) {
  return (
    <CommonCard
      cardClassName="border-border/70"
      title="Audience Geography Breakdown"
      description="Top countries by viewer engagement & watch time"
    >
      <div className="space-y-4 pt-2">
        {geography.map((country) => {
          const isUS = country.countryCode === "US";

          return (
            <div key={country.countryCode} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-base">{country.flag}</span>
                  <span className={isUS ? "font-bold text-foreground" : "text-muted-foreground"}>
                    {country.countryName}
                  </span>
                  {isUS && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/10 text-red-500 font-semibold border border-red-500/20">
                      Primary
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-muted-foreground font-mono">
                  <span>{country.views.toLocaleString()} views</span>
                  <span className="font-semibold text-foreground w-12 text-right">
                    {country.percentage}%
                  </span>
                </div>
              </div>

              <Progress
                value={country.percentage}
                className={isUS ? "[&>div]:bg-red-500 h-2" : "h-1.5"}
              />

              <div className="flex justify-between text-[11px] text-muted-foreground pt-0.5">
                <span>Avg view duration: {country.averageDuration}</span>
                {isUS && (
                  <span className="text-emerald-500 font-medium">
                    Highest monetization CPM tier
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CommonCard>
  );
}
