"use client";
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pie, Bar } from "react-chartjs-2";
import { FileText, Download } from "lucide-react";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface StudentAttendance {
  uid: string;
  status: "Present" | "Absent";
}

interface AttendanceRecord {
  sessionId: number;
  date: string;
  subject: string;
  branch: string;
  attended: number;
  total: number;
  students: StudentAttendance[];
}

const AttendanceReport: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const data: AttendanceRecord[] = [
        {
          sessionId: 1,
          date: "2024-08-01",
          subject: "Algorithms",
          branch: "Computer Science",
          attended: 25,
          total: 30,
          students: [
            { uid: "S001", status: "Present" },
            { uid: "S002", status: "Absent" },
            // More students...
          ],
        },
        {
          sessionId: 2,
          date: "2024-08-05",
          subject: "Web Development",
          branch: "Information Technology",
          attended: 20,
          total: 25,
          students: [
            { uid: "S003", status: "Present" },
            { uid: "S004", status: "Absent" },
            // More students...
          ],
        },
        // More sessions...
      ];
      setAttendanceData(data);
    };

    fetchAttendanceData();
  }, []);

  const handleDownload = (session: AttendanceRecord) => {
    const studentData = session.students.map((student) => ({
      UID: student.uid,
      Status: student.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(studentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Attendance_${session.sessionId}`);
    XLSX.writeFile(workbook, `Attendance_Report_Session_${session.sessionId}.xlsx`);
  };

  const handleViewAnalytics = (session: AttendanceRecord) => {
    setSelectedSession(session.sessionId);
    setIsModalOpen(true);
  };

  const getAttendancePercentage = (attended: number, total: number) => {
    if (total === 0) {
      return "0";
    }
    return ((attended / total) * 100).toFixed(2);
  };

  const calculateGeneralAnalytics = () => {
    const totalSessions = attendanceData.length;
    const totalAttended = attendanceData.reduce((sum, session) => sum + session.attended, 0);
    const totalStudents = attendanceData.reduce((sum, session) => sum + session.total, 0);
    const overallAttendanceRate = ((totalAttended / totalStudents) * 100).toFixed(2);

    const attendanceByBranch: { [branch: string]: number } = {};
    attendanceData.forEach((session) => {
      if (!attendanceByBranch[session.branch]) {
        attendanceByBranch[session.branch] = 0;
      }
      attendanceByBranch[session.branch] += session.attended;
    });

    return {
      totalSessions,
      overallAttendanceRate,
      attendanceByBranch,
    };
  };

  const generalAnalytics = calculateGeneralAnalytics();

  const selectedSessionData = attendanceData.find((session) => session.sessionId === selectedSession);

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">Attendance Reports</h2>

      {/* General Analytics Section */}
     

      {/* Detailed Session Reports */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Attended</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Attendance %</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((session) => (
              <TableRow key={session.sessionId}>
                <TableCell>{session.date}</TableCell>
                <TableCell>{session.subject}</TableCell>
                <TableCell>{session.branch}</TableCell>
                <TableCell>{session.attended}</TableCell>
                <TableCell>{session.total}</TableCell>
                <TableCell>{getAttendancePercentage(session.attended, session.total)}%</TableCell>
                <TableCell>
                  <Button onClick={() => handleDownload(session)} className="mr-2">
                    <Download className="mr-1" /> Download
                  </Button>
                  <Button onClick={() => handleViewAnalytics(session)} className="mr-2">
                    <FileText className="mr-1" /> Analytics
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">General Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64">
            <h4 className="text-lg font-medium">Overall Attendance Rate</h4>
            <div className="h-52">
              <Pie
                data={{
                  labels: ['Attended', 'Missed'],
                  datasets: [
                    {
                      label: 'Attendance Rate',
                      data: [
                        generalAnalytics.overallAttendanceRate,
                        Number(100) - Number(generalAnalytics.overallAttendanceRate),
                      ],
                      backgroundColor: ['#4CAF50', '#FF5252'],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
          <div className="h-64">
            <h4 className="text-lg font-medium">Attendance by Branch</h4>
            <div className="h-52">
              <Bar
                data={{
                  labels: Object.keys(generalAnalytics.attendanceByBranch),
                  datasets: [
                    {
                      label: 'Total Attended',
                      data: Object.values(generalAnalytics.attendanceByBranch),
                      backgroundColor: '#2196F3',
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Modal for Session-Specific Analytics */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {selectedSessionData && (
              <Card className="space-y-4 p-6">
                <h3 className="text-xl font-semibold">
                  Session Analytics - {selectedSessionData.subject}
                </h3>
                <div className="space-y-4">
                  <p>Branch: {selectedSessionData.branch}</p>
                  <p>Date: {selectedSessionData.date}</p>
                  <Bar
                    data={{
                      labels: ["Attended", "Missed"],
                      datasets: [
                        {
                          label: "Students",
                          data: [
                            selectedSessionData.attended,
                            selectedSessionData.total - selectedSessionData.attended,
                          ],
                          backgroundColor: ["#4CAF50", "#FF5252"],
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </Card>
            )}
            <Button onClick={() => setIsModalOpen(false)} className="mt-4">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;
