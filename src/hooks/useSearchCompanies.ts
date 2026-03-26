import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CompanyData } from "@/data/mockFinancials";
import { companies as mockCompanies } from "@/data/mockFinancials";

export function useSearchCompanies(query: string) {
  return useQuery({
    queryKey: ["search-companies", query],
    queryFn: async (): Promise<CompanyData[]> => {
      if (!query.trim()) return [];

      // Try DB first
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .or(`name.ilike.%${query}%,ticker.ilike.%${query}%`);

      if (error || !data || data.length === 0) {
        // Fallback to mock data search
        const q = query.toLowerCase();
        return mockCompanies.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.ticker.toLowerCase().includes(q)
        );
      }

      // For DB results, we need matching summaries too
      const companyIds = data.map((c) => c.id);
      const { data: summaries } = await supabase
        .from("report_summaries")
        .select("*")
        .in("company_id", companyIds)
        .order("processed_at", { ascending: false });

      return data.map((company) => {
        const summary = summaries?.find((s) => s.company_id === company.id);
        const growthStr = summary?.growth || "+0%";
        const growthNum = parseFloat(growthStr.replace(/[^-\d.]/g, "")) || 0;

        return {
          id: company.id,
          name: company.name,
          ticker: company.ticker,
          headline: summary?.headline || "",
          summary: summary?.summary || "",
          revenue: summary?.revenue || "",
          profit: summary?.profit || "",
          growth: summary?.growth || "",
          quarter: "",
          changePercent: growthNum,
          accentColor: "174 100% 50%",
          categories: [],
          domain: company.domain || "",
        } as CompanyData;
      });
    },
    enabled: query.trim().length > 0,
    staleTime: 30 * 1000,
  });
}

export function useAllCompanies() {
  return useQuery({
    queryKey: ["all-companies"],
    queryFn: async (): Promise<CompanyData[]> => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("name");

      if (error || !data || data.length === 0) {
        return mockCompanies;
      }

      // Get latest summaries
      const companyIds = data.map((c) => c.id);
      const { data: summaries } = await supabase
        .from("report_summaries")
        .select("*")
        .in("company_id", companyIds)
        .order("processed_at", { ascending: false });

      return data.map((company) => {
        const summary = summaries?.find((s) => s.company_id === company.id);
        const growthStr = summary?.growth || "+0%";
        const growthNum = parseFloat(growthStr.replace(/[^-\d.]/g, "")) || 0;

        return {
          id: company.id,
          name: company.name,
          ticker: company.ticker,
          headline: summary?.headline || "",
          summary: summary?.summary || "",
          revenue: summary?.revenue || "",
          profit: summary?.profit || "",
          growth: summary?.growth || "",
          quarter: "",
          changePercent: growthNum,
          accentColor: "174 100% 50%",
          categories: [],
          domain: company.domain || "",
        } as CompanyData;
      });
    },
    staleTime: 5 * 60 * 1000,
  });
}
