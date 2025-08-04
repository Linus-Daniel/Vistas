import Image from "next/image";

export const RecentOrders = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200 flex justify-between">
        <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
        <span className="text-sm font-medium text-primary-600 hover:text-primary-500 cursor-pointer">View all</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Order ID', 'Customer', 'Amount', 'Status'].map((col) => (
                <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              ['#ORD-8752', 'Sarah Johnson', 'avatar-1.jpg', '$349.99', 'Completed', 'green'],
              ['#ORD-8751', 'Michael Chen', 'avatar-4.jpg', '$129.00', 'Processing', 'yellow'],
              ['#ORD-8750', 'Emma Rodriguez', 'avatar-7.jpg', '$599.50', 'Shipped', 'blue'],
            ].map(([id, name, avatar, amount, status, color], idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Image width={500} height={500} className="h-8 w-8 rounded-full" src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${avatar}`} alt="avatar" />
                    <div className="ml-4 text-sm font-medium text-gray-900">{name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${color}-100 text-${color}-800`}>
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  