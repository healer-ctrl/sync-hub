import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, Newspaper } from "lucide-react";
import type { CompanyData } from "@/data/mockFinancials";
import { companyDetails } from "@/data/companyDetails";
import CompanyLogo from "@/components/CompanyLogo";

interface CompanyDetailPageProps {
  company: CompanyData;
  onBack: () => void;
}

const CompanyDetailPage = ({ company, onBack }: CompanyDetailPageProps) => {
  const detail = companyDetails[company.id];
  const isPositive = company.changePercent >= 0;

  const metrics = [
    { label: "Revenue", value: company.revenue },
    { label: "Net Profit", value: company.profit },
    { label: "EPS", value: detail?.eps ?? "—" },
    { label: "YoY Growth", value: company.growth },
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      className="fixed inset-0 z-[60] bg-background overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-3 px-5 py-4 max-w-[375px] mx-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate font-['Space_Grotesk']">
              {company.name}
            </p>
            <p className="text-xs text-muted-foreground font-mono">{company.ticker}</p>
          </div>
          <span className={`text-sm font-semibold flex items-center gap-1 ${isPositive ? "text-primary" : "text-destructive"}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {isPositive ? "+" : ""}{company.changePercent}%
          </span>
        </div>
      </div>

      <div className="max-w-[375px] mx-auto px-5 py-6 flex flex-col gap-6 pb-20">
        {/* Company identity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-4"
        >
          <CompanyLogo domain={company.domain} name={company.name} size="lg" />
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-foreground">{company.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{detail?.sector ?? "—"}</p>
            <span className="inline-block mt-1.5 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-border bg-secondary text-muted-foreground">
              {company.quarter}
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-base font-semibold font-['Space_Grotesk'] leading-snug text-foreground"
        >
          {company.headline}
        </motion.p>

        {/* Metrics grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                className="rounded-xl bg-secondary/60 border border-border p-4"
              >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  {m.label}
                </p>
                <p className="text-lg font-bold font-['Space_Grotesk'] text-foreground">
                  {m.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium flex items-center gap-2">
            <Newspaper className="w-3.5 h-3.5" />
            Recent Updates
          </h3>
          <div className="flex flex-col gap-3">
            {(detail?.recentUpdates ?? []).map((update, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex gap-3 items-start p-3 rounded-xl bg-secondary/40 border border-border/60"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{update}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* External link CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-xl border border-border bg-secondary text-foreground font-semibold text-sm flex items-center justify-center gap-2"
        >
          View on Bloomberg
          <ExternalLink className="w-4 h-4 text-primary" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CompanyDetailPage;
