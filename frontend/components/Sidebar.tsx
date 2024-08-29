'use client'
import React from 'react';
import { PiStudentFill } from "react-icons/pi";
import { FaBookOpenReader, FaComments } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { MdLogout } from 'react-icons/md';
import { IoIosSettings } from 'react-icons/io';
import Image from 'next/image';
// import { UserButton } from '@clerk/nextjs';
// import { useUser } from '@clerk/clerk-react';

interface Link {
  id: string;
  icon: JSX.Element;
  title: string;
}

const Sidebar: React.FC = () => {
  //const { user } = useUser();

  return (
    <div className="bg-indigo-500 text-slate-50 min-w-[200px] sticky top-0 min-h-full select-none">
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
                  <a href="/dashboard" className="flex flex-row gap-2 items-center text-lg">
                    <MdSpaceDashboard/> Dashboard
                  </a>
                </li>
                <li>
                  <a href="/attendance" className="flex flex-row gap-2 items-center text-lg">
                    <PiStudentFill /> Attendance
                  </a>
                </li>
                <li>
                  <a href="/courses" className="flex flex-row gap-2 items-center text-lg">
                    <FaBookOpenReader/> Courses
                  </a>
                </li>
                <li>
                  <a href="/discussion" className="flex flex-row gap-2 items-center text-lg">
                    <FaComments /> Discussion
                  </a>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
