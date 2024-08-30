import CalendarAdmin from '@/components/CalendarAdmin'
import LectureAttendance from '@/components/LectureAttendance'
import CombinedCalendarScheduler from '@/components/LectureScheduler'
import CombinedLectureSchedulerCalendar from '@/components/LectureScheduler'
import LectureScheduler from '@/components/LectureScheduler'
import Sidebar from '@/components/SidebarAdmin'
import React from 'react'

const Page = () => {
  return (
    <div className='flex flex-row w-full'>
      
        <Sidebar/>
        
        <div className="flex flex-col min-w-full min-h-full bg-white py-8 pl-4 pr-2" >
            <div className="w-full">
            <h1 className="text-3xl text-black font-bold ">Lecture Attendance Manager</h1>
            <h5> className='text-xl text-indigo-500 font-medium mt-1'Start Attendance, View Attendees Real Time and Generate Report!</h5>
             <div className='max-w-1/2' style={{maxWidth:'80vw'}}>
             <LectureAttendance/>
             </div>
            </div>
        </div>
    </div>
  )
}

export default Page