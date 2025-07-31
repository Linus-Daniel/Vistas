import React from 'react';
import {
  FaCartShopping,
  FaDollarSign,
  FaUserGraduate,
  FaFileLines,
} from 'react-icons/fa6';
import { StatCard } from '@/components/admin/StatsCard';
import { ChartCard } from '@/components/ChatCard';
import { RecentOrders } from '@/components/admin/RecentOrders';
import { RecentApplications } from '@/components/admin/RecentApplications';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<FaCartShopping />} color="primary" title="Total Orders" value="1,482" linkText="View all" />
        <StatCard icon={<FaDollarSign />} color="green" title="Sales This Month" value="$24,583" linkText="View report" />
        <StatCard icon={<FaUserGraduate />} color="purple" title="Active Students" value="238" linkText="View all" />
        <StatCard icon={<FaFileLines />} color="yellow" title="New Applications" value="42" linkText="Review" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Monthly Sales" active="Monthly" filters={['Weekly', 'Monthly', 'Yearly']} />
        <ChartCard title="Student Enrollment" active="Semester" filters={['Quarter', 'Semester', 'Annual']} />
      </div>

      {/* Recent Orders & Applications */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RecentOrders />
        <RecentApplications />
      </div>
    </div>
  );
};






export default Dashboard;