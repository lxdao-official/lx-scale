import React from 'react';

interface ProgressBarProps {
  completionPercentage: number;
}

export function ProgressBar({ completionPercentage }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
      <div
        className="h-full bg-green-500 transition-all duration-300"
        style={{ width: `${completionPercentage}%` }}
      ></div>
    </div>
  );
}
