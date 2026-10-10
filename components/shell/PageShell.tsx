// PageShell wraps every route in an ErrorBoundary so any client-side runtime
// glitch degrades gracefully instead of throwing away the page.
import { ErrorBoundary } from "./ErrorBoundary";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { Cursor } from "./Cursor";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ScrollProgress />
      <Nav />
      <Cursor />
      {children}
      <Footer />
    </ErrorBoundary>
  );
}
