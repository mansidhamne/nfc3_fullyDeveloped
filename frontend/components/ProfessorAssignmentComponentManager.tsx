"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "@/components/ui/Modal";
import Select from "./ui/Selct2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Eye, Check, ShieldAlert } from "lucide-react";

interface Assignment {
  id: number;
  title: string;
  description: string;
  subject: string;
  branch: string;
  studentName: string;
  submissionDate: string;
  status: string;
  grade?: string;
  pdfLink?: string;
}

interface NewAssignment {
  title: string;
  description: string;
  subject: string;
  branch: string;
  deadline: string;
}

const ProfessorAssignmentManager: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>(
    []
  );
  const [subjects, setSubjects] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState<boolean>(false);
  const [isNewAssignmentModalOpen, setIsNewAssignmentModalOpen] =
    useState<boolean>(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [grade, setGrade] = useState<string>("");
  const [newAssignment, setNewAssignment] = useState<NewAssignment>({
    title: "",
    description: "",
    subject: "",
    branch: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const assignmentsData: Assignment[] = [
        {
          id: 1,
          title: "React Basics",
          subject: "Web Development",
          branch: "Computer Science",
          status: "Submitted",
          studentName: "John Doe",
          submissionDate: "2024-08-25",
          description: "sort",
          pdfLink: "https://www.tutorialspoint.com/reactjs/reactjs_tutorial.pdf",
        },
        {
          id: 2,
          title: "Data Structures",
          subject: "Algorithms",
          branch: "Computer Science",
          status: "Graded",
          studentName: "Jane Smith",
          submissionDate: "2024-08-24",
          grade: "8",
          description: "sort",
          pdfLink: "https://www.tutorialspoint.com/reactjs/reactjs_tutorial.pdf",
        },
      ];
      const subjectsData = ["Web Development", "Algorithms", "Database Systems"];
      const branchesData = [
        "Computer Science",
        "Information Technology",
        "Electronics",
      ];

      setAssignments(assignmentsData);
      setFilteredAssignments(assignmentsData);
      setSubjects(subjectsData);
      setBranches(branchesData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = assignments.filter(
      (assignment) =>
        (!selectedSubject || assignment.subject === selectedSubject) &&
        (!selectedBranch || assignment.branch === selectedBranch)
    );
    setFilteredAssignments(filtered);
  }, [selectedSubject, selectedBranch, assignments]);

  const handleViewPDF = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsViewModalOpen(true);
  };

  const handleGrade = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setGrade(assignment.grade || "");
    setIsGradeModalOpen(true);
  };

  const submitGrade = () => {
    const updatedAssignments = assignments.map((a) =>
      a.id === selectedAssignment?.id
        ? { ...a, grade, status: "Graded" }
        : a
    );
    setAssignments(updatedAssignments);
    setIsGradeModalOpen(false);
  };

  const handleNewAssignment = () => {
    setIsNewAssignmentModalOpen(true);
  };

  const submitNewAssignment = () => {
    const newAssignmentWithId: Assignment = {
      id: assignments.length + 1,
      title: newAssignment.title,
      description: newAssignment.description,
      subject: newAssignment.subject,
      branch: newAssignment.branch,
      studentName: "", // Provide a default or initial value
      submissionDate: "", // Provide a default or initial value
      status: "Pending",
    };

    setAssignments([...assignments, newAssignmentWithId]);
    setIsNewAssignmentModalOpen(false);
    setNewAssignment({
      title: "",
      description: "",
      subject: "",
      branch: "",
      deadline: "",
    });
  };

  const handleViewPlagiarism = (assignment: Assignment) => {
    const streamlitLink = `https://streamlit-app.com/plagiarism-check?file=${encodeURIComponent(
      assignment.pdfLink || ""
    )}`;
    window.open(streamlitLink, "_blank");
  };

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Assignment Manager</h2>
        <Button
          onClick={handleNewAssignment}
          className="bg-blue-500 text-white flex items-center"
        >
          <Plus className="mr-2" /> New Assignment
        </Button>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full md:w-1/3"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </Select>
        <Select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="w-full md:w-1/3"
        >
          <option value="">All Branches</option>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </Select>
      </div>

      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.subject}</TableCell>
              <TableCell>{assignment.branch}</TableCell>
              <TableCell>{assignment.studentName}</TableCell>
              <TableCell>{assignment.submissionDate}</TableCell>
              <TableCell>{assignment.status}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  onClick={() => handleViewPDF(assignment)}
                  className="mr-2 flex items-center"
                >
                  <Eye className="mr-1" /> View
                </Button>
                <Button
                  onClick={() => handleViewPlagiarism(assignment)}
                  className="mr-2 flex items-center"
                >
                  <ShieldAlert className="mr-1" /> Plagiarism
                </Button>
                <Button
                  onClick={() => handleGrade(assignment)}
                  disabled={assignment.status === "Graded"}
                  className="flex items-center"
                >
                  <Check className="mr-1" /> Grade
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      >
        <h3 className="text-lg font-semibold mb-4">View Assignment</h3>
        <div className="bg-gray-100 p-4 rounded">
          <p>
            <a
              href={selectedAssignment?.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View PDF
            </a>
          </p>
          <p>Assignment: {selectedAssignment?.title}</p>
          <p>Student: {selectedAssignment?.studentName}</p>
        </div>
      </Modal>

      <Modal
        isOpen={isGradeModalOpen}
        onClose={() => setIsGradeModalOpen(false)}
      >
        <h3 className="text-lg font-semibold mb-4">Grade Assignment</h3>
        <Input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Enter grade"
          className="mb-4"
        />
        <Button onClick={submitGrade} className="bg-blue-500 text-white">
          Submit Grade
        </Button>
      </Modal>

      <Modal
        isOpen={isNewAssignmentModalOpen}
        onClose={() => setIsNewAssignmentModalOpen(false)}
      >
        <h3 className="text-lg font-semibold mb-4">New Assignment</h3>
        <Input
          type="text"
          value={newAssignment.title}
          onChange={(e) =>
            setNewAssignment({ ...newAssignment, title: e.target.value })
          }
          placeholder="Assignment Title"
          className="mb-2"
        />
        <Input
          type="text"
          value={newAssignment.description}
          onChange={(e) =>
            setNewAssignment({ ...newAssignment, description: e.target.value })
          }
          placeholder="Assignment Description"
          className="mb-2"
        />
        <Select
          value={newAssignment.subject}
          onChange={(e) =>
            setNewAssignment({ ...newAssignment, subject: e.target.value })
          }
          className="mb-2"
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </Select>
        <Select
          value={newAssignment.branch}
          onChange={(e) =>
            setNewAssignment({ ...newAssignment, branch: e.target.value })
          }
          className="mb-2"
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </Select>
        <Input
          type="date"
          value={newAssignment.deadline}
          onChange={(e) =>
            setNewAssignment({ ...newAssignment, deadline: e.target.value })
          }
          className="mb-4"
        />
        <Button
          onClick={submitNewAssignment}
          className="bg-blue-500 text-white"
        >
          Add Assignment
        </Button>
      </Modal>
    </div>
  );
};

export default ProfessorAssignmentManager;
