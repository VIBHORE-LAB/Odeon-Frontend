import React from "react";

interface LoaderProps {
  loading: boolean;
  message?: string;
  children?: React.ReactNode;
}

export const Loader: React.FC<LoaderProps> = ({
  loading,
  message = "Loading...",
  children,
}) => {
  if (!loading) return <>{children}</>;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center text-green-400 rounded-lg shadow-lg p-6 animate-fade-in">
        <div className="w-12 h-12 border-4 border-t-green-500 border-gray-700 rounded-full animate-spin mb-3"></div>
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};
