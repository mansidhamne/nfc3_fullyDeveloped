import LiveBlocks from '@/components/LiveBlocks'
import Sidebar from '@/components/Sidebar'
import VideoCard from '@/components/VideoCard'
import VirtualAssistant from '@/components/VirtualAssistant'
import React from 'react'

const Discussion = () => {
  return (
    <div className="flex flex-row min-w-full min-h-full bg-white">
        <Sidebar/>
        <VirtualAssistant />
        <div className="flex flex-col">
            <VideoCard />
            <LiveBlocks />
        </div>
    </div>
  )
}

export default Discussion