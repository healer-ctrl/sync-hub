import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";
import { type CompanyData, type CompanyCategory } from "@/data/mockFinancials";
import { useFeedData, type FeedCompany } from "@/hooks/useFeedData";
import { useSettings } from "@/hooks/useSettings";
import FinanceCard from "@/components/FinanceCard";
import FeedSkeleton from "@/components/FeedSkeleton";
import FeedEmptyState from "@/components/FeedEmptyState";
import FinancialReportSheet from "@/components/FinancialReportSheet";
import CompanyDeepDive from "@/components/CompanyDeepDive";
import CompanyDetailPage from "@/components/CompanyDetailPage";
import BottomNav, { type TabType } from "@/components/BottomNav";
import SearchTab from "@/components/SearchTab";
import BookmarksTab from "@/components/BookmarksTab";
import Settings from "@/pages/Settings";

type FilterType = "all" | CompanyCategory;

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "🇮🇳 India", value: "india" },
  { label: "🇺🇸 US", value: "us" },
  { label: "💻 Tech", value: "tech" },
  { label: "🏦 Banking", value: "banking" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("feed");
  const [showSettings, setShowSettings] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [reportCompany, setReportCompany] = useState<CompanyData | null>(null);
  const [deepDiveCompany, setDeepDiveCompany] = useState<CompanyData | null>(null);
  const [detailCompany, setDetailCompany] = useState<CompanyData | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const { useMockData, toggleMockData } = useSettings();

  // Fetch real data from Supabase (falls back to mock)
  const { data: companies = [], isLoading } = useFeedData(useMockData);

  const openDeepDive = useCallback((company: CompanyData) => {
    window.history.pushState({ overlay: "deepDive" }, "");
    setDeepDiveCompany(company);
  }, []);

  const closeDeepDive = useCallback(() => {
    setDeepDiveCompany((prev) => {
      if (prev) {
        if (window.history.state?.overlay === "deepDive") {
          window.history.back();
        }
      }
      return null;
    });
  }, []);

  const openDetail = useCallback((company: CompanyData) => {
    window.history.pushState({ overlay: "detail" }, "");
    setDetailCompany(company);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailCompany((prev) => {
      if (prev) {
        if (window.history.state?.overlay === "detail") {
          window.history.back();
        }
      }
      return null;
    });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (deepDiveCompany) {
        setDeepDiveCompany(null);
      } else if (detailCompany) {
        setDetailCompany(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [deepDiveCompany, detailCompany]);

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCompanies = useMemo(() => {
    if (activeFilter === "all") return companies;
    return companies.filter((c) => c.categories.includes(activeFilter));
  }, [activeFilter, companies]);

  const bookmarkedCompanies = useMemo(
    () => companies.filter((c) => bookmarkedIds.has(c.id)),
    [bookmarkedIds, companies]
  );

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const cardHeight = containerRef.current.clientHeight;
    const newIndex = Math.round(scrollTop / cardHeight);
    setActiveIndex(Math.min(newIndex, filteredCompanies.length - 1));
  }, [filteredCompanies.length]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setActiveIndex(0);
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="flex items-center justify-between px-5 py-3">
          <h1 className="text-lg font-bold font-['Space_Grotesk'] text-foreground tracking-tight">
            Fin<span className="text-primary">Pulse</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground font-medium">Live</span>
            </div>
            <button onClick={() => setShowSettings(true)} className="text-muted-foreground hover:text-foreground transition-colors">
              <SettingsIcon className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {activeTab === "feed" && (
          <div className="flex gap-2 px-5 pb-3 overflow-x-auto no-scrollbar">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => handleFilterChange(f.value)}
                className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                  activeFilter === f.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/60 text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </motion.header>

      {/* Feed tab */}
      {activeTab === "feed" && (
        <>
          {isLoading ? (
            <FeedSkeleton />
          ) : filteredCompanies.length === 0 && !useMockData ? (
            <FeedEmptyState onSwitchToMock={() => toggleMockData(true)} />
          ) : (
            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="snap-container h-screen overflow-y-scroll snap-y snap-mandatory"
            >
              {filteredCompanies.map((company) => (
                <FinanceCard
                  key={company.id}
                  company={company}
                  onReadReport={() => setReportCompany(company)}
                  onSwipeLeft={() => openDeepDive(company)}
                  onBookmark={() => toggleBookmark(company.id)}
                  isBookmarked={bookmarkedIds.has(company.id)}
                />
              ))}
            </div>
          )}

          {/* Side progress bar */}
          <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
            {filteredCompanies.map((_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-muted-foreground/20"
                animate={{
                  height: i === activeIndex ? 20 : 6,
                  backgroundColor: i === activeIndex
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground) / 0.2)",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </>
      )}

      {activeTab === "bookmarks" && (
        <BookmarksTab
          bookmarkedCompanies={bookmarkedCompanies}
          onSelectCompany={openDetail}
          onRemoveBookmark={(id) => toggleBookmark(id)}
        />
      )}

      {activeTab === "search" && (
        <SearchTab onSelectCompany={openDetail} />
      )}

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        bookmarkCount={bookmarkedIds.size}
      />

      <AnimatePresence>
        {reportCompany && (
          <FinancialReportSheet
            company={reportCompany}
            onClose={() => setReportCompany(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deepDiveCompany && (
          <CompanyDeepDive
            company={deepDiveCompany}
            onBack={closeDeepDive}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailCompany && (
          <CompanyDetailPage
            company={detailCompany}
            onBack={closeDetail}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && <Settings onBack={() => setShowSettings(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
