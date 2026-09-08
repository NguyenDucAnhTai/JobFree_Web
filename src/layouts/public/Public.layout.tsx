import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface-cream font-sans text-ink">
      <Header />
      <main className="w-full flex-1 overflow-hidden">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
