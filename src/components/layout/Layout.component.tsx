import type { ReactNode } from "react";
import Link from "next/link";

interface LayoutInterface {
  children: ReactNode;
}

const Layout = ({ children }: LayoutInterface) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-800 px-6">
      <header className="py-6 text-2xl font-semibold text-slate-200">
        <div className="container mx-auto">
          quiz<span className="text-rose-500">app_</span>
        </div>
      </header>
      <main className="grow py-6 text-slate-100">
        <div className="container mx-auto">{children}</div>
      </main>
      <footer className="py-6 text-slate-300">
        <div className="container mx-auto text-sm">
          API provided by&nbsp;
          <Link
            href="https://the-trivia-api.com/"
            className="font-semibold text-rose-500 hover:text-rose-400"
          >
            Trivia
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
