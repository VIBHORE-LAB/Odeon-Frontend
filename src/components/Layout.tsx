import type { ReactNode } from "react";
import { Sidebar } from "./SideBar";

export const Layout = ({ children }: { children: ReactNode }) => {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  );
};
