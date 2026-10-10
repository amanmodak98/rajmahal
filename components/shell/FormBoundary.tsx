"use client";

import { useState } from "react";

/**
 * Adds default onSubmit (prevent default + a brief submitted state)
 * to any form children, so plain forms don't reload the page.
 */
export function FormBoundary({ children, className }: { children: React.ReactNode; className?: string }) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
      {submitted && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
          ✓ Received. The concierge will reply within four hours.
        </p>
      )}
    </form>
  );
}
