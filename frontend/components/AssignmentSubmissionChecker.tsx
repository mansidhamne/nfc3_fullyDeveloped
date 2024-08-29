"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Submission {
  id: number;
  studentName: string;
  assignmentName: string;
  submissionDate: string;
  status: string;
}

// Mock data for submissions    
const mockSubmissions: Submission[] = [
  { id: 1, studentName: "Alice Johnson", assignmentName: "React Basics", submissionDate: "2023-08-25", status: "Pending" },
  { id: 2, studentName: "Bob Smith", assignmentName: "State Management", submissionDate: "2023-08-24", status: "Pending" },
  { id: 3, studentName: "Charlie Brown", assignmentName: "API Integration", submissionDate: "2023-08-23", status: "Graded" },
];

const AssignmentSubmissionChecker: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [grade, setGrade] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  const handleCheck = (submission: Submission) => {
    setSelectedSubmission(submission);
    setGrade("");
    setFeedback("");
  };

  const handleGrade = () => {
    if (selectedSubmission) {
      const updatedSubmissions = submissions.map(sub =>
        sub.id === selectedSubmission.id ? { ...sub, status: "Graded" } : sub
      );
      setSubmissions(updatedSubmissions);
      setSelectedSubmission(null);
      // Here you would typically send the grade and feedback to a backend API
      console.log(`Submission ${selectedSubmission.id} graded with ${grade} and feedback: ${feedback}`);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Assignment Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Assignment</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.studentName}</TableCell>
                <TableCell>{submission.assignmentName}</TableCell>
                <TableCell>{submission.submissionDate}</TableCell>
                <TableCell>{submission.status}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => handleCheck(submission)}>Check</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Check Submission</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="grade" className="text-right">
                            Grade
                          </Label>
                          <Input
                            id="grade"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="feedback" className="text-right">
                            Feedback
                          </Label>
                          <Input
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <Button onClick={handleGrade}>Submit Grade</Button>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AssignmentSubmissionChecker;
