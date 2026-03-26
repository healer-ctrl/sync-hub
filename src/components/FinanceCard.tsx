import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, FileText, Bookmark } from "lucide-react";
import type { CompanyData } from "@/data/mockFinancials";
import CompanyLogo from "@/components/CompanyLogo";

interface FinanceCardProps {
  company: CompanyData;
  onReadReport?: () => void;
  onSwipeLeft?: () => void;
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

const FinanceCard = ({ company, onReadReport, onSwipeLeft, onBookmark, isBookmarked = false }: FinanceCardProps) => {
  const isPositive = company.changePercent >= 0;
  const [showBookmarkAnim, setShowBookmarkAnim] = useState(false);
  const x = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Visual feedback during drag
  const leftIndicatorOpacity = useTransform(x, [-120, -60, 0], [1, 0.5, 0]);
  const rightIndicatorOpacity = useTransform(x, [0, 60, 120], [0, 0.5, 1]);
  const rotate = useTransform(x, [-200, 0, 200], [-5, 0, 5]);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 80;
    const velocityThreshold = 300;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      onSwipeLeft?.();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      onBookmark?.();
      setShowBookmarkAnim(true);
      setTimeout(() => setShowBookmarkAnim(false), 1200);
    }
  };

  return (
    <div className="h-screen w-full snap-start flex items-center justify-center px-5 py-8 relative overflow-hidden">
      {/* Swipe indicators */}
      <motion.div
        style={{ opacity: leftIndicatorOpacity }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1"
      >
        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
          <FileText className="w-4 h-4 text-primary" />
        </div>
        <span className="text-[10px] text-primary font-medium">Deep Dive</span>
      </motion.div>

      <motion.div
        style={{ opacity: rightIndicatorOpacity }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1"
      >
        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
          <Bookmark className="w-4 h-4 text-primary" />
        </div>
        <span className="text-[10px] text-primary font-medium">Save</span>
      </motion.div>

      {/* Bookmark animation overlay */}
      <AnimatePresence>
        {showBookmarkAnim && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Bookmark className="w-10 h-10 text-primary fill-primary" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={cardRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        onDragEnd={handleDragEnd}
        style={{ x, rotate }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-full max-w-[375px] flex flex-col gap-5 touch-pan-y"
      >
        {/* Top pill — quarter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          viewport={{ once: true }}
          className="self-start flex items-center gap-2"
        >
          <span className="text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-full border border-border bg-secondary text-muted-foreground">
            {company.quarter}
          </span>
          {isBookmarked && (
            <Bookmark className="w-3.5 h-3.5 text-primary fill-primary" />
          )}
        </motion.div>

        {/* Company header */}
        <div className="flex items-center gap-4">
          <CompanyLogo domain={company.domain} name={company.name} size="md" />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold font-['Space_Grotesk'] text-foreground truncate">
              {company.name}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-mono text-muted-foreground">{company.ticker}</span>
              <span className={`text-sm font-semibold flex items-center gap-0.5 ${isPositive ? "text-primary" : "text-destructive"}`}>
                {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isPositive ? "+" : ""}{company.changePercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          viewport={{ once: true }}
          className="text-lg font-semibold font-['Space_Grotesk'] leading-snug text-foreground"
        >
          {company.headline}
        </motion.h3>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm leading-relaxed text-muted-foreground"
        >
          {company.summary}
        </motion.p>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: "Revenue", value: company.revenue },
            { label: "Profit", value: company.profit },
            { label: "Growth", value: company.growth },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-secondary/60 border border-border p-3 text-center"
            >
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-sm font-bold font-['Space_Grotesk'] text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Read Full Report link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-between"
        >
          <button
            onClick={onReadReport}
            className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline underline-offset-2 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Read Full Report
          </button>
          <span className="text-[10px] text-muted-foreground/50">← swipe for deep dive</span>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default FinanceCard;
