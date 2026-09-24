"use client";

import * as React from "react";
import { useYouTubeChannels, useSwitchChannel } from "@/hooks/use-youtube-analytics";
import { CommonButton } from "@/components/common/common-button";
import { Video, Check, ChevronDown, Plus, Users } from "lucide-react";
import Image from "next/image";

interface ChannelSelectorProps {
  onConnectClick?: () => void;
  className?: string;
}

const emptySubscribe = () => () => {};

export function ChannelSelector({ onConnectClick, className }: ChannelSelectorProps) {
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { data: channels = [], isLoading } = useYouTubeChannels();
  const { mutate: switchChannel, isPending: isSwitching } = useSwitchChannel();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedChannel = channels.find((c) => c.isSelected) ?? channels[0];

  if (!isMounted || isLoading) {
    return (
      <div className="h-8 w-36 rounded-lg bg-muted/60 animate-pulse" />
    );
  }

  // If no channels connected yet
  if (!channels || channels.length === 0) {
    return (
      <CommonButton
        variant="outline"
        size="sm"
        leftIcon={<Video className="size-3.5 text-red-500" />}
        onClick={onConnectClick}
        className={className}
      >
        Connect Channel
      </CommonButton>
    );
  }

  return (
    <div className={`relative ${className ?? ""}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSwitching}
        className="flex items-center gap-2 h-9 px-2.5 rounded-lg border border-border bg-card/80 hover:bg-muted/60 transition-colors text-xs font-medium cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        {selectedChannel?.thumbnailUrl ? (
          <Image
            src={selectedChannel.thumbnailUrl}
            alt={selectedChannel.channelTitle}
            width={22}
            height={22}
            className="size-5.5 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="size-5.5 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0">
            <Video className="size-3" />
          </div>
        )}

        <div className="flex flex-col text-left leading-tight max-w-[120px] sm:max-w-[160px]">
          <span className="font-semibold text-foreground truncate">
            {selectedChannel?.channelTitle ?? "Select Channel"}
          </span>
          {selectedChannel?.subscriberCount !== undefined && (
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Users className="size-2.5" />
              {selectedChannel.subscriberCount.toLocaleString()} subs
            </span>
          )}
        </div>

        <ChevronDown className={`size-3.5 text-muted-foreground transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-64 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
          <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Connected Channels ({channels.length})
          </div>

          <div className="space-y-0.5 my-1 max-h-56 overflow-y-auto">
            {channels.map((channel) => {
              const isCurrent = channel.channelId === selectedChannel?.channelId;

              return (
                <button
                  key={channel.channelId}
                  type="button"
                  onClick={() => {
                    if (!isCurrent) {
                      switchChannel(channel.channelId);
                    }
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                    isCurrent
                      ? "bg-primary/10 text-primary font-semibold"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {channel.thumbnailUrl ? (
                      <Image
                        src={channel.thumbnailUrl}
                        alt={channel.channelTitle}
                        width={24}
                        height={24}
                        className="size-6 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="size-6 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0">
                        <Video className="size-3" />
                      </div>
                    )}
                    <div className="truncate">
                      <p className="truncate font-medium">{channel.channelTitle}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {channel.subscriberCount?.toLocaleString() ?? "0"} subscribers
                      </p>
                    </div>
                  </div>

                  {isCurrent && <Check className="size-4 text-primary shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          <div className="pt-1 border-t border-border/60">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onConnectClick?.();
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <Plus className="size-3.5" />
              <span>Connect Another Channel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
