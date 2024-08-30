"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Lecture {
  id: string;
  title: string;
  startTime: string;
}

const StudentAttendance: React.FC = () => {
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [studentId, setStudentId] = useState("2022700009"); // In a real app, this would come from authentication

  useEffect(() => {
    const fetchCurrentLecture = async () => {
      try {
        const response = await axios.get("/api/current-lecture");
        setCurrentLecture(response.data);
      } catch (error) {
        console.error("Failed to fetch current lecture:", error);
      }
    };

    fetchCurrentLecture();
    // Set up polling to check for active lectures
    const intervalId = setInterval(fetchCurrentLecture, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, []);

  const markAttendance = async () => {
    

    try {
      const position = await getCurrentPosition();
      await axios.patch(`http://localhost:3000/aux/TOC2324/attendees`, {
        date: new Date().toISOString().split('T')[0],
        uid: studentId,
        status: "present",
        geo_latitude: position.coords.latitude,
        geo_longitude: position.coords.longitude,
      });
      setAttendanceMarked(true);
      alert("Attendance Marked")
    } catch (error) {
      console.error("Failed to mark attendance:", error);
    }
  };

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">TOC</h2>
      <p>Starts at: 10am</p>
      <Button
        onClick={markAttendance}
        disabled={attendanceMarked}
        className="mt-4 bg-blue-500 text-white"
      >
        {attendanceMarked ? "Attendance Marked" : "Mark Attendance"}
      </Button>
    </div>
  );
};

export default StudentAttendance;