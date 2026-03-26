import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, TrendingUp, TrendingDown } from "lucide-react";
import type { CompanyData } from "@/data/mockFinancials";
import CompanyLogo from "@/components/CompanyLogo";

interface BookmarksTabProps {
  bookmarkedCompanies: CompanyData[];
  onSelectCompany: (company: CompanyData) => void;
  onRemoveBookmark: (id: string) => void;
}

const BookmarksTab = ({ bookmarkedCompanies, onSelectCompany, onRemoveBookmark }: BookmarksTabProps) => {
  return (
    <div className="h-screen pt-[72px] pb-20 overflow-y-auto">
      <div className="max-w-[375px] mx-auto px-5 py-4 flex flex-col gap-4">
        <h2 className="text-lg font-bold font-['Space_Grotesk'] text-foreground">
          Saved Companies
        </h2>

        <AnimatePresence mode="popLayout">
          {bookmarkedCompanies.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-secondary border border-border flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Swipe right on a card to save it here
              </p>
            </motion.div>
          )}

          {bookmarkedCompanies.map((company, i) => {
            const isPositive = company.changePercent >= 0;
            return (
              <motion.div
                key={company.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-secondary/60 border border-border/60"
              >
                <button
                  onClick={() => onSelectCompany(company)}
                  className="flex items-center gap-3 flex-1 min-w-0 text-left"
                >
                  <CompanyLogo domain={company.domain} name={company.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground truncate font-['Space_Grotesk']">
                        {company.name}
                      </span>
                      <span className={`text-xs font-semibold flex items-center gap-0.5 ${isPositive ? "text-primary" : "text-destructive"}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPositive ? "+" : ""}{company.changePercent}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{company.headline}</p>
                  </div>
                </button>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => onRemoveBookmark(company.id)}
                  className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                >
                  <Bookmark className="w-4 h-4 text-primary fill-primary" />
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookmarksTab;
