export interface QuarterlyData {
  quarter: string;
  revenue: number;
  netProfit: number;
  eps: number;
}

export interface StockInfo {
  currentPrice: string;
  high52w: string;
  low52w: string;
  marketCap: string;
  peRatio: string;
  dividendYield: string;
}

export interface CompanyOverview {
  founded: string;
  headquarters: string;
  sector: string;
  industry: string;
  description: string;
  ceo: string;
  employees: string;
}

export interface KeyMetrics {
  revenue: string;
  grossMargin: string;
  netMargin: string;
  roe: string;
  roce: string;
  debtToEquity: string;
  freeCashFlow: string;
}

export interface NewsItem {
  date: string;
  headline: string;
  summary: string;
}

export interface CompanyHistory {
  foundingStory: string;
  milestones: string[];
  keyProducts: string[];
  competitors: string[];
}

export interface FinancialReport {
  reportText: string;
  balanceSheet: { label: string; value: string }[];
  keyRatios: { label: string; value: string }[];
}

export interface DeepDiveData {
  overview: CompanyOverview;
  stockInfo: StockInfo;
  quarterlyTimeline: QuarterlyData[];
  keyMetrics: KeyMetrics;
  news: NewsItem[];
  history: CompanyHistory;
  financialReport: FinancialReport;
}

export const deepDiveData: Record<string, DeepDiveData> = {
  aapl: {
    overview: {
      founded: "1976",
      headquarters: "Cupertino, California",
      sector: "Technology",
      industry: "Consumer Electronics",
      description: "Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories. The company also offers digital content, cloud services, and a growing ecosystem of subscription services.",
      ceo: "Tim Cook",
      employees: "164,000",
    },
    stockInfo: {
      currentPrice: "$243.85",
      high52w: "$260.10",
      low52w: "$164.08",
      marketCap: "$3.72T",
      peRatio: "32.4",
      dividendYield: "0.52%",
    },
    quarterlyTimeline: [
      { quarter: "Q2 FY25", revenue: 94.8, netProfit: 23.6, eps: 1.53 },
      { quarter: "Q3 FY25", revenue: 85.8, netProfit: 21.4, eps: 1.4 },
      { quarter: "Q4 FY25", revenue: 119.6, netProfit: 33.9, eps: 2.18 },
      { quarter: "Q1 FY26", revenue: 124.3, netProfit: 36.3, eps: 2.42 },
    ],
    keyMetrics: {
      revenue: "$124.3B",
      grossMargin: "46.9%",
      netMargin: "29.2%",
      roe: "171.3%",
      roce: "63.8%",
      debtToEquity: "1.87",
      freeCashFlow: "$32.1B",
    },
    news: [
      { date: "Mar 12, 2026", headline: "iPhone 16 Pro Max tops global sales charts", summary: "Apple's flagship became the best-selling smartphone worldwide in Q1 2026." },
      { date: "Mar 8, 2026", headline: "Apple Intelligence expands to 12 new languages", summary: "AI features now available across EU markets with multilingual support." },
      { date: "Feb 28, 2026", headline: "Services crosses 1B paid subscriptions", summary: "Apple's services segment hits a major milestone with recurring revenue." },
      { date: "Feb 15, 2026", headline: "Vision Pro enterprise adoption doubles", summary: "New spatial computing SDK drives B2B growth for the headset platform." },
      { date: "Feb 1, 2026", headline: "Apple announces $110B buyback program", summary: "Largest share repurchase in corporate history signals confidence." },
    ],
    history: {
      foundingStory: "Founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in a Los Altos garage in 1976. The company revolutionized personal computing with the Macintosh and later redefined mobile with the iPhone in 2007.",
      milestones: ["1984 — Macintosh launch", "2001 — iPod + iTunes", "2007 — iPhone launch", "2010 — iPad launch", "2015 — Apple Watch", "2023 — Vision Pro announced"],
      keyProducts: ["iPhone", "Mac", "iPad", "Apple Watch", "AirPods", "Apple TV+", "iCloud"],
      competitors: ["Samsung", "Google", "Microsoft", "Huawei"],
    },
    financialReport: {
      reportText: "Apple Inc. reported record quarterly revenue of $124.3 billion for Q1 FY2026, up 4% year-over-year. iPhone revenue reached $71.4B driven by strong iPhone 16 demand in emerging markets. Services hit an all-time high of $23.1B. The company returned $29B to shareholders through dividends and buybacks.",
      balanceSheet: [
        { label: "Total Assets", value: "$352.6B" },
        { label: "Total Liabilities", value: "$274.8B" },
        { label: "Shareholders' Equity", value: "$77.8B" },
        { label: "Cash & Equivalents", value: "$29.9B" },
        { label: "Long-term Debt", value: "$98.3B" },
      ],
      keyRatios: [
        { label: "P/E Ratio", value: "32.4x" },
        { label: "EPS", value: "$2.42" },
        { label: "Debt/Equity", value: "1.87" },
        { label: "EBITDA", value: "$42.1B" },
        { label: "Current Ratio", value: "1.07" },
        { label: "ROE", value: "171.3%" },
      ],
    },
  },
  reliance: {
    overview: { founded: "1966", headquarters: "Mumbai, India", sector: "Conglomerate", industry: "Energy & Telecom", description: "Reliance Industries is India's largest private sector company, spanning oil refining, petrochemicals, telecom (Jio), retail, and new energy ventures.", ceo: "Mukesh Ambani", employees: "389,000" },
    stockInfo: { currentPrice: "₹2,856", high52w: "₹3,024", low52w: "₹2,221", marketCap: "₹19.3L Cr", peRatio: "28.6", dividendYield: "0.35%" },
    quarterlyTimeline: [
      { quarter: "Q4 FY25", revenue: 240000, netProfit: 17500, eps: 25.8 },
      { quarter: "Q1 FY26", revenue: 252000, netProfit: 18200, eps: 26.9 },
      { quarter: "Q2 FY26", revenue: 261000, netProfit: 18900, eps: 27.9 },
      { quarter: "Q3 FY26", revenue: 270000, netProfit: 19878, eps: 29.4 },
    ],
    keyMetrics: { revenue: "₹2.7L Cr", grossMargin: "34.2%", netMargin: "7.4%", roe: "9.8%", roce: "10.2%", debtToEquity: "0.42", freeCashFlow: "₹28,400 Cr" },
    news: [
      { date: "Mar 10, 2026", headline: "Jio crosses 490M subscribers", summary: "JioBrain AI platform launched for enterprise customers." },
      { date: "Mar 5, 2026", headline: "Reliance Retail opens 800 new stores", summary: "Expansion focuses on tier-2 and tier-3 cities." },
      { date: "Feb 22, 2026", headline: "New energy giga-factory begins trial run", summary: "Jamnagar facility starts solar cell production." },
      { date: "Feb 10, 2026", headline: "O2C segment secures ethane deal", summary: "Long-term supply agreement with US exporter." },
      { date: "Jan 28, 2026", headline: "Jio Financial Services gets RBI approval", summary: "Approved to commence lending operations." },
    ],
    history: { foundingStory: "Founded by Dhirubhai Ambani as a small textile trading company in 1966, Reliance grew into India's most valuable conglomerate under the leadership of Mukesh Ambani.", milestones: ["1977 — IPO", "2002 — Jamnagar refinery", "2016 — Jio launch", "2020 — $20B fundraise", "2023 — New energy push"], keyProducts: ["Jio Telecom", "Reliance Retail", "Petrochemicals", "Oil Refining", "Jio Financial Services"], competitors: ["Bharti Airtel", "Adani Group", "IOCL", "BPCL"] },
    financialReport: { reportText: "Reliance Industries posted consolidated revenue of ₹2.7 lakh crore for Q3 FY2026, up 7.5% YoY. Jio Platforms added 18M subscribers while Retail segment grew 14%. O2C margins compressed slightly due to global crude price fluctuations.", balanceSheet: [{ label: "Total Assets", value: "₹16.8L Cr" }, { label: "Total Liabilities", value: "₹10.2L Cr" }, { label: "Shareholders' Equity", value: "₹6.6L Cr" }, { label: "Cash & Equivalents", value: "₹1.8L Cr" }, { label: "Long-term Debt", value: "₹2.9L Cr" }], keyRatios: [{ label: "P/E Ratio", value: "28.6x" }, { label: "EPS", value: "₹29.4" }, { label: "Debt/Equity", value: "0.42" }, { label: "EBITDA", value: "₹45,200 Cr" }, { label: "Current Ratio", value: "1.22" }, { label: "ROE", value: "9.8%" }] },
  },
  infy: {
    overview: { founded: "1981", headquarters: "Bengaluru, India", sector: "Technology", industry: "IT Services & Consulting", description: "Infosys provides consulting, technology, and outsourcing solutions to global enterprises. The company is a pioneer of India's IT industry and a leader in digital transformation services.", ceo: "Salil Parekh", employees: "317,000" },
    stockInfo: { currentPrice: "$22.40", high52w: "$24.80", low52w: "$16.90", marketCap: "$93.2B", peRatio: "28.1", dividendYield: "2.14%" },
    quarterlyTimeline: [
      { quarter: "Q4 FY25", revenue: 4.6, netProfit: 0.79, eps: 0.19 },
      { quarter: "Q1 FY26", revenue: 4.7, netProfit: 0.81, eps: 0.19 },
      { quarter: "Q2 FY26", revenue: 4.8, netProfit: 0.84, eps: 0.2 },
      { quarter: "Q3 FY26", revenue: 4.9, netProfit: 0.87, eps: 0.21 },
    ],
    keyMetrics: { revenue: "$4.9B", grossMargin: "33.8%", netMargin: "17.8%", roe: "32.1%", roce: "40.2%", debtToEquity: "0.11", freeCashFlow: "$680M" },
    news: [
      { date: "Mar 11, 2026", headline: "Infosys wins $2B European bank deal", summary: "Cloud transformation contract with a major European bank." },
      { date: "Mar 3, 2026", headline: "Topaz AI powers 280+ clients", summary: "Enterprise AI platform adoption accelerates globally." },
      { date: "Feb 20, 2026", headline: "85% workforce trained on Gen AI", summary: "Company-wide upskilling initiative reaches milestone." },
      { date: "Feb 8, 2026", headline: "BPM expands in Poland and Costa Rica", summary: "New delivery centers to serve European and US clients." },
      { date: "Jan 25, 2026", headline: "Infosys raises FY26 guidance", summary: "Revenue growth guidance raised to 5.5-6.5% on strong deal wins." },
    ],
    history: { foundingStory: "Founded by N.R. Narayana Murthy and six engineers with $250 in capital in 1981, Infosys became the gold standard for India's IT services industry and a symbol of the country's tech revolution.", milestones: ["1993 — IPO on BSE", "1999 — Listed on NASDAQ", "2004 — $1B revenue", "2017 — Salil Parekh becomes CEO", "2023 — Topaz AI launch"], keyProducts: ["Infosys Cobalt", "Topaz AI", "Infosys BPM", "EdgeVerve", "Infosys Nia"], competitors: ["TCS", "Wipro", "HCL Tech", "Accenture"] },
    financialReport: { reportText: "Infosys delivered $4.9B revenue for Q3 FY2026, beating consensus estimates. Large deal TCV hit $4.1B — the best quarter in two years. Operating margins improved 60bps to 21.5% driven by automation and pyramid optimization.", balanceSheet: [{ label: "Total Assets", value: "$16.8B" }, { label: "Total Liabilities", value: "$7.2B" }, { label: "Shareholders' Equity", value: "$9.6B" }, { label: "Cash & Equivalents", value: "$4.1B" }, { label: "Long-term Debt", value: "$0.3B" }], keyRatios: [{ label: "P/E Ratio", value: "28.1x" }, { label: "EPS", value: "$0.21" }, { label: "Debt/Equity", value: "0.11" }, { label: "EBITDA", value: "$1.05B" }, { label: "Current Ratio", value: "2.34" }, { label: "ROE", value: "32.1%" }] },
  },
  tsla: {
    overview: { founded: "2003", headquarters: "Austin, Texas", sector: "Automotive", industry: "Electric Vehicles & Clean Energy", description: "Tesla designs, manufactures, and sells electric vehicles, energy storage systems, and solar energy generation products. The company is also developing autonomous driving technology and humanoid robotics.", ceo: "Elon Musk", employees: "140,000" },
    stockInfo: { currentPrice: "$412.30", high52w: "$488.50", low52w: "$138.80", marketCap: "$1.32T", peRatio: "164.5", dividendYield: "0%" },
    quarterlyTimeline: [
      { quarter: "Q1 2025", revenue: 21.3, netProfit: 1.5, eps: 0.45 },
      { quarter: "Q2 2025", revenue: 24.9, netProfit: 2.0, eps: 0.62 },
      { quarter: "Q3 2025", revenue: 25.2, netProfit: 2.2, eps: 0.68 },
      { quarter: "Q4 2025", revenue: 25.7, netProfit: 2.5, eps: 0.73 },
    ],
    keyMetrics: { revenue: "$25.7B", grossMargin: "19.8%", netMargin: "9.7%", roe: "22.4%", roce: "15.8%", debtToEquity: "0.08", freeCashFlow: "$2.1B" },
    news: [
      { date: "Mar 9, 2026", headline: "Model Y refresh becomes best-selling car", summary: "Refreshed Model Y tops global car sales in Q4 2025." },
      { date: "Mar 2, 2026", headline: "Megapack deployments hit 15 GWh", summary: "Tesla becomes the largest battery storage provider globally." },
      { date: "Feb 18, 2026", headline: "FSD v13 achieves 5x safety improvement", summary: "Full Self-Driving surpasses human driving safety baseline." },
      { date: "Feb 5, 2026", headline: "Cybertruck ramps to 2,500 units/week", summary: "Production at Giga Texas accelerates beyond initial targets." },
      { date: "Jan 20, 2026", headline: "Optimus robot demo impresses investors", summary: "Humanoid robot performs complex manufacturing tasks." },
    ],
    history: { foundingStory: "Founded by Martin Eberhard and Marc Tarpenning in 2003, with Elon Musk joining as chairman and lead investor. Tesla popularized electric vehicles with the Roadster and scaled with Model S, 3, X, and Y.", milestones: ["2008 — Roadster launch", "2012 — Model S", "2017 — Model 3", "2020 — S&P 500 inclusion", "2023 — Cybertruck", "2025 — FSD v13"], keyProducts: ["Model 3", "Model Y", "Cybertruck", "Megapack", "Powerwall", "Solar Roof"], competitors: ["BYD", "Rivian", "Mercedes EQ", "BMW iX"] },
    financialReport: { reportText: "Tesla delivered 512K vehicles in Q4 2025, up 20% YoY, led by the refreshed Model Y. Automotive revenue hit $21.6B while energy storage deployments doubled. Operating margin recovered to 9.2% after multiple rounds of price cuts earlier in the year.", balanceSheet: [{ label: "Total Assets", value: "$106.6B" }, { label: "Total Liabilities", value: "$43.2B" }, { label: "Shareholders' Equity", value: "$63.4B" }, { label: "Cash & Equivalents", value: "$16.4B" }, { label: "Long-term Debt", value: "$2.9B" }], keyRatios: [{ label: "P/E Ratio", value: "164.5x" }, { label: "EPS", value: "$0.73" }, { label: "Debt/Equity", value: "0.08" }, { label: "EBITDA", value: "$4.8B" }, { label: "Current Ratio", value: "1.73" }, { label: "ROE", value: "22.4%" }] },
  },
  msft: {
    overview: { founded: "1975", headquarters: "Redmond, Washington", sector: "Technology", industry: "Software & Cloud Computing", description: "Microsoft develops and licenses software, provides cloud computing services through Azure, and manufactures hardware. The company leads in enterprise software, AI integration, and gaming.", ceo: "Satya Nadella", employees: "228,000" },
    stockInfo: { currentPrice: "$468.50", high52w: "$505.20", low52w: "$366.50", marketCap: "$3.48T", peRatio: "36.8", dividendYield: "0.72%" },
    quarterlyTimeline: [
      { quarter: "Q3 FY25", revenue: 56.5, netProfit: 20.1, eps: 2.7 },
      { quarter: "Q4 FY25", revenue: 60.2, netProfit: 21.8, eps: 2.93 },
      { quarter: "Q1 FY26", revenue: 62.4, netProfit: 22.6, eps: 3.04 },
      { quarter: "Q2 FY26", revenue: 65.6, netProfit: 24.1, eps: 3.23 },
    ],
    keyMetrics: { revenue: "$65.6B", grossMargin: "69.4%", netMargin: "36.7%", roe: "39.2%", roce: "31.4%", debtToEquity: "0.32", freeCashFlow: "$21.3B" },
    news: [
      { date: "Mar 13, 2026", headline: "Copilot crosses 1M paid business seats", summary: "Microsoft 365 Copilot adoption reaches record milestone." },
      { date: "Mar 6, 2026", headline: "Azure AI hits $10B annual run rate", summary: "AI services become Azure's fastest-growing segment." },
      { date: "Feb 25, 2026", headline: "GitHub Copilot in 40% of Fortune 500", summary: "Enterprise adoption accelerates developer productivity tools." },
      { date: "Feb 12, 2026", headline: "Microsoft acquires AI startup for $1.5B", summary: "Acquisition bolsters Copilot capabilities across products." },
      { date: "Jan 30, 2026", headline: "Xbox Game Pass hits 50M subscribers", summary: "Gaming subscription service grows 25% in six months." },
    ],
    history: { foundingStory: "Founded by Bill Gates and Paul Allen in 1975, Microsoft built the dominant PC operating system and became the world's most valuable company. Under Satya Nadella, it pivoted successfully to cloud and AI.", milestones: ["1985 — Windows 1.0", "1995 — Windows 95", "2001 — Xbox", "2014 — Nadella becomes CEO", "2016 — LinkedIn acquisition", "2023 — Copilot launch"], keyProducts: ["Windows", "Azure", "Microsoft 365", "Teams", "LinkedIn", "Xbox", "GitHub"], competitors: ["Google", "Amazon", "Salesforce", "Apple"] },
    financialReport: { reportText: "Microsoft reported $65.6B revenue for Q2 FY2026, up 16% YoY. Azure grew 33% driven by AI services now at a $10B annual run rate. Copilot adoption crossed 1M paid business users. EPS of $3.23 beat consensus by 8%, driven by operating leverage and margin expansion.", balanceSheet: [{ label: "Total Assets", value: "$512.2B" }, { label: "Total Liabilities", value: "$234.8B" }, { label: "Shareholders' Equity", value: "$277.4B" }, { label: "Cash & Equivalents", value: "$75.5B" }, { label: "Long-term Debt", value: "$42.3B" }], keyRatios: [{ label: "P/E Ratio", value: "36.8x" }, { label: "EPS", value: "$3.23" }, { label: "Debt/Equity", value: "0.32" }, { label: "EBITDA", value: "$32.4B" }, { label: "Current Ratio", value: "1.77" }, { label: "ROE", value: "39.2%" }] },
  },
  tcs: {
    overview: { founded: "1968", headquarters: "Mumbai, India", sector: "Technology", industry: "IT Services & Consulting", description: "Tata Consultancy Services is a global leader in IT services, consulting, and business solutions, serving enterprises across 46 countries with a focus on digital transformation.", ceo: "K Krithivasan", employees: "614,000" },
    stockInfo: { currentPrice: "₹4,180", high52w: "₹4,592", low52w: "₹3,310", marketCap: "₹15.2L Cr", peRatio: "30.5", dividendYield: "1.42%" },
    quarterlyTimeline: [
      { quarter: "Q4 FY25", revenue: 60200, netProfit: 11500, eps: 31.4 },
      { quarter: "Q1 FY26", revenue: 61800, netProfit: 11900, eps: 32.5 },
      { quarter: "Q2 FY26", revenue: 63100, netProfit: 12100, eps: 33.1 },
      { quarter: "Q3 FY26", revenue: 64259, netProfit: 12380, eps: 33.6 },
    ],
    keyMetrics: { revenue: "₹64,259 Cr", grossMargin: "31.2%", netMargin: "19.3%", roe: "48.6%", roce: "62.1%", debtToEquity: "0.04", freeCashFlow: "₹11,200 Cr" },
    news: [
      { date: "Mar 14, 2026", headline: "TCS bags $4.2B US healthcare deal", summary: "Largest-ever deal signed with a US healthcare major." },
      { date: "Mar 7, 2026", headline: "TCS AI.Cloud platform launched", summary: "New platform accelerates enterprise AI adoption." },
      { date: "Feb 24, 2026", headline: "Headcount rises by 5,726", summary: "First net addition in four quarters signals recovery." },
      { date: "Feb 11, 2026", headline: "TCS iON crosses 50M users", summary: "Digital learning platform reaches massive scale." },
      { date: "Jan 29, 2026", headline: "BFSI segment grows 5.2%", summary: "Banking and financial services recovery accelerates." },
    ],
    history: { foundingStory: "Established in 1968 as a division of Tata Sons, TCS pioneered India's IT outsourcing industry. It became the first Indian IT company to reach $100B market cap.", milestones: ["1968 — Founded", "2004 — IPO on BSE/NSE", "2018 — $100B market cap", "2021 — $200B market cap", "2024 — $30B annual revenue"], keyProducts: ["TCS BaNCS", "ignio", "TCS iON", "HOBS", "TCS AI.Cloud"], competitors: ["Infosys", "Wipro", "HCL Tech", "Cognizant"] },
    financialReport: { reportText: "TCS reported ₹64,259 Cr revenue for Q3 FY2026 with an order book at $12.2B — its highest ever. BFSI grew 5.2%, signaling recovery. Operating margin held steady at 24.3% with headcount rising by 5,726.", balanceSheet: [{ label: "Total Assets", value: "₹1.2L Cr" }, { label: "Total Liabilities", value: "₹52,400 Cr" }, { label: "Shareholders' Equity", value: "₹67,600 Cr" }, { label: "Cash & Equivalents", value: "₹42,800 Cr" }, { label: "Long-term Debt", value: "₹1,200 Cr" }], keyRatios: [{ label: "P/E Ratio", value: "30.5x" }, { label: "EPS", value: "₹33.6" }, { label: "Debt/Equity", value: "0.04" }, { label: "EBITDA", value: "₹17,800 Cr" }, { label: "Current Ratio", value: "2.68" }, { label: "ROE", value: "48.6%" }] },
  },
  amzn: {
    overview: { founded: "1994", headquarters: "Seattle, Washington", sector: "Technology", industry: "E-Commerce & Cloud Computing", description: "Amazon is the world's largest online retailer and cloud computing provider through AWS. The company also operates in advertising, streaming, logistics, and AI services.", ceo: "Andy Jassy", employees: "1,540,000" },
    stockInfo: { currentPrice: "$228.60", high52w: "$242.50", low52w: "$151.60", marketCap: "$2.39T", peRatio: "61.2", dividendYield: "0%" },
    quarterlyTimeline: [
      { quarter: "Q1 2025", revenue: 143.3, netProfit: 10.4, eps: 0.98 },
      { quarter: "Q2 2025", revenue: 148.0, netProfit: 13.5, eps: 1.26 },
      { quarter: "Q3 2025", revenue: 158.9, netProfit: 15.3, eps: 1.43 },
      { quarter: "Q4 2025", revenue: 187.8, netProfit: 15.3, eps: 1.86 },
    ],
    keyMetrics: { revenue: "$187.8B", grossMargin: "48.4%", netMargin: "8.1%", roe: "22.8%", roce: "14.6%", debtToEquity: "0.58", freeCashFlow: "$35.5B" },
    news: [
      { date: "Mar 12, 2026", headline: "AWS launches Trainium3 chips", summary: "Next-gen chips reduce AI training costs by 40%." },
      { date: "Mar 4, 2026", headline: "Advertising surges 27%", summary: "Amazon becomes the third-largest digital ad platform." },
      { date: "Feb 21, 2026", headline: "Same-day delivery in 120+ metros", summary: "Logistics expansion accelerates fulfillment speeds." },
      { date: "Feb 7, 2026", headline: "Project Kuiper launches 60 satellites", summary: "First batch of broadband satellites reaches orbit." },
      { date: "Jan 24, 2026", headline: "Alexa+ subscription crosses 10M users", summary: "AI-powered assistant upgrade gains rapid traction." },
    ],
    history: { foundingStory: "Jeff Bezos founded Amazon in 1994 as an online bookstore from his garage in Bellevue, Washington. The company expanded into everything from cloud computing to space exploration.", milestones: ["1997 — IPO", "2006 — AWS launched", "2015 — Echo & Alexa", "2017 — Whole Foods acquisition", "2024 — Project Kuiper"], keyProducts: ["AWS", "Prime", "Alexa", "Kindle", "Ring", "MGM Studios"], competitors: ["Microsoft Azure", "Google Cloud", "Walmart", "Shopify"] },
    financialReport: { reportText: "Amazon posted $187.8B revenue for Q4 2025. AWS grew 19% to $27.5B with AI being the fastest-growing segment. Operating income tripled YoY to $15.3B. Advertising revenue surged 27% to $14.7B, making Amazon the third-largest ad platform globally.", balanceSheet: [{ label: "Total Assets", value: "$528.4B" }, { label: "Total Liabilities", value: "$316.8B" }, { label: "Shareholders' Equity", value: "$211.6B" }, { label: "Cash & Equivalents", value: "$73.4B" }, { label: "Long-term Debt", value: "$58.3B" }], keyRatios: [{ label: "P/E Ratio", value: "61.2x" }, { label: "EPS", value: "$1.86" }, { label: "Debt/Equity", value: "0.58" }, { label: "EBITDA", value: "$28.4B" }, { label: "Current Ratio", value: "1.05" }, { label: "ROE", value: "22.8%" }] },
  },
  hdfc: {
    overview: { founded: "1994", headquarters: "Mumbai, India", sector: "Financial Services", industry: "Banking", description: "HDFC Bank is India's largest private sector bank by assets, providing a range of banking and financial services including retail banking, wholesale banking, and treasury operations.", ceo: "Sashidhar Jagdishan", employees: "213,000" },
    stockInfo: { currentPrice: "₹1,742", high52w: "₹1,880", low52w: "₹1,363", marketCap: "₹13.3L Cr", peRatio: "19.2", dividendYield: "1.12%" },
    quarterlyTimeline: [
      { quarter: "Q4 FY25", revenue: 66800, netProfit: 16200, eps: 21.3 },
      { quarter: "Q1 FY26", revenue: 68200, netProfit: 16500, eps: 21.7 },
      { quarter: "Q2 FY26", revenue: 69800, netProfit: 16850, eps: 22.1 },
      { quarter: "Q3 FY26", revenue: 71356, netProfit: 17261, eps: 22.8 },
    ],
    keyMetrics: { revenue: "₹71,356 Cr", grossMargin: "N/A", netMargin: "24.2%", roe: "16.8%", roce: "N/A", debtToEquity: "N/A", freeCashFlow: "₹24,500 Cr" },
    news: [
      { date: "Mar 8, 2026", headline: "Post-merger integration at 85%", summary: "₹1,500 Cr in synergies realized from HDFC merger." },
      { date: "Mar 1, 2026", headline: "Digital lending processes ₹50K Cr", summary: "Home loan platform sets quarterly record." },
      { date: "Feb 16, 2026", headline: "GNPA improves to 1.24%", summary: "Asset quality at best level in eight quarters." },
      { date: "Feb 3, 2026", headline: "AI-powered wealth platform launched", summary: "New platform targets high-net-worth individuals." },
      { date: "Jan 18, 2026", headline: "Rural branch expansion accelerates", summary: "500 new branches planned in underbanked regions." },
    ],
    history: { foundingStory: "HDFC Bank was established in 1994 as a subsidiary of the Housing Development Finance Corporation. It rapidly grew to become India's most valuable bank through technology-driven banking and prudent risk management.", milestones: ["1995 — IPO", "2001 — Times Bank merger", "2008 — Centurion Bank merger", "2023 — HDFC Ltd merger", "2025 — India's largest bank by deposits"], keyProducts: ["SmartBUY", "PayZapp", "HDFC Securities", "Home Loans", "Credit Cards"], competitors: ["ICICI Bank", "SBI", "Kotak Bank", "Axis Bank"] },
    financialReport: { reportText: "HDFC Bank posted ₹71,356 Cr NII for Q3 FY2026, up 4.2% QoQ. Net profit rose 2.5% to ₹17,261 Cr. Asset quality improved with GNPA at 1.24%. The HDFC Ltd merger integration is now 85% complete with ₹1,500 Cr synergies already realized.", balanceSheet: [{ label: "Total Assets", value: "₹36.2L Cr" }, { label: "Total Deposits", value: "₹24.8L Cr" }, { label: "Net Advances", value: "₹25.2L Cr" }, { label: "Shareholders' Equity", value: "₹3.4L Cr" }, { label: "Capital Adequacy", value: "18.4%" }], keyRatios: [{ label: "P/E Ratio", value: "19.2x" }, { label: "EPS", value: "₹22.8" }, { label: "NIM", value: "3.46%" }, { label: "CASA Ratio", value: "38.2%" }, { label: "Cost-Income Ratio", value: "40.1%" }, { label: "ROE", value: "16.8%" }] },
  },
  nvda: {
    overview: { founded: "1993", headquarters: "Santa Clara, California", sector: "Technology", industry: "Semiconductors", description: "NVIDIA designs GPUs and system-on-chip units for gaming, professional visualization, data centers, and automotive markets. The company dominates the AI training and inference chip market.", ceo: "Jensen Huang", employees: "32,000" },
    stockInfo: { currentPrice: "$142.80", high52w: "$153.20", low52w: "$47.32", marketCap: "$3.51T", peRatio: "58.4", dividendYield: "0.02%" },
    quarterlyTimeline: [
      { quarter: "Q1 FY26", revenue: 26.0, netProfit: 14.9, eps: 3.71 },
      { quarter: "Q2 FY26", revenue: 30.0, netProfit: 16.6, eps: 4.15 },
      { quarter: "Q3 FY26", revenue: 35.1, netProfit: 19.3, eps: 4.82 },
      { quarter: "Q4 FY26", revenue: 39.3, netProfit: 22.1, eps: 5.82 },
    ],
    keyMetrics: { revenue: "$39.3B", grossMargin: "73.0%", netMargin: "56.2%", roe: "115.8%", roce: "88.4%", debtToEquity: "0.41", freeCashFlow: "$18.5B" },
    news: [
      { date: "Mar 15, 2026", headline: "Blackwell GPU exceeds production targets", summary: "Shipping to all major cloud providers ahead of schedule." },
      { date: "Mar 10, 2026", headline: "AI Enterprise software grows 150%", summary: "Software revenue reaches $2.1B annual run rate." },
      { date: "Feb 28, 2026", headline: "Rubin architecture announced at GTC", summary: "Next-gen GPU platform revealed for 2027 launch." },
      { date: "Feb 14, 2026", headline: "CUDA ecosystem hits 5M developers", summary: "Developer community surpasses major milestone." },
      { date: "Feb 1, 2026", headline: "NVIDIA enters quantum computing", summary: "Partnerships with three quantum startups announced." },
    ],
    history: { foundingStory: "Founded by Jensen Huang, Chris Malachowsky, and Curtis Priem in 1993, NVIDIA started making graphics chips for gaming PCs and evolved into the essential infrastructure company for the AI revolution.", milestones: ["1999 — Invented GPU", "2006 — CUDA platform", "2012 — Deep learning breakthrough", "2020 — Arm acquisition attempt", "2024 — World's most valuable company"], keyProducts: ["H100 GPU", "Blackwell B200", "CUDA", "DGX Systems", "Drive Orin", "Omniverse"], competitors: ["AMD", "Intel", "Google TPU", "Broadcom"] },
    financialReport: { reportText: "NVIDIA posted $39.3B revenue for Q4 FY2026, obliterating estimates. Data center revenue hit $35.1B, up 409% YoY on insatiable AI chip demand. Blackwell GPU ramp exceeded expectations with all major cloud providers deploying. Gross margins held at 73% despite supply chain challenges.", balanceSheet: [{ label: "Total Assets", value: "$96.2B" }, { label: "Total Liabilities", value: "$30.4B" }, { label: "Shareholders' Equity", value: "$65.8B" }, { label: "Cash & Equivalents", value: "$18.3B" }, { label: "Long-term Debt", value: "$8.5B" }], keyRatios: [{ label: "P/E Ratio", value: "58.4x" }, { label: "EPS", value: "$5.82" }, { label: "Debt/Equity", value: "0.41" }, { label: "EBITDA", value: "$24.8B" }, { label: "Current Ratio", value: "4.17" }, { label: "ROE", value: "115.8%" }] },
  },
  googl: {
    overview: { founded: "1998", headquarters: "Mountain View, California", sector: "Technology", industry: "Internet & Advertising", description: "Alphabet is the parent company of Google, the world's largest search engine. The company operates in advertising, cloud computing, hardware, and moonshot ventures through its Other Bets segment.", ceo: "Sundar Pichai", employees: "182,000" },
    stockInfo: { currentPrice: "$192.40", high52w: "$207.80", low52w: "$130.67", marketCap: "$2.38T", peRatio: "24.8", dividendYield: "0.43%" },
    quarterlyTimeline: [
      { quarter: "Q1 2025", revenue: 80.5, netProfit: 18.6, eps: 1.52 },
      { quarter: "Q2 2025", revenue: 84.7, netProfit: 21.3, eps: 1.72 },
      { quarter: "Q3 2025", revenue: 88.3, netProfit: 23.1, eps: 1.88 },
      { quarter: "Q4 2025", revenue: 96.3, netProfit: 26.5, eps: 2.14 },
    ],
    keyMetrics: { revenue: "$96.3B", grossMargin: "57.5%", netMargin: "27.5%", roe: "32.4%", roce: "28.6%", debtToEquity: "0.05", freeCashFlow: "$22.8B" },
    news: [
      { date: "Mar 11, 2026", headline: "AI Overviews serve 1B+ users monthly", summary: "AI-powered search results reach massive global scale." },
      { date: "Mar 5, 2026", headline: "Google Cloud hits $1B operating profit", summary: "Cloud segment achieves profitability milestone." },
      { date: "Feb 23, 2026", headline: "Gemini 2.5 Pro launches", summary: "Industry-leading multimodal reasoning benchmarks achieved." },
      { date: "Feb 9, 2026", headline: "YouTube Shorts monetization grows 35%", summary: "Expanded ad formats drive short-form video revenue." },
      { date: "Jan 27, 2026", headline: "Waymo expands to 10 new cities", summary: "Autonomous ride-hailing service scales across the US." },
    ],
    history: { foundingStory: "Founded by Larry Page and Sergey Brin while they were PhD students at Stanford University in 1998, Google started as a search engine and grew into one of the most influential technology companies in history.", milestones: ["2004 — IPO", "2006 — YouTube acquisition", "2008 — Android & Chrome", "2015 — Alphabet restructuring", "2023 — Gemini AI launch"], keyProducts: ["Google Search", "YouTube", "Android", "Chrome", "Google Cloud", "Pixel", "Waymo"], competitors: ["Microsoft", "Meta", "Amazon", "Apple"] },
    financialReport: { reportText: "Alphabet reported $96.3B revenue for Q4 2025, up 14% YoY. Google Cloud hit $11.4B with $1B operating profit — a first. YouTube ad revenue grew 16% to $9.2B. AI Overviews now serve 1B+ users monthly, driving engagement and ad relevance.", balanceSheet: [{ label: "Total Assets", value: "$432.2B" }, { label: "Total Liabilities", value: "$112.4B" }, { label: "Shareholders' Equity", value: "$319.8B" }, { label: "Cash & Equivalents", value: "$100.7B" }, { label: "Long-term Debt", value: "$13.2B" }], keyRatios: [{ label: "P/E Ratio", value: "24.8x" }, { label: "EPS", value: "$2.14" }, { label: "Debt/Equity", value: "0.05" }, { label: "EBITDA", value: "$38.6B" }, { label: "Current Ratio", value: "2.14" }, { label: "ROE", value: "32.4%" }] },
  },
};
