import { useState, useEffect } from "react";
import type { DeepDiveData } from "@/data/companyDeepDive";

const GEMINI_API_KEY = "AIzaSyDp1tGOccCkQcLE3pVrUYOOToU1Nvb0WS4";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const CACHE_KEY_PREFIX = "gemini_deep_dive_";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CachedData {
  data: DeepDiveData;
  timestamp: number;
}

function getCached(companyId: string): DeepDiveData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + companyId);
    if (!raw) return null;
    const cached: CachedData = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY_PREFIX + companyId);
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function setCache(companyId: string, data: DeepDiveData) {
  try {
    const cached: CachedData = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY_PREFIX + companyId, JSON.stringify(cached));
  } catch {
    // localStorage full or unavailable
  }
}

function mapGeminiToDeepDive(raw: any): DeepDiveData {
  return {
    overview: {
      founded: raw.founded || "N/A",
      headquarters: raw.headquarters || "N/A",
      sector: raw.sector || "N/A",
      industry: raw.industry || "N/A",
      description: raw.description || "No description available.",
      ceo: raw.ceo || "N/A",
      employees: raw.employees?.toString() || "N/A",
    },
    stockInfo: {
      currentPrice: raw.stock_price || "N/A",
      high52w: raw.week_52_high || "N/A",
      low52w: raw.week_52_low || "N/A",
      marketCap: raw.market_cap || "N/A",
      peRatio: raw.pe_ratio?.toString() || "N/A",
      dividendYield: raw.dividend_yield?.toString() || "N/A",
    },
    quarterlyTimeline: [
      { quarter: "Q1", revenue: parseFloat(raw.revenue_q1?.replace(/[^0-9.]/g, "")) || 0, netProfit: parseFloat(raw.profit_q1?.replace(/[^0-9.]/g, "")) || 0, eps: parseFloat(raw.eps?.toString().replace(/[^0-9.]/g, "")) || 0 },
      { quarter: "Q2", revenue: parseFloat(raw.revenue_q2?.replace(/[^0-9.]/g, "")) || 0, netProfit: parseFloat(raw.profit_q2?.replace(/[^0-9.]/g, "")) || 0, eps: parseFloat(raw.eps?.toString().replace(/[^0-9.]/g, "")) || 0 },
      { quarter: "Q3", revenue: parseFloat(raw.revenue_q3?.replace(/[^0-9.]/g, "")) || 0, netProfit: parseFloat(raw.profit_q3?.replace(/[^0-9.]/g, "")) || 0, eps: parseFloat(raw.eps?.toString().replace(/[^0-9.]/g, "")) || 0 },
      { quarter: "Q4", revenue: parseFloat(raw.revenue_q4?.replace(/[^0-9.]/g, "")) || 0, netProfit: parseFloat(raw.profit_q4?.replace(/[^0-9.]/g, "")) || 0, eps: parseFloat(raw.eps?.toString().replace(/[^0-9.]/g, "")) || 0 },
    ],
    keyMetrics: {
      revenue: raw.revenue_ttm || "N/A",
      grossMargin: raw.gross_margin?.toString() || "N/A",
      netMargin: raw.net_margin?.toString() || "N/A",
      roe: raw.roe?.toString() || "N/A",
      roce: raw.roce?.toString() || "N/A",
      debtToEquity: raw.debt_equity?.toString() || "N/A",
      freeCashFlow: raw.free_cash_flow || "N/A",
    },
    news: [
      { date: "Latest", headline: raw.news_1 || "No news available", summary: "" },
      { date: "Recent", headline: raw.news_2 || "No news available", summary: "" },
      { date: "Recent", headline: raw.news_3 || "No news available", summary: "" },
      { date: "Recent", headline: raw.news_4 || "No news available", summary: "" },
      { date: "Recent", headline: raw.news_5 || "No news available", summary: "" },
    ].filter(n => n.headline !== "No news available"),
    history: {
      foundingStory: raw.description || "No history available.",
      milestones: [raw.milestone_1, raw.milestone_2, raw.milestone_3].filter(Boolean),
      keyProducts: typeof raw.products === "string"
        ? raw.products.split(",").map((p: string) => p.trim())
        : Array.isArray(raw.products) ? raw.products : [],
      competitors: typeof raw.competitors === "string"
        ? raw.competitors.split(",").map((c: string) => c.trim())
        : Array.isArray(raw.competitors) ? raw.competitors : [],
    },
    financialReport: {
      reportText: raw.description || "",
      balanceSheet: [],
      keyRatios: [
        { label: "P/E Ratio", value: raw.pe_ratio?.toString() || "N/A" },
        { label: "EPS", value: raw.eps?.toString() || "N/A" },
        { label: "Debt/Equity", value: raw.debt_equity?.toString() || "N/A" },
        { label: "EBITDA", value: raw.ebitda || "N/A" },
        { label: "Current Ratio", value: raw.current_ratio?.toString() || "N/A" },
        { label: "ROE", value: raw.roe?.toString() || "N/A" },
      ],
    },
  };
}

export function useGeminiDeepDive(companyId: string, ticker: string, companyName: string) {
  const [data, setData] = useState<DeepDiveData | null>(() => getCached(companyId));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCached(companyId);
    if (cached) {
      setData(cached);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchFromGemini() {
      setIsLoading(true);
      setError(null);

      const prompt = `You are a financial data assistant. Using your knowledge and web search, fetch current real data for the company: ${companyName} with ticker ${ticker}.

Return ONLY a raw JSON object, no markdown, no backticks, just JSON:
{
  "name": "full official company name",
  "ticker": "stock ticker symbol",
  "exchange": "NSE or BSE or NYSE etc",
  "sector": "business sector",
  "industry": "specific industry",
  "founded": "founding year",
  "headquarters": "city and country",
  "ceo": "current CEO full name",
  "employees": "approximate employee count",
  "description": "2-3 sentence business description",
  "website": "official website URL",
  "stock_price": "latest stock price with currency",
  "market_cap": "market capitalization formatted",
  "week_52_high": "52 week high price",
  "week_52_low": "52 week low price",
  "pe_ratio": "price to earnings ratio",
  "dividend_yield": "dividend yield percentage",
  "revenue_ttm": "trailing 12 month revenue",
  "profit_ttm": "trailing 12 month net profit",
  "eps": "earnings per share",
  "roe": "return on equity",
  "roce": "return on capital employed",
  "debt_equity": "debt to equity ratio",
  "free_cash_flow": "free cash flow formatted",
  "gross_margin": "gross margin percentage",
  "net_margin": "net margin percentage",
  "ebitda": "EBITDA formatted",
  "current_ratio": "current ratio",
  "revenue_q1": "revenue 4 quarters ago",
  "revenue_q2": "revenue 3 quarters ago",
  "revenue_q3": "revenue 2 quarters ago",
  "revenue_q4": "most recent quarter revenue",
  "profit_q1": "profit 4 quarters ago",
  "profit_q2": "profit 3 quarters ago",
  "profit_q3": "profit 2 quarters ago",
  "profit_q4": "most recent quarter profit",
  "milestone_1": "major company milestone with year",
  "milestone_2": "major company milestone with year",
  "milestone_3": "major company milestone with year",
  "products": "top 3-5 key products or services comma separated",
  "competitors": "top 3 competitor company names comma separated",
  "news_1": "latest company news headline",
  "news_2": "second latest news headline",
  "news_3": "third latest news headline",
  "news_4": "fourth latest news headline",
  "news_5": "fifth latest news headline"
}`;

      try {
        const response = await fetch(GEMINI_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            tools: [{ google_search: {} }],
          }),
        });

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status}`);
        }

        const result = await response.json();
        const textContent = result.candidates?.[0]?.content?.parts
          ?.filter((p: any) => p.text)
          ?.map((p: any) => p.text)
          ?.join("") || "";

        // Clean up potential markdown formatting
        const cleaned = textContent
          .replace(/```json\s*/g, "")
          .replace(/```\s*/g, "")
          .trim();

        const parsed = JSON.parse(cleaned);
        const deepDive = mapGeminiToDeepDive(parsed);

        if (!cancelled) {
          setCache(companyId, deepDive);
          setData(deepDive);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Gemini fetch error:", err);
          setError("Could not load live data. Showing available information only.");
          setIsLoading(false);
        }
      }
    }

    fetchFromGemini();

    return () => {
      cancelled = true;
    };
  }, [companyId, ticker, companyName]);

  return { data, isLoading, error };
}
