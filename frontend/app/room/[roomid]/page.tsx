'use client';

import React, { useRef, useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface RoomProps {
  roomID: string;
}

const Room: React.FC<RoomProps> = ({ roomID }) => {
  const meetingContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const myMeeting = async (element: HTMLDivElement | null) => {
      const appID = 396092521;
      const serverSecret = "603a232b3294f913de4f569c3e68d2fd";
      // const appID = +process.env.NEXT_PUBLIC_APPID;
      // const serverSecret = process.env.NEXT_PUBLIC_SERVERSECRET;

      // Check if appID and serverSecret are valid
      if (!appID || !serverSecret) {
        console.error("AppID or ServerSecret is not defined!");
        return;
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        "NFC3"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (!zp) {
        console.error("Failed to create ZegoUIKitPrebuilt instance!");
        return;
      }

      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // Change to OneONoneCall for 1-on-1 calls
        },
      });
    };

    if (meetingContainerRef.current) {
      myMeeting(meetingContainerRef.current);
    }
  }, [roomID]); // Dependency on roomID to rerun if it changes

  return (
    <div ref={meetingContainerRef} className='w-[100vw] h-[100vh]'>
      Room
    </div>
  );
};

export default Room;
