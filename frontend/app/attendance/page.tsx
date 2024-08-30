"use client";
import CalendarComponent from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";

interface Course {
  _id: string;
  name: string;
  code: string;
  faculty: string;
  year: number;
  branch: string;
}

const Attendance = () => {
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/courses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (error) {
        setError('Failed to fetch courses');
      }
    };

    fetchCourses();
  }, []);

useEffect(() => {
  const markAttendance = async () => {
    try {
      const response = await fetch('http://localhost:3000/attendance/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'mansi.dhamne22@spit.ac.in', // Get this from the user's session or context
          latitude: currentLatitude,
          longitude: currentLongitude,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to mark attendance');
      }
  
      const data = await response.json();
      console.log('Attendance marked:', data);
      } catch (error) {
        console.error(error.message);
      }
    };

    markAttendance();
  }, []);
  


  const getLocation = () => {
    // Check if Geolocation is supported by the browser
    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(showPosition, showError, {
        enableHighAccuracy: true,
      });
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position: GeolocationPosition) => {
    // Extract latitude and longitude from position object
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display latitude and longitude
    setLocation(`Latitude: ${latitude} \n Longitude: ${longitude}`);
  };

  const showError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      default:
        setError("An unknown error occurred.");
    }
  };

  return (
    <div className="flex flex-row bg-white w-full min-h-screen">
      <Sidebar/>
      <div className="flex flex-col w-full min-h-full bg-white py-8 pl-4 pr-2">
        <div className="w-full">
          <h1 className="text-3xl font-bold mt-2">Attendance</h1>
        </div>
        {courses.map((course) => (
          <div key={course._id} className="flex flex-col py-4 gap-4">
            <div className="bg-indigo-100 p-4">
              <div>
                <h2 className="text-lg font-semibold text-indigo-800 pb-2">{course.name}</h2>
                <button onClick={getLocation} className="bg-green-400 px-2 py-1 rounded-sm">Mark Attendance</button>
              </div>
              
            </div>
          </div>
        ))}

      </div>
      <CalendarComponent/>
    </div>
  );
};

export default Attendance;