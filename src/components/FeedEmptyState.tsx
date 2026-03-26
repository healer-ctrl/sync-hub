import { motion } from "framer-motion";

interface FeedEmptyStateProps {
  onSwitchToMock: () => void;
}

const FeedEmptyState = ({ onSwitchToMock }: FeedEmptyStateProps) => (
  <div className="h-screen flex items-center justify-center px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center gap-4"
    >
      <span className="text-5xl">📡</span>
      <h2 className="text-lg font-bold font-['Space_Grotesk'] text-foreground">
        Waiting for reports...
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
        NSE feed will populate this once market opens
      </p>
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onSwitchToMock}
        className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
      >
        Switch to Mock Data
      </motion.button>
    </motion.div>
  </div>
);

export default FeedEmptyState;
