import AssignmentSubmissionChecker from '@/components/AssignmentSubmissionChecker'
import CalendarAdmin from '@/components/CalendarAdmin'
import CombinedCalendarScheduler from '@/components/LectureScheduler'
import CombinedLectureSchedulerCalendar from '@/components/LectureScheduler'
import LectureScheduler from '@/components/LectureScheduler'
import ProfessorAssignmentManager from '@/components/ProfessorAssignmentComponentManager'
import Sidebar from '@/components/SidebarAdmin'
import React from 'react'

const Page = () => {
  return (
    <div className='flex flex-row w-full  overflow-hidden'>
      
        <Sidebar/>
        
        <div className="flex flex-col min-w-full min-h-full bg-white py-8 pl-4 pr-2">
            <div className="w-full">
            <h1 className="text-3xl text-black font-bold ">Assignments</h1>
            <h5 className='text-xl text-indigo-500 font-medium mt-1'>View, grade and create new assignments!</h5>
            <div className='max-w-3/4' style={{maxWidth:"85vw"}} >
            <ProfessorAssignmentManager />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Page