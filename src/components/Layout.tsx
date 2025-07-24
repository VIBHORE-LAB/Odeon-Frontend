import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  );
};
