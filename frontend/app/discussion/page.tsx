import LiveBlocks from '@/components/LiveBlocks'
import Sidebar from '@/components/Sidebar'
import VideoCard from '@/components/VideoCard'
import VirtualAssistant from '@/components/VirtualAssistant'
import React from 'react'

const Discussion = () => {
  return (
    <div className="flex flex-row justify-between min-w-full bg-white">
        <Sidebar/>
        {/* <VirtualAssistant /> */}
        <VideoCard />
        <LiveBlocks />
        {/* <div className="flex flex-row mt-8 gap-4">
            <VideoCard />
            <LiveBlocks />
        </div> */}
    </div>
  )
}

export default Discussion