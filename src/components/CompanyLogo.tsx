import { useState } from "react";

interface CompanyLogoProps {
  domain: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { container: "w-11 h-11", img: "w-8 h-8", text: "text-base", rounded: "rounded-xl" },
  md: { container: "w-14 h-14", img: "w-10 h-10", text: "text-xl", rounded: "rounded-2xl" },
  lg: { container: "w-16 h-16", img: "w-11 h-11", text: "text-2xl", rounded: "rounded-2xl" },
};

const CompanyLogo = ({ domain, name, size = "md" }: CompanyLogoProps) => {
  const [failed, setFailed] = useState(false);
  const s = sizeMap[size];
  const logoUrl = `https://img.logo.dev/${domain}?token=pk_SRvYaOnCT4S-xIHNdqkopg`;

  return (
    <div className={`${s.container} ${s.rounded} bg-secondary flex items-center justify-center border border-border overflow-hidden shrink-0`}>
      {!failed ? (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className={`${s.img} rounded-lg object-contain bg-white p-1`}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={`${s.text} font-bold font-['Space_Grotesk'] text-foreground`}>
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
};

export default CompanyLogo;
