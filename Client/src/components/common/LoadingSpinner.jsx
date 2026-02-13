import React from "react";

const LoadingSpinner = ({
  size = "md",
  color = "primary",
  text = "",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  const colorClasses = {
    primary: "border-blue-500 border-t-transparent",
    secondary: "border-gray-500 border-t-transparent",
    success: "border-green-500 border-t-transparent",
    danger: "border-red-500 border-t-transparent",
    warning: "border-yellow-500 border-t-transparent",
    info: "border-blue-400 border-t-transparent",
    light: "border-gray-300 border-t-transparent",
    dark: "border-gray-700 border-t-transparent",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin rounded-full`}
      />
      {text && <p className={`mt-3 text-${color} font-medium`}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <LoadingSpinner size="xl" color="primary" text="Loading..." />
  </div>
);

export const ButtonLoader = ({ color = "white" }) => (
  <div className="flex items-center justify-center">
    <div
      className={`h-4 w-4 border-2 border-${color} border-t-transparent animate-spin rounded-full`}
    />
    <span className="ml-2">Processing...</span>
  </div>
);

export const TableLoader = ({ columns = 5 }) => (
  <div className="animate-pulse">
    <div className="flex space-x-4 mb-4">
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"
        ></div>
      ))}
    </div>
    {Array.from({ length: 5 }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4 mb-3">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div
            key={colIndex}
            className="h-3 bg-gray-100 dark:bg-gray-800 rounded flex-1"
          ></div>
        ))}
      </div>
    ))}
  </div>
);

export const CardLoader = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
  </div>
);

export default LoadingSpinner;
