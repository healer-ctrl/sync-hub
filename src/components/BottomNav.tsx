import { Home, Bookmark, Search } from "lucide-react";
import { motion } from "framer-motion";

export type TabType = "feed" | "bookmarks" | "search";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  bookmarkCount?: number;
}

const tabs = [
  { id: "feed" as TabType, icon: Home, label: "Feed" },
  { id: "bookmarks" as TabType, icon: Bookmark, label: "Saved" },
  { id: "search" as TabType, icon: Search, label: "Search" },
];

const BottomNav = ({ activeTab, onTabChange, bookmarkCount = 0 }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50">
      <div className="max-w-[375px] mx-auto flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 px-4 py-1 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-2 w-8 h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  fill={isActive && tab.id === "bookmarks" ? "currentColor" : "none"}
                />
                {tab.id === "bookmarks" && bookmarkCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                    {bookmarkCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
