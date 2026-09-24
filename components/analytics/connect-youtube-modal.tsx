"use client";

import * as React from "react";
import { CommonModal } from "@/components/common/common-modal";
import { CommonButton } from "@/components/common/common-button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@/components/common/form/formik-input";
import { Video, ShieldCheck, Key, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface ConnectYouTubeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConnectSchema = Yup.object().shape({
  channelId: Yup.string()
    .min(5, "Channel ID is too short")
    .required("YouTube Channel ID or Handle is required"),
  apiKey: Yup.string().optional(),
});

export function ConnectYouTubeModal({
  open,
  onOpenChange,
}: ConnectYouTubeModalProps) {
  const [connecting, setConnecting] = React.useState(false);

  const handleConnect = async (values: { channelId: string; apiKey?: string }) => {
    setConnecting(true);
    // Simulate verification
    setTimeout(() => {
      setConnecting(false);
      toast.success("YouTube Channel Connected!", {
        description: `Connected to channel: ${values.channelId}`,
      });
      onOpenChange(false);
    }, 1200);
  };

  return (
    <CommonModal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className="flex items-center gap-2">
          <span className="size-8 rounded-lg bg-red-600 inline-flex items-center justify-center text-white shrink-0">
            <Video className="size-4" />
          </span>
          <span>Connect YouTube Channel</span>
        </span>
      }
      description="Connect your YouTube account to fetch live private analytics & real-time US viewer metrics"
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Google OAuth Button Option */}
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
               <ShieldCheck className="size-4 text-emerald-500" /> Recommended: Google OAuth 2.0
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-semibold px-2 py-0.5 rounded">
              Secure
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Allows real-time access to YouTube Analytics API for private retention curves, exact US states, and hourly subscriber activity.
          </p>
          <CommonButton
            href="/api/youtube/auth?returnUrl=/analytics"
            className="w-full bg-red-600 hover:bg-red-700 text-white cursor-pointer justify-center"
          >
            Sign In with YouTube (Google)
          </CommonButton>
        </div>

        <div className="relative text-center my-3">
          <span className="bg-popover px-2 text-xs text-muted-foreground uppercase tracking-wider relative z-10">
            Or connect via Channel ID
          </span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
        </div>

        {/* Manual Formik Channel ID */}
        <Formik
          initialValues={{ channelId: "UC_DEMO_CHANNEL_01", apiKey: "" }}
          validationSchema={ConnectSchema}
          onSubmit={handleConnect}
        >
          {() => (
            <Form className="space-y-3">
              <FormikInput
                name="channelId"
                label="Channel ID or Handle"
                placeholder="e.g. @MrBeast or UCX6OQ3DkcsbYNE6H8uQQuVA"
                required
              />

              <FormikInput
                name="apiKey"
                label="YouTube Data API Key (Optional)"
                placeholder="AIzaSy..."
                helperText="Obtain from Google Cloud Console for public video metrics"
              />

              <div className="pt-2 flex justify-between items-center text-xs">
                <Link
                  href="https://console.cloud.google.com/apis/library/youtube.googleapis.com"
                  target="_blank"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  <Key className="size-3" /> Get Google API Key <ExternalLink className="size-2.5" />
                </Link>

                <CommonButton
                  type="submit"
                  size="sm"
                  isLoading={connecting}
                  loadingText="Syncing..."
                >
                  Save Channel
                </CommonButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </CommonModal>
  );
}
