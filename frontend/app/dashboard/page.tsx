import React from 'react'
import Sidebar from '@/components/Sidebar'
import AssignmentCard from '@/components/AssignmentCard'
import CalendarCard from '@/components/Calendar'
import { IoIosInformationCircle } from "react-icons/io";
import GradeTracker from '@/components/GradeTracker';
import Leetcode from '@/components/Leetcode';
import Link from 'next/link';

const dashboard = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full min-h-full bg-white py-8 pl-4 pr-2">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mt-2">Welcome back, Mansi!</h1>
          <Link href="/">
            <img src="https://www.svgrepo.com/show/382099/female-avatar-girl-face-woman-user-2.svg" alt="logo" className="w-[140px] h-[45px] hover:scale-150" />
          </Link>
        </div>
        <div className="flex flex-row justify-between mt-8 gap-4">
          <div className="flex flex-col min-h-full">
            <AssignmentCard />
            <div className="flex flex-row gap-4">
              <GradeTracker />
              <Leetcode/>
            </div>
          </div>
          <div className="flex flex-col min-h-full">
            <div className="bg-yellow-300/30 p-2 flex flex-row gap-2 items-center">
              <IoIosInformationCircle className="text-red-800"/> 
              <h2 className="text-sm font-medium text-red-800">Midsems starting from 23rd September, 2024</h2>
            </div>
            <CalendarCard />
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default dashboard