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
import * as XLSX from "xlsx"; // Import the xlsx library

interface Student {
  id: string;
  name: string;
}

interface Lecture {
  id: number;
  title: string;
  startTime: string;
}

const LectureAttendance: React.FC = () => {
  const [upcomingLecture, setUpcomingLecture] = useState<Lecture | null>(null);
  const [isAttendanceStarted, setIsAttendanceStarted] = useState<boolean>(false);
  const [attendees, setAttendees] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Student[]>([]);

  useEffect(() => {
    const fetchUpcomingLecture = async () => {
      const lecture: Lecture = {
        id: 1,
        title: "Introduction to React",
        startTime: new Date(Date.now() + 3600000).toLocaleString(),
      };
      setUpcomingLecture(lecture);
    };

    fetchUpcomingLecture();
  }, []);

  const startAttendance = () => {
    setIsAttendanceStarted(true);
  };

  const endAttendance = () => {
    setIsAttendanceStarted(false);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const results = term
      ? [
          { id: "S001", name: "John Doe" },
          { id: "S002", name: "Jane Smith" },
          { id: "S003", name: "Bob Johnson" },
        ].filter((student) =>
          student.name.toLowerCase().includes(term.toLowerCase())
        )
      : [];

    setSearchResults(results);
  };

  const addAttendance = (student: Student) => {
    if (!attendees.some((a) => a.id === student.id)) {
      setAttendees([...attendees, student]);
    }
    setSearchTerm("");
    setSearchResults([]);
  };

  const deleteAttendance = (studentId: string) => {
    setAttendees(attendees.filter((student) => student.id !== studentId));
  };

  const generateExcelReport = () => {
    const data = attendees.map((student) => ({
      "Student ID": student.id,
      Name: student.name,
      Time: new Date().toLocaleTimeString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    XLSX.writeFile(workbook, `${upcomingLecture?.title}_Attendance.xlsx`);
  };

  return (
    <div className="flex flex-col space-y-4 p-4 ">
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
                  key={student.id}
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
                  <TableCell>Time</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{new Date().toLocaleTimeString()}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => deleteAttendance(student.id)}
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
