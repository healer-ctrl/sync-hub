import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { companies, type CompanyData } from "@/data/mockFinancials";
import CompanyLogo from "@/components/CompanyLogo";

interface SearchTabProps {
  onSelectCompany: (company: CompanyData) => void;
}

const SearchTab = ({ onSelectCompany }: SearchTabProps) => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.ticker.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="h-screen pt-[72px] pb-20 overflow-y-auto">
      <div className="max-w-[375px] mx-auto px-5 py-4 flex flex-col gap-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company or ticker..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 font-['Inter']"
            autoFocus
          />
        </div>

        {/* Results */}
        <AnimatePresence mode="popLayout">
          {query.trim() && results.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground text-center py-8"
            >
              No companies found for "{query}"
            </motion.p>
          )}

          {results.map((company, i) => {
            const isPositive = company.changePercent >= 0;
            return (
              <motion.button
                key={company.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onSelectCompany(company)}
                className="w-full text-left flex items-center gap-3 p-3.5 rounded-xl bg-secondary/60 border border-border/60 active:scale-[0.98] transition-transform"
              >
                <CompanyLogo domain={company.domain} name={company.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground truncate font-['Space_Grotesk']">
                      {company.name}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground shrink-0">
                      {company.ticker}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5 leading-relaxed">
                    {company.headline}
                  </p>
                </div>
                <span className={`text-xs font-semibold flex items-center gap-0.5 shrink-0 ${isPositive ? "text-primary" : "text-destructive"}`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {isPositive ? "+" : ""}{company.changePercent}%
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Trending section when no query */}
        {!query.trim() && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3 pt-4">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Trending Companies
            </h3>
            {companies.slice(0, 5).map((company, i) => (
              <button
                key={company.id}
                onClick={() => onSelectCompany(company)}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/40 text-left active:scale-[0.98] transition-transform"
              >
                <span className="text-xs font-mono text-muted-foreground w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground font-['Space_Grotesk']">{company.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{company.ticker}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchTab;
