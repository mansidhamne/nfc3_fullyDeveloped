'use client'
import React, { useState } from 'react';
import { PiStudentFill } from "react-icons/pi";
import { FaBookOpenReader, FaComments } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { MdLogout } from 'react-icons/md';
import { IoIosSettings } from 'react-icons/io';
import Image from 'next/image';
// import { UserButton } from '@clerk/nextjs';
// import { useUser } from '@clerk/clerk-react';
import { HiMenu } from 'react-icons/hi';
interface Link {
  id: string;
  icon: JSX.Element;
  title: string;
}

const Sidebar: React.FC = () => {
  //const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (<>
    <button
    className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-indigo-600 text-white rounded-md"
    onClick={toggleSidebar}
  >
    <HiMenu size={24} />
  </button>

  <div className={`
    bg-indigo-500 text-slate-50 min-w-[200px] fixed top-0 left-0 min-h-full
    transform transition-transform duration-300 ease-in-out z-10
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:static
  `}>
      <div className="flex flex-col h-screen justify-between pt-7">
        <div className="flex flex-col top-0">
          <div className="flex flex-row justify-center pl-4">
            <a href="/home" className="flex flex-row justify-center">
              <img src="/logo.png" alt="logo" className="w-[40px] h-[30px]" />
              <h4 className="pr-5 pl-2 pb-4 font-semibold text-[23px] text-center">EduVerse</h4>
            </a>
          </div>
          <div>
            <ul className="px-5 mt-5 list-none flex flex-col gap-7">
                <li>
                  <a href="/admin-dashboard" className="flex flex-row gap-2 items-center text-lg">
                    <MdSpaceDashboard/> Dashboard
                  </a>
                </li>
                <li>
                  <a href="/lectures" className="flex flex-row gap-2 items-center text-lg">
                    <PiStudentFill /> Lectures
                  </a>
                </li>
                <li>
                  <a href="/assignments" className="flex flex-row gap-2 items-center text-lg">
                    <FaBookOpenReader/> Assignments
                  </a>
                </li>
                <li>
                  <a href="/reports" className="flex flex-row gap-2 items-center text-lg">
                    <FaComments /> Attendance Reports
                  </a>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
