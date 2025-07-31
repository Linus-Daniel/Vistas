import React from "react";

interface ChartCardProps {
  title: string;
  filters: string[];
  active: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  filters,
  active,
}) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          {filters.map((label) => (
            <button
              key={label}
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                active === label
                  ? "bg-primary-100 text-primary-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 bg-gray-100 rounded" /> {/* Placeholder for chart */}
    </div>
  </div>
);
