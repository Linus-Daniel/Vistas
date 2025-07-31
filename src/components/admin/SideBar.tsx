"use client";
import React from 'react';
import Link from 'next/link';
import {
FaHouse, FaBox, FaCartShopping, FaUsers, FaFileLines,
FaUserGraduate, FaChartLine, FaChalkboardUser, FaUserGroup,
FaBlog, FaPenToSquare, FaUserShield, FaChartPie, FaGear, FaXmark,
FaMicrochip, FaBoxOpen, FaTruck, FaListOl
} from 'react-icons/fa6';
import { usePathname } from 'next/navigation';

const navSections = [
{
label: 'Dashboard',
items: [
{ name: 'Dashboard', icon: <FaHouse />, href: '/' },
],
},
{
label: 'E-Commerce',
items: [
{ name: 'Products', icon: <FaBox />, href: '/products' },
{ name: 'Orders', icon: <FaCartShopping />, href: '/orders' },
{ name: 'Customers', icon: <FaUsers />, href: '/customers' },
{ name: 'Components', icon: <FaMicrochip />, href: '/components' },
{ name: 'Kits/Bundles', icon: <FaBoxOpen />, href: '/kits' },
{ name: 'Suppliers', icon: <FaTruck />, href: '/suppliers' },
{ name: 'BOM Manager', icon: <FaListOl />, href: '/bom' },
],
},
{
label: 'Programs',
items: [
{ name: 'Intern Applications', icon: <FaFileLines />, href: '/intern-applications' },
{ name: 'IT Students', icon: <FaUserGraduate />, href: '/it-students' },
{ name: 'Progress Tracking', icon: <FaChartLine />, href: '/progress-tracking' },
],
},
{
label: 'Courses',
items: [
{ name: 'Course Management', icon: <FaChalkboardUser />, href: '/courses' },
{ name: 'Enrolled Students', icon: <FaUserGroup />, href: '/students' },
],
},
{
label: 'Attendance',
items: [
{ name: 'Sessions', icon: <FaChartLine />, href: '/attendance/sessions' },
{ name: 'Live QR View', icon: <FaChalkboardUser />, href: '/attendance/qr-live' },
{ name: 'Scan Logs', icon: <FaFileLines />, href: '/attendance/logs' },
{ name: 'Face Flags', icon: <FaUserShield />, href: '/attendance/flags' },
],
},
{
label: 'Blog',
items: [
{ name: 'All Blogs', icon: <FaBlog />, href: '/blogs' },
{ name: 'Create New Post', icon: <FaPenToSquare />, href: '/blogs/create' },
],
},
{
label: 'Administration',
items: [
{ name: 'Users & Roles', icon: <FaUserShield />, href: '/users' },
{ name: 'Reports & Analytics', icon: <FaChartPie />, href: '/reports' },
{ name: 'Settings', icon: <FaGear />, href: '/settings' },
],
},
];

function SideBar({ sidebarOpen, onClose }: { sidebarOpen: boolean; onClose: () => void }) {
const pathname = usePathname();
const [openSection, setOpenSection] = React.useState('Dashboard');

return (
<aside
className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
> <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200"> <div className="text-primary-500 text-2xl font-bold">Nascomsoft</div> <button
       onClick={onClose}
       className="p-2 rounded-md lg:hidden text-gray-500 hover:bg-gray-100"
     > <FaXmark /> </button> </div>

  <div className="overflow-y-auto h-full pb-16">
    <nav className="mt-4 px-2">
      <div className="space-y-1">
        {navSections.map((section, idx) => {
          const isOpen = openSection === section.label;
          return (
            <div key={idx} className="pt-2">
              <button
                onClick={() => setOpenSection(isOpen ? '' : section.label)}
                className="w-full flex justify-between items-center px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-100 rounded-md"
              >
                {section.label}
                <span className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                  ▶
                </span>
              </button>

              {isOpen && (
                <div className="mt-1 space-y-1">
                  {section.items.map((item, itemIdx) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        href={`/admin${item.href}`}
                        key={itemIdx}
                        className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="w-5 h-5 mr-3 text-gray-400">{item.icon}</span>
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  </div>
</aside>


);
}

export default SideBar;
