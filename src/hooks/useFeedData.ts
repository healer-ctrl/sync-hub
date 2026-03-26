import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CompanyData, CompanyCategory } from "@/data/mockFinancials";
import { companies as mockCompanies } from "@/data/mockFinancials";

export interface FeedCompany extends CompanyData {
  reportSummaryId?: string;
  reportId?: string;
  fullReportText?: string;
  beatOrMiss?: string;
  eps?: string;
  peRatio?: string;
  debtEquity?: string;
  ebitda?: string;
  currentRatio?: string;
  roe?: string;
  sector?: string;
}

function mapDbToCompany(item: any): FeedCompany {
  const company = item.companies;
  const growthStr = item.growth || "+0%";
  const growthNum = parseFloat(growthStr.replace(/[^-\d.]/g, "")) || 0;

  const categories: CompanyCategory[] = [];
  if (company.exchange === "NSE" || company.exchange === "BSE") categories.push("india");
  if (company.exchange === "NASDAQ" || company.exchange === "NYSE") categories.push("us");
  const sectorLower = (company.sector || item.sector || "").toLowerCase();
  if (sectorLower.includes("tech") || sectorLower.includes("software") || sectorLower.includes("semiconductor") || sectorLower.includes("it ")) categories.push("tech");
  if (sectorLower.includes("bank") || sectorLower.includes("financial")) categories.push("banking");

  return {
    id: company.id,
    name: company.name,
    ticker: company.ticker,
    headline: item.headline || "",
    summary: item.summary || "",
    revenue: item.revenue || "",
    profit: item.profit || "",
    growth: item.growth || "",
    quarter: item.quarter || "",
    changePercent: growthNum,
    accentColor: "174 100% 50%",
    categories,
    domain: company.domain || "",
    reportSummaryId: item.id,
    reportId: item.report_id,
    fullReportText: item.full_report_text,
    beatOrMiss: item.beat_or_miss,
    eps: item.eps,
    peRatio: item.pe_ratio,
    debtEquity: item.debt_equity,
    ebitda: item.ebitda,
    currentRatio: item.current_ratio,
    roe: item.roe,
    sector: item.sector || company.sector,
  };
}

export function useFeedData(useMockData = false) {
  return useQuery({
    queryKey: ["feed", useMockData],
    queryFn: async (): Promise<FeedCompany[]> => {
      if (useMockData) return mockCompanies as FeedCompany[];
      const { data, error } = await supabase
        .from("report_summaries")
        .select(`
          *,
          companies (
            id,
            name,
            ticker,
            sector,
            exchange,
            domain
          )
        `)
        .order("processed_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Feed query error:", error);
        throw error;
      }

      if (!data || data.length === 0) {
        return [];
      }

      // Deduplicate: latest summary per company
      const seen = new Set<string>();
      const feed = data.filter((item) => {
        if (seen.has(item.company_id)) return false;
        seen.add(item.company_id);
        return true;
      });

      return feed.map(mapDbToCompany);
    },
    staleTime: 5 * 60 * 1000,
  });
}
