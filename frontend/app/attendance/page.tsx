// "use client";
// import CalendarComponent from "@/components/Calendar";
// import Sidebar from "@/components/Sidebar";
// import React, { useEffect, useState } from "react";

// interface Course {
//   _id: string;
//   name: string;
//   code: string;
//   faculty: string;
//   year: number;
//   branch: string;
// }

// const Attendance = () => {
//   const [location, setLocation] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   useEffect(() => {
//     setIsMobile(window.innerWidth < 768);

//     const fetchCourses = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/courses');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data: Course[] = await response.json();
//         setCourses(data);
//       } catch (error) {
//         setError('Failed to fetch courses');
//       }
//     };

//     fetchCourses();
//   }, []);

//   async function fetchFlag(courseId: string) {
//     try {
//       const response = await fetch(`http://localhost:3000/aux/TOC2324/flag`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch flag value');
//       }
  
//       const data = await response.json();
//       console.log('Flag Value:', data.flag);
//       return data.flag;
//     } catch (error) {
//       console.error('Error fetching flag value:', error);
//       return null;
//     }
//   }
  
//   async function fetchGeoLocation(courseId: string) {
//     try {
//       const response = await fetch(`http://localhost:3000/aux/TOC2324/geo-location`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch geo location');
//       }
  
//       const data = await response.json();
//       console.log('Geo Location:', data);
//       alert(`Latitude: ${data.geo_latitude}, Longitude: ${data.geo_longitude}`);
//       return data;
//     } catch (error) {
//       console.error('Error fetching geo location:', error);
//       alert('Failed to fetch geo location');
//     }
//   }
  
//   const markAttendance = async (courseId: string, email: string, uid: string) => {
//     const flag = await fetchFlag(courseId);
  
//     if (flag !== 1) {
//       alert('Attendance marking is not allowed at the moment.');
//       return;
//     }
  
//     const geofenceCenter = await fetchGeoLocation(courseId);
//     if (!geofenceCenter) {
//       alert('Cannot mark attendance without a valid geofence location.');
//       return;
//     }
  
//     const geofenceRadius = 0.5;
  
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           console.log('Your location:', latitude, longitude);
//           let status = 'Absent';
  
//           try {
//             const distance = getDistanceFromLatLonInKm(
//               latitude,
//               longitude,
//               geofenceCenter.geo_latitude,
//               geofenceCenter.geo_longitude
//             );
  
//             if (distance <= geofenceRadius) {
//               status = 'Present';
//             }
  
//             const currentDate = new Date().toISOString().split('T')[0];
//             await updateAttendees(courseId, currentDate, uid, status);
//             //alert(`Attendance marked as ${status}.`);
  
//           } catch (error) {
//             alert('Error marking attendance: ' + (error.message || 'Unknown error.'));
//           }
//         },
//         (error) => {
//           alert('Error getting your location: ' + error.message);
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by this browser.');
//     }
//   };
  
//   function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
//     const R = 6371;
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   }

//   async function updateAttendees(courseId: string, date: string, uid: string, status: string) {
//     try {
//       const response = await fetch(`http://localhost:3000/aux/TOC2324/attendees`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           date: date,
//           uid: uid,
//           status: status,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update attendees');
//       }
  
//       const data = await response.json();
//       console.log('Attendees updated successfully:', data);
//       return data;
//     } catch (error) {
//       console.error('Error updating attendees:', error);
//     }
//   }

//   useEffect(() => {
//     const button = document.getElementById('get-location');
//     if (button) {
//       button.addEventListener('click', () => {
//         markAttendance('TOC2324', 'mansiadhamne@gmail.com', '20022004');
//       });
//     }
//   }, [courses]);

//   return (
//     <div className="flex flex-row bg-white w-full min-h-screen">
//       {!isMobile && <Sidebar />}
//       <div className="flex flex-col w-full min-h-full bg-white py-8 pl-4 pr-4 md:pr-2">
//         <div className="w-full">
//           <h1 className="text-3xl font-bold mt-2">Attendance</h1>
//         </div>
//         {courses.map((course) => (
//           <div key={course._id} className="flex flex-col py-4 gap-4">
//             <div className="bg-indigo-100 p-4">
//               <div>
//                 <h2 className="text-lg font-semibold text-indigo-800 pb-2">{course.name}</h2>
//                 <button id="get-location" className="bg-green-400 px-2 py-1 rounded-sm">Mark Attendance</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {!isMobile && <CalendarComponent />}
//     </div>
//   );
// };

// export default Attendance;

"use client";
import CalendarComponent from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [attendanceData, setAttendanceData] = useState<{ [key: string]: { attended: number, total: number } }>({
    'TOC2324': { attended: 2, total: 5 }, // Example hardcoded values
    'SE2324': { attended: 4, total: 5 }, // Example hardcoded values
    'FOSIP2324': { attended: 3, total: 5 } // Example hardcoded values
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

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

  async function fetchFlag(courseId: string) {
    try {
      const response = await fetch(`http://localhost:3000/aux/${courseId}/flag`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch flag value');
      }
  
      const data = await response.json();
      console.log('Flag Value:', data.flag);
      return data.flag;
    } catch (error) {
      console.error('Error fetching flag value:', error);
      return null;
    }
  }
  
  async function fetchGeoLocation(courseId: string) {
    try {
      const response = await fetch(`http://localhost:3000/aux/TOC2324/geo-location`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch geo location');
      }
  
      const data = await response.json();
      console.log('Geo Location:', data);
      //alert(`Latitude: ${data.geo_latitude}, Longitude: ${data.geo_longitude}`);
      return data;
    } catch (error) {
      console.error('Error fetching geo location:', error);
      alert('Failed to fetch geo location');
    }
  }
  
  const markAttendance = async (courseId: string, email: string, uid: string) => {
    const flag = await fetchFlag(courseId);
  
    if (flag !== 1) {
      alert('Attendance marking is not allowed at the moment.');
      return;
    }
  
    const geofenceCenter = await fetchGeoLocation(courseId);
    if (!geofenceCenter) {
      alert('Cannot mark attendance without a valid geofence location.');
      return;
    }
  
    const geofenceRadius = 100;
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Your location:', latitude, longitude);
          let status = 'Absent';
  
          try {
            const distance = getDistanceFromLatLonInKm(
              latitude,
              longitude,
              geofenceCenter.geo_latitude,
              geofenceCenter.geo_longitude
            );
  
            if (distance <= geofenceRadius) {
              status = 'Present';
            }
  
            const currentDate = new Date().toISOString().split('T')[0];
            await updateAttendees(courseId, currentDate, uid, status);
            

            setAttendanceData(prev => ({
              ...prev,
              [courseId]: {
                attended: prev[courseId]?.attended + (status === 'Present' ? 1 : 0),
                total: prev[courseId]?.total + 1,
              }
            }));
  
          } catch (error) {
            alert('Error marking attendance: ' + (error.message || 'Unknown error.'));
          }
        },
        (error) => {
          alert('Error getting your location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  
  function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async function updateAttendees(courseId: string, date: string, uid: string, status: string) {
    try {
      const response = await fetch(`http://localhost:3000/aux/TOC2324/attendees`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          uid: uid,
          status: status,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update attendees');
      }
  
      const data = await response.json();
      console.log('Attendees updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error updating attendees:', error);
    }
  }

  useEffect(() => {
    const button = document.getElementById('get-location');
    if (button) {
      button.addEventListener('click', () => {
        markAttendance('TOC2324', 'mansiadhamne@gmail.com', 'student123');
      });
    }
  }, [courses]);

  return (
    <div className="flex flex-row bg-white w-full min-h-screen">
      {!isMobile && <Sidebar />}
      <div className="flex flex-col w-full min-h-full bg-white py-8 pl-4 pr-4 md:pr-2">
        <div className="w-full">
          <h1 className="text-3xl font-bold mt-2">Attendance</h1>
        </div>
        <div className="bg-indigo-100 p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-indigo-800">Theory of Computation</h2>
                  <h4 className="text-md font-medium text-gray-700">TOC2324</h4>
                  
                </div>
                <button 
                    id="get-location" 
                    className={`bg-green-400 px-2 py-1 rounded-sm ${attendanceData['TOC2324']?.total > 0 && attendanceData['TOC2324']?.attended === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={attendanceData['TOC2324']?.total < 0 && attendanceData['TOC2324']?.attended === 0}
                  >
                    Mark Attendance
                  </button>
                <div className="w-20 h-20">
                  <CircularProgressbar 
                    value={attendanceData['TOC2324'] ? (attendanceData['TOC2324'].attended / attendanceData['TOC2324'].total) * 100 : 0} 
                    text={`${attendanceData['TOC2324'] ? Math.round((attendanceData['TOC2324'].attended / attendanceData['TOC2324'].total) * 100) : 0}%`}
                    styles={buildStyles({
                      textSize: '32px',
                      pathColor: `rgba(139, 92, 255, ${attendanceData['TOC2324']?.attended === 0 ? 0.3 : 1})`,
                      textColor: '#3e98c7',
                      trailColor: '#000000',
                      backgroundColor: '#000000',
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="bg-indigo-100 p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-indigo-800">Software Engineering</h2>
                  <h4 className="text-md font-medium text-gray-700">SE2324</h4>
                  
                </div>
                <button 
                    id="get-location" 
                    className={`bg-green-400 px-2 py-1 rounded-sm ${attendanceData['SE2324']?.total > 0 && attendanceData['SE2324']?.attended === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={attendanceData['SE2324']?.total < 0 && attendanceData['SE2324']?.attended === 0}
                  >
                    Mark Attendance
                  </button>
                {/* <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Attendance:</span>
                  <span className="text-sm text-gray-500">{attendanceData['SE2324']?.attended || 0}/{attendanceData['SE2324']?.total || 0}</span>
                </div> */}
                <div className="w-20 h-20">
                  <CircularProgressbar 
                    value={attendanceData['SE2324'] ? (attendanceData['SE2324'].attended / attendanceData['SE2324'].total) * 100 : 0} 
                    text={`${attendanceData['SE2324'] ? Math.round((attendanceData['SE2324'].attended / attendanceData['SE2324'].total) * 100) : 0}%`}
                    styles={buildStyles({
                      textSize: '32px',
                      pathColor: `rgba(139, 92, 246, ${attendanceData['SE2324']?.attended === 0 ? 0.3 : 1})`,
                      textColor: '#3e98c7',
                      trailColor: '#000000',
                      backgroundColor: '#000000',
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="bg-indigo-100 p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-indigo-800">Image & Signal Processing</h2>
                  <h4 className="text-md font-medium text-gray-700">FOSIP2324</h4>
                  
                </div>
                <button 
                    id="get-location" 
                    className={`bg-green-400 px-2 py-1 rounded-sm ${attendanceData['FOSIP2324']?.total > 0 && attendanceData['FOSIP2324']?.attended === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={attendanceData['FOSIP2324']?.total < 0 && attendanceData['FOSIP2324']?.attended === 0}
                  >
                    Mark Attendance
                  </button>
                <div className="w-20 h-20">
                  <CircularProgressbar 
                    value={attendanceData['FOSIP2324'] ? (attendanceData['FOSIP2324'].attended / attendanceData['FOSIP2324'].total) * 100 : 0} 
                    text={`${attendanceData['FOSIP2324'] ? Math.round((attendanceData['FOSIP2324'].attended / attendanceData['FOSIP2324'].total) * 100) : 0}%`}
                    styles={buildStyles({
                      textSize: '32px',
                      pathColor: `rgba(139, 92, 246, ${attendanceData['FOSIP2324']?.attended === 0 ? 0.3 : 1})`,
                      textColor: '#3e98c7',
                      trailColor: '#000000',
                      backgroundColor: '#000000',
                    })}
                  />
                </div>
              </div>
            </div>
        {/* {courses.map((course) => (
          <div key={course._id} className="flex flex-col py-4 gap-4">
            <div className="bg-indigo-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-indigo-800 pb-2">{course.name}</h2>
                  <button 
                    id="get-location" 
                    className={`bg-green-400 px-2 py-1 rounded-sm ${attendanceData['SE2324']?.total > 0 && attendanceData['TOC2324']?.attended === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={attendanceData['TOC2324']?.total < 0 && attendanceData['TOC2324']?.attended === 0}
                  >
                    Mark Attendance
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Attendance:</span>
                  <span className="text-sm text-gray-500">{attendanceData['TOC2324']?.attended || 0}/{attendanceData['TOC2324']?.total || 0}</span>
                </div>
                <div className="w-20 h-20">
                  <CircularProgressbar 
                    value={attendanceData['TOC2324'] ? (attendanceData['TOC2324'].attended / attendanceData['TOC2324'].total) * 100 : 0} 
                    text={`${attendanceData['TOC2324'] ? Math.round((attendanceData['TOC2324'].attended / attendanceData['TOC2324'].total) * 100) : 0}%`}
                    styles={buildStyles({
                      textSize: '32px',
                      pathColor: `rgba(139, 92, 246, ${attendanceData['TOC2324']?.attended === 0 ? 0.3 : 1})`,
                      textColor: '#3e98c7',
                      trailColor: '#000000',
                      backgroundColor: '#000000',
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        ))} */}
      </div>
      {!isMobile && <CalendarComponent />}
    </div>
  );
};

export default Attendance;
