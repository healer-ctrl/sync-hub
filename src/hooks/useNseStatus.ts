import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface NseStatus {
  status: "live" | "delayed" | "disconnected";
  label: string;
  emoji: string;
  lastPolled: string | null;
  timeAgo: string;
}

export function useNseStatus() {
  return useQuery({
    queryKey: ["nse-status"],
    queryFn: async (): Promise<NseStatus> => {
      const { data, error } = await supabase
        .from("app_config")
        .select("value, updated_at")
        .eq("key", "nse_last_polled")
        .single();

      if (error || !data || data.value === "never") {
        return { status: "disconnected", label: "Not Connected", emoji: "🔴", lastPolled: null, timeAgo: "" };
      }

      const polledAt = new Date(data.value);
      const now = new Date();
      const diffMs = now.getTime() - polledAt.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      let timeAgo: string;
      if (diffMins < 1) timeAgo = "Just now";
      else if (diffMins < 60) timeAgo = `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
      else timeAgo = `${Math.floor(diffMins / 60)}h ago`;

      if (diffMins <= 20) {
        return { status: "live", label: "Live", emoji: "🟢", lastPolled: data.value, timeAgo };
      }
      if (diffMins <= 60) {
        return { status: "delayed", label: "Delayed", emoji: "🟡", lastPolled: data.value, timeAgo };
      }
      return { status: "disconnected", label: "Disconnected", emoji: "🔴", lastPolled: data.value, timeAgo };
    },
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}
