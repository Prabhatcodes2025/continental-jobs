import { Award, BadgeCheck } from "lucide-react";

export function TrustBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "text-xs" : "text-sm"}`} aria-label="Continental trust indicators">
      <span className="trust-badge">
        <Award className={compact ? "h-4 w-4" : "h-5 w-5"} />
        <span>
          <strong>43 YEARS</strong>
          <small>Global Recruitment</small>
        </span>
      </span>
      <span className="trust-badge">
        <BadgeCheck className={compact ? "h-4 w-4" : "h-5 w-5"} />
        <span>
          <strong>ISO 9001</strong>
          <small>Certified</small>
        </span>
      </span>
    </div>
  );
}
