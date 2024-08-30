"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
import axios from "axios";

interface Student {
  uid: string;
  name: string;
  status: string;
}

interface Lecture {
  id: string;
  title: string;
  startTime: string;
}

const LectureAttendance: React.FC = () => {
  const [upcomingLecture, setUpcomingLecture] = useState<Lecture | null>(null);
  const [isAttendanceStarted, setIsAttendanceStarted] = useState<boolean>(false);
  const [attendees, setAttendees] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [teacherLocation, setTeacherLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchUpcomingLecture = async () => {
      const lecture: Lecture = {
        id: "TOC2324",
        title: "Theory of Computation",
        startTime: new Date(Date.now() + 3600000).toLocaleString(),
      };
      setUpcomingLecture(lecture);
    };

    fetchUpcomingLecture();
  }, []);

  const fetchAttendees = async () => {
    if (!upcomingLecture) return;

    try {
      const response = await axios.get(`http://localhost:3000/aux/${upcomingLecture.id}/attendees/${new Date().toISOString().split('T')[0]}`);
      setAttendees(response.data.attendees);
    } catch (error) {
      console.error("Failed to fetch attendees:", error);
    }
  };

  useEffect(() => {
    if (isAttendanceStarted) {
      fetchAttendees();
      const intervalId = setInterval(fetchAttendees, 30000); // Fetch every 30 seconds
      return () => clearInterval(intervalId);
    }
  }, [isAttendanceStarted, upcomingLecture]);

  const startAttendance = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setTeacherLocation({ latitude, longitude });
          
          try {
            await axios.patch(`http://localhost:3000/aux/TOC2324`, {
              geo_latitude: latitude,
              geo_longitude: longitude,
            });
            setIsAttendanceStarted(true);
          } catch (error) {
            console.error("Failed to start attendance:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const endAttendance = async () => {
    try {
      await axios.patch(`http://localhost:3000/aux/TOC2324`, {
        geo_latitude: 0,
        geo_longitude: 0,
        flag: 1,
      });
      setIsAttendanceStarted(false);
      setTeacherLocation(null);
    } catch (error) {
      console.error("Failed to end attendance:", error);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    // In a real scenario, this would search from your backend
    const results = term
      ? [
          { uid: "S001", name: "John Doe", status: "" },
          { uid: "S002", name: "Jane Smith", status: "" },
          { uid: "S003", name: "Bob Johnson", status: "" },
        ].filter((student) =>
          student.name.toLowerCase().includes(term.toLowerCase())
        )
      : [];

    setSearchResults(results);
  };

  const addAttendance = async (student: Student) => {
    if (!attendees.some((a) => a.uid === student.uid)) {
      try {
        await axios.patch(`http://localhost:3000/aux/TOC2324/attendees`, {
          date: new Date().toISOString().split('T')[0],
          uid: student.uid,
          status: "present",
        });

        await fetchAttendees(); // Refresh the attendees list
      } catch (error) {
        console.error("Failed to add attendance:", error);
      }
    }
    setSearchTerm("");
    setSearchResults([]);
  };

  const deleteAttendance = async (studentId: string) => {
    try {
      // You might want to add an API call here to remove the attendance record
      setAttendees(attendees.filter((student) => student.uid !== studentId));
    } catch (error) {
      console.error("Failed to delete attendance:", error);
    }
  };

  const generateExcelReport = () => {
    const data = attendees.map((student) => ({
      "Student ID": student.uid,
      Name: student.name,
      Status: student.status,
      Time: new Date().toLocaleTimeString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    XLSX.writeFile(workbook, `${upcomingLecture?.title}_Attendance.xlsx`);
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      {upcomingLecture && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">{upcomingLecture.title}</h2>
          <p className="text-gray-600">Starts at: {upcomingLecture.startTime}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={startAttendance}
          disabled={isAttendanceStarted}
          className="bg-green-500 text-white"
        >
          Start Attendance
        </Button>
        <Button
          onClick={endAttendance}
          disabled={!isAttendanceStarted}
          className="bg-red-500 text-white"
        >
          End Session
        </Button>
        <Button
          onClick={generateExcelReport}
          disabled={attendees.length === 0}
          className="bg-blue-500 text-white"
        >
          Generate Excel Report
        </Button>
      </div>

      {teacherLocation && (
        <p>Teacher's Location: Lat {teacherLocation.latitude.toFixed(6)}, Long {teacherLocation.longitude.toFixed(6)}</p>
      )}

      {isAttendanceStarted && (
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {searchResults.length > 0 && (
            <ul className="bg-white border rounded-md shadow-sm max-h-40 overflow-auto">
              {searchResults.map((student) => (
                <li
                  key={student.uid}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => addAttendance(student)}
                >
                  {student.name}
                </li>
              ))}
            </ul>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.map((student) => (
                  <TableRow key={student.uid}>
                    <TableCell>{student.uid}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.status}</TableCell>
                    <TableCell>{new Date().toLocaleTimeString()}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => deleteAttendance(student.uid)}
                        className="bg-red-500 text-white"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureAttendance;