import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/hooks/useSettings";
import { useNseStatus } from "@/hooks/useNseStatus";

interface SettingsProps {
  onBack: () => void;
}

const Settings = ({ onBack }: SettingsProps) => {
  const { useMockData, toggleMockData } = useSettings();
  const { data: nseStatus } = useNseStatus();

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-[60] bg-background overflow-y-auto"
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-1 -ml-1 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold font-['Space_Grotesk'] text-foreground tracking-tight">Settings</h1>
        </div>
      </header>

      <div className="px-5 py-6 space-y-6">
        {/* Developer Options */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Developer Options
          </h2>

          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            {/* Mock Data Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Use Mock Data</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {useMockData ? "Using local sample data" : "Using live database (coming soon)"}
                </p>
              </div>
              <Switch checked={useMockData} onCheckedChange={toggleMockData} />
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* NSE Feed Status */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">NSE Feed Status</p>
                {nseStatus?.timeAgo && (
                  <p className="text-xs text-muted-foreground mt-0.5">Last updated {nseStatus.timeAgo}</p>
                )}
              </div>
              <span className={`text-xs font-medium flex items-center gap-1.5 ${
                nseStatus?.status === "live" ? "text-green-400" :
                nseStatus?.status === "delayed" ? "text-yellow-400" : "text-red-400"
              }`}>
                {nseStatus?.emoji ?? "🔴"} {nseStatus?.label ?? "Not Connected"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Settings;
