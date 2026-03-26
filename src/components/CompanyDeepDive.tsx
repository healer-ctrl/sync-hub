import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, Building2, TrendingUp, TrendingDown, BarChart3, Grid3X3, Newspaper, BookOpen } from "lucide-react";
import type { CompanyData } from "@/data/mockFinancials";
import { deepDiveData } from "@/data/companyDeepDive";
import CompanyLogo from "@/components/CompanyLogo";

interface CompanyDeepDiveProps {
  company: CompanyData;
  onBack: () => void;
}

const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon className="w-4 h-4 text-primary" />
    <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{title}</h3>
  </div>
);

const CompanyDeepDive = ({ company, onBack }: CompanyDeepDiveProps) => {
  const data = deepDiveData[company.id];
  const isPositive = company.changePercent >= 0;
  const dragX = useMotionValue(0);
  const pageOpacity = useTransform(dragX, [0, 150], [1, 0.7]);

  if (!data) return null;

  const { overview, stockInfo, quarterlyTimeline, keyMetrics, news, history } = data;

  // Find max revenue for chart scaling
  const maxRevenue = Math.max(...quarterlyTimeline.map((q) => q.revenue));
  const maxProfit = Math.max(...quarterlyTimeline.map((q) => q.netProfit));

  const metricsGrid = [
    { label: "Revenue", value: keyMetrics.revenue },
    { label: "Gross Margin", value: keyMetrics.grossMargin },
    { label: "Net Margin", value: keyMetrics.netMargin },
    { label: "ROE", value: keyMetrics.roe },
    { label: "ROCE", value: keyMetrics.roce },
    { label: "Debt/Equity", value: keyMetrics.debtToEquity },
    { label: "Free Cash Flow", value: keyMetrics.freeCashFlow },
  ];

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0, right: 0.6 }}
      style={{ x: dragX, opacity: pageOpacity }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100 || info.velocity.x > 400) {
          onBack();
        }
      }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      className="fixed inset-0 z-[60] bg-background overflow-y-auto touch-pan-y"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-3 px-5 py-4 max-w-[430px] mx-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate font-['Space_Grotesk']">{company.name}</p>
            <p className="text-xs text-muted-foreground font-mono">{company.ticker}</p>
          </div>
          <span className={`text-sm font-semibold flex items-center gap-1 ${isPositive ? "text-primary" : "text-destructive"}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {isPositive ? "+" : ""}{company.changePercent}%
          </span>
        </div>
      </div>

      <div className="max-w-[430px] mx-auto px-5 py-6 flex flex-col gap-8 pb-20">

        {/* SECTION 1 — Company Overview */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <SectionTitle icon={Building2} title="Company Overview" />
          <div className="flex items-center gap-4 mb-4">
            <CompanyLogo domain={company.domain} name={company.name} size="lg" />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold font-['Space_Grotesk'] text-foreground">{company.name}</h2>
              <p className="text-xs text-muted-foreground">{overview.sector} · {overview.industry}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-4">{overview.description}</p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Founded", value: overview.founded },
              { label: "HQ", value: overview.headquarters },
              { label: "CEO", value: overview.ceo },
              { label: "Employees", value: overview.employees },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-secondary/40 border border-border/50 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{item.label}</p>
                <p className="text-xs font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 2 — Stock Info */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SectionTitle icon={TrendingUp} title="Stock Information" />
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Current Price", value: stockInfo.currentPrice },
              { label: "Market Cap", value: stockInfo.marketCap },
              { label: "52W High", value: stockInfo.high52w },
              { label: "52W Low", value: stockInfo.low52w },
              { label: "P/E Ratio", value: stockInfo.peRatio },
              { label: "Div. Yield", value: stockInfo.dividendYield },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-secondary/60 border border-border p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                <p className="text-sm font-bold font-['Space_Grotesk'] text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 3 — Financials Timeline */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <SectionTitle icon={BarChart3} title="Financials Timeline" />
          
          {/* Revenue bars */}
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Revenue</p>
          <div className="flex items-end gap-2 h-28 mb-5">
            {quarterlyTimeline.map((q, i) => (
              <div key={q.quarter} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold font-['Space_Grotesk'] text-foreground">
                  {typeof q.revenue === "number" && q.revenue > 1000
                    ? `${(q.revenue / 1000).toFixed(0)}K`
                    : q.revenue.toFixed(1)}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(q.revenue / maxRevenue) * 80}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="w-full rounded-t-lg bg-primary/80"
                />
                <span className="text-[9px] text-muted-foreground mt-1">{q.quarter.replace("FY", "")}</span>
              </div>
            ))}
          </div>

          {/* Net Profit bars */}
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Net Profit</p>
          <div className="flex items-end gap-2 h-24 mb-4">
            {quarterlyTimeline.map((q, i) => (
              <div key={q.quarter} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold font-['Space_Grotesk'] text-foreground">
                  {typeof q.netProfit === "number" && q.netProfit > 1000
                    ? `${(q.netProfit / 1000).toFixed(0)}K`
                    : q.netProfit.toFixed(1)}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(q.netProfit / maxProfit) * 80}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className="w-full rounded-t-lg bg-accent/60"
                />
                <span className="text-[9px] text-muted-foreground mt-1">{q.quarter.replace("FY", "")}</span>
              </div>
            ))}
          </div>

          {/* EPS line */}
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">EPS Trend</p>
          <div className="flex items-center gap-3">
            {quarterlyTimeline.map((q) => (
              <div key={q.quarter} className="flex-1 text-center rounded-xl bg-secondary/40 border border-border/50 py-2.5">
                <p className="text-xs font-bold font-['Space_Grotesk'] text-primary">{q.eps}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">{q.quarter.replace("FY", "")}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 4 — Key Metrics Grid */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <SectionTitle icon={Grid3X3} title="Key Metrics" />
          <div className="grid grid-cols-2 gap-2.5">
            {metricsGrid.map((m) => (
              <div key={m.label} className="rounded-xl bg-secondary/60 border border-border p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{m.label}</p>
                <p className="text-sm font-bold font-['Space_Grotesk'] text-foreground">{m.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 5 — Company News */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <SectionTitle icon={Newspaper} title="Company News" />
          <div className="flex flex-col gap-3">
            {news.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.06 }}
                className="p-3.5 rounded-xl bg-secondary/40 border border-border/60"
              >
                <p className="text-[10px] text-primary font-medium mb-1">{item.date}</p>
                <p className="text-sm font-semibold text-foreground font-['Space_Grotesk'] mb-0.5">{item.headline}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.summary}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 6 — About & History */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <SectionTitle icon={BookOpen} title="About & History" />
          
          <p className="text-sm leading-relaxed text-muted-foreground mb-5">{history.foundingStory}</p>

          <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-medium">Milestones</h4>
          <div className="flex flex-col gap-1.5 mb-5">
            {history.milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-2.5 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <p className="text-xs text-foreground/80">{m}</p>
              </div>
            ))}
          </div>

          <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-medium">Key Products & Services</h4>
          <div className="flex flex-wrap gap-2 mb-5">
            {history.keyProducts.map((p) => (
              <span key={p} className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary text-muted-foreground">
                {p}
              </span>
            ))}
          </div>

          <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-medium">Competitors</h4>
          <div className="flex flex-wrap gap-2">
            {history.competitors.map((c) => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary">
                {c}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default CompanyDeepDive;
