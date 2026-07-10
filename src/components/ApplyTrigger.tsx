"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useApplyModal } from "@/components/ExperienceLayer";

export function ApplyTrigger({
  children = "APPLY FOR A JOB",
  className = "button-primary",
  showArrow = true
}: {
  children?: ReactNode;
  className?: string;
  showArrow?: boolean;
}) {
  const { openApply } = useApplyModal();

  return (
    <button type="button" onClick={openApply} className={className} data-magnetic>
      {children}
      {showArrow ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
    </button>
  );
}
