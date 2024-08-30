'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const VideoCard: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('');

  return (
    <div className="bg-yellow-100 p-4 rounded-xl mt-4 mx-8 flex flex-col items-center shadow-md">
      <h3 className="text-2xl font-semibold text-center">EduZoom</h3>
      <p className="text-md mt-2">Make a video room and send it to your friends to work together!</p>
      <input
        type='text'
        placeholder='Enter RoomID'
        className='mt-4 px-6 py-2 w-[50%] rounded-lg outline-none bg-white'
        onChange={(e) => setRoomId(e.target.value)}
        value={roomId}
      />
      <Link href={`/room/${roomId}`} target='_blank'>
        <button className='px-8 py-2 mt-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-800'>
          Join Room
        </button>
      </Link>
    </div>
  );
};

export default VideoCard;
