import type { CompanyData } from "./mockFinancials";

export interface CompanyDetail {
  sector: string;
  eps: string;
  recentUpdates: string[];
}

export const companyDetails: Record<string, CompanyDetail> = {
  aapl: {
    sector: "Technology — Consumer Electronics",
    eps: "$2.42",
    recentUpdates: [
      "iPhone 16 Pro Max becomes best-selling smartphone globally in Q1",
      "Apple Intelligence rollout expands to 12 new languages across EU markets",
      "Services segment crosses 1 billion paid subscriptions milestone",
      "Apple Vision Pro enterprise adoption doubles with new spatial computing SDK",
    ],
  },
  reliance: {
    sector: "Conglomerate — Energy & Telecom",
    eps: "₹29.4",
    recentUpdates: [
      "Jio crosses 490M subscribers, launches JioBrain AI platform for enterprises",
      "Reliance Retail opens 800 new stores across tier-2 and tier-3 cities",
      "New energy giga-factory in Jamnagar begins trial production of solar cells",
      "O2C segment secures long-term ethane supply deal with US-based exporter",
    ],
  },
  infy: {
    sector: "Technology — IT Services",
    eps: "$0.21",
    recentUpdates: [
      "Infosys wins $2B deal with a major European bank for cloud transformation",
      "Topaz AI platform now powers 280+ enterprise clients globally",
      "Company announces 85% of workforce trained on generative AI tools",
      "Infosys BPM expands delivery centers in Poland and Costa Rica",
    ],
  },
  tsla: {
    sector: "Automotive — Electric Vehicles",
    eps: "$0.73",
    recentUpdates: [
      "Refreshed Model Y becomes the world's best-selling car in Q4 2025",
      "Megapack deployments hit 15 GWh, making Tesla the largest battery storage provider",
      "FSD v13 achieves 5x safety improvement over human driving baseline",
      "Cybertruck production ramps to 2,500 units/week at Giga Texas",
    ],
  },
  msft: {
    sector: "Technology — Software & Cloud",
    eps: "$3.23",
    recentUpdates: [
      "Copilot for Microsoft 365 crosses 1M paid business seats in record time",
      "Azure AI services revenue reaches $10B annual run rate",
      "GitHub Copilot Enterprise adopted by 40% of Fortune 500 companies",
      "Microsoft acquires AI startup for $1.5B to bolster Copilot capabilities",
    ],
  },
  tcs: {
    sector: "Technology — IT Services",
    eps: "₹33.6",
    recentUpdates: [
      "TCS signs its largest-ever deal worth $4.2B with a US healthcare major",
      "Company launches TCS AI.Cloud to accelerate enterprise AI adoption",
      "Headcount rises by 5,726 — first net addition in four quarters",
      "TCS iON platform crosses 50M users for digital learning and assessments",
    ],
  },
  amzn: {
    sector: "Technology — E-Commerce & Cloud",
    eps: "$1.86",
    recentUpdates: [
      "AWS launches next-gen Trainium3 chips, reducing AI training costs by 40%",
      "Amazon advertising surges 27%, becoming the third-largest digital ad platform",
      "Same-day delivery now available in 120+ US metro areas",
      "Project Kuiper launches first batch of 60 broadband satellites into orbit",
    ],
  },
  hdfc: {
    sector: "Financial Services — Banking",
    eps: "₹22.8",
    recentUpdates: [
      "Post-merger integration reaches 85% completion, realizing ₹1,500 Cr in synergies",
      "Digital lending platform processes ₹50,000 Cr in home loans this quarter",
      "GNPA improves to 1.24%, the lowest in eight quarters",
      "HDFC Bank launches AI-powered wealth management platform for HNI clients",
    ],
  },
  nvda: {
    sector: "Technology — Semiconductors",
    eps: "$5.82",
    recentUpdates: [
      "Blackwell GPU production exceeds expectations, shipping to all major cloud providers",
      "NVIDIA AI Enterprise software revenue grows 150% YoY to $2.1B",
      "Company announces next-gen Rubin architecture at GTC 2026",
      "CUDA developer ecosystem surpasses 5 million active developers worldwide",
    ],
  },
  googl: {
    sector: "Technology — Internet & Advertising",
    eps: "$2.14",
    recentUpdates: [
      "AI Overviews now serve over 1 billion users monthly across Google Search",
      "Google Cloud achieves $1B operating profit for the first time ever",
      "Gemini 2.5 Pro launches with industry-leading multimodal reasoning benchmarks",
      "YouTube Shorts monetization grows 35% QoQ with expanded ad formats",
    ],
  },
};
