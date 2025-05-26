import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Newspaper,
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapse, setIsCollapse] = useState(false);

  const router = useRouter();
  const { pathname } = router;

  const dashboardItem = [
    {
      label: 'Dashboard',
      Icon: LayoutDashboard,
      href: '/dashboard',
    },
  ];

  const blogManagementItem = [
    {
      label: 'Create Article',
      Icon: Newspaper,
      href: '/dashboard/article',
    },
  ];

  return (
    <div
      className={`flex flex-col justify-between h-screen bg-[#F9F9F9] sticky top-0 p-5 transition-all duration-500 desktop:hidden tablet:hidden phone:hidden ${
        isCollapse ? 'w-20' : 'w-[288px]'
      }`}
    >
      <button
        className="flex justify-center items-center bg-[#DBDBDB] rounded-full w-7 h-7 absolute right-[-10px] top-3 text-sm cursor-pointer"
        onClick={() => {
          setIsCollapse((prev) => !prev);
        }}
      >
        {isCollapse ? <ChevronLeft /> : <ChevronRight />}
      </button>

      <div>
        {!isCollapse && <p className="font-semibold text-sm mb-3">Dashboard</p>}

        {dashboardItem.map((value, index) => (
          <Link
            key={index}
            href={value.href}
            className={`flex flex-row items-center gap-3 p-3 rounded-md hover:bg-[#59A1A51A] hover:text-[#59A1A5] ${
              pathname === value.href ? 'bg-[#59A1A51A] text-[#59A1A5]' : ''
            }`}
          >
            {<value.Icon size={20} />}
            {!isCollapse && <p>{value.label}</p>}
          </Link>
        ))}

        {!isCollapse && (
          <p className="font-semibold text-sm my-3">Article Management</p>
        )}

        {blogManagementItem.map((value, index) => (
          <Link
            key={index}
            href={value.href}
            className={`flex flex-row items-center p-3 gap-3 rounded-md hover:bg-[#59A1A51A] hover:text-[#59A1A5] ${
              pathname === value.href ? 'bg-[#59A1A51A] text-[#59A1A5]' : ''
            }`}
          >
            {<value.Icon size={20} />}
            {!isCollapse && <p>{value.label}</p>}
          </Link>
        ))}
      </div>

      {!isCollapse && (
        <div className="text-center">
          <p className="text-xs text-[#787878]">
            Copyright © {new Date().getFullYear()}
            <span className="font-bold"> Travling</span>
          </p>
          <p className="text-xs text-[#787878]">All Rights Reserved</p>
          <p className="text-xs text-[#787878]">App version 1.0.0</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
