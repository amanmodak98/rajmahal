"use client";

import { Component, ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    if (typeof console !== "undefined") {
      console.warn("[ErrorBoundary]", error.message);
    }
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="min-h-[40vh] flex items-center justify-center px-6 py-16">
            <div className="max-w-md text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-4">
                Briefly unreachable
              </p>
              <p className="font-display-serif italic text-ink-muted text-lg leading-relaxed">
                Something just blinked. The page will recover on a refresh.
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
