-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ticker TEXT NOT NULL,
  sector TEXT,
  exchange TEXT,
  domain TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create report_summaries table
CREATE TABLE public.report_summaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  report_id TEXT,
  headline TEXT,
  summary TEXT,
  revenue TEXT,
  profit TEXT,
  growth TEXT,
  quarter TEXT,
  beat_or_miss TEXT,
  eps TEXT,
  pe_ratio TEXT,
  debt_equity TEXT,
  ebitda TEXT,
  current_ratio TEXT,
  roe TEXT,
  sector TEXT,
  full_report_text TEXT,
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create app_config table
CREATE TABLE public.app_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT 'never',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Companies: publicly readable
CREATE POLICY "Companies are viewable by everyone" ON public.companies FOR SELECT USING (true);

-- Report summaries: publicly readable
CREATE POLICY "Report summaries are viewable by everyone" ON public.report_summaries FOR SELECT USING (true);

-- App config: publicly readable
CREATE POLICY "App config is viewable by everyone" ON public.app_config FOR SELECT USING (true);

-- Insert initial NSE config
INSERT INTO public.app_config (key, value) VALUES ('nse_last_polled', 'never');

-- Create index for faster feed queries
CREATE INDEX idx_report_summaries_processed_at ON public.report_summaries(processed_at DESC);
CREATE INDEX idx_report_summaries_company_id ON public.report_summaries(company_id);