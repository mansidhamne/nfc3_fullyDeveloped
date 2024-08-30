import React from 'react'
import Link from 'next/link'

const LiveBlocks = () => {
  return (
    <div className="bg-green-100 p-4 rounded-xl mt-4 mx-8 flex flex-col items-center shadow-md w-[500px] h-[500px]">
      <h3 className="text-2xl font-semibold text-center">EduDocs</h3>
      <p className="text-md mt-2.5 text-center">Collaborate with your friends to edit docs and work on assignments together !</p>
      <img src="https://liveblocks.io/_next/image?url=%2Fimages%2Fexamples%2Fthumbnails%2Ftext-editor.jpg&w=828&q=90" alt="" className='pt-4'/>
      <Link href="http://localhost:3002" target="_blank">
        <button
          className="px-4 py-2 mt-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-800"
        >
          Start Collaboration
        </button>
      </Link>
    </div>
  )
}

export default LiveBlocks
