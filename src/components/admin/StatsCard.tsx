import React, { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  color: string; // e.g., "blue", "green", etc.
  title: string;
  value: string | number;
  linkText: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  color,
  title,
  value,
  linkText,
}) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div
          className={`flex-shrink-0 rounded-md p-3 text-xl bg-${color}-100 text-${color}-600`}
        >
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="text-lg font-medium text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3">
      <div className="text-sm font-medium text-primary-600 hover:text-primary-500 cursor-pointer">
        {linkText}
      </div>
    </div>
  </div>
);
