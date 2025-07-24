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
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full bg-black/60 text-green-400 rounded-lg shadow-lg p-6 animate-fade-in">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-t-green-500 border-gray-700 rounded-full animate-spin mb-3"></div>
      {/* Message */}
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
};
