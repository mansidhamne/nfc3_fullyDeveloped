import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-row w-full'>
        <Sidebar/>
        <div className="flex flex-col min-w-full min-h-full bg-white py-8 pl-4 pr-2">
            <div className="w-full">
            <h1 className="text-3xl font-bold mt-2">Courses</h1>
            </div>
        </div>
    </div>
  )
}

export default page