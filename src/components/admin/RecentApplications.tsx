import Image from "next/image";

export  const RecentApplications = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200 flex justify-between">
        <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
        <span className="text-sm font-medium text-primary-600 hover:text-primary-500 cursor-pointer">View all</span>
      </div>
      <ul className="divide-y divide-gray-200">
        {[
          ['David Wilson', 'Web Development Internship', 'avatar-2.jpg', 'Pending', 'yellow'],
          ['Jennifer Lee', 'UI/UX Design Course', 'avatar-5.jpg', 'Approved', 'green'],
          ['Robert Smith', 'Data Science Training', 'avatar-9.jpg', 'Rejected', 'red'],
          ['Sophia Garcia', 'Mobile App Development', 'avatar-6.jpg', 'Pending', 'yellow'],
        ].map(([name, desc, avatar, status, color], idx) => (
          <li key={idx} className="px-5 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image className="h-10 w-10 rounded-full" width={500} height={500} src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${avatar}`} alt="avatar" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full bg-${color}-100 text-${color}-800`}>{status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );