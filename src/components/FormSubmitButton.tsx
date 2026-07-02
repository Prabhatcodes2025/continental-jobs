"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function FormSubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button className="button-primary w-fit disabled:cursor-wait disabled:opacity-70" type="submit" disabled={pending} data-magnetic>
      {pending ? "Submitting..." : children}
    </button>
  );
}
