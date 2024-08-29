"use client"
import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalendarSmall from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AssignmentSubmissionChecker from './AssignmentSubmissionChecker';

const localizer = momentLocalizer(moment);

interface Lecture extends Event {
  title: string;
  course: string;
  year: string;
  branch: string;
  start: Date;
  end: Date;
}

interface NewLecture {
  title: string;
  course: string;
  year: string;
  branch: string;
  date: string;
  startTime: string;
  endTime: string;
}

const courses = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const branches = ['CSE', 'ECE', 'ME', 'CE'];

const CombinedLectureSchedulerCalendar = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [newLecture, setNewLecture] = useState<NewLecture>({
    title: '',
    course: '',
    year: '',
    branch: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLecture((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewLecture((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLecture = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lecture: Lecture = {
      title: newLecture.title,
      course: newLecture.course,
      year: newLecture.year,
      branch: newLecture.branch,
      start: new Date(`${newLecture.date}T${newLecture.startTime}`),
      end: new Date(`${newLecture.date}T${newLecture.endTime}`),
    };
    setLectures((prev) => [...prev, lecture]);
    setNewLecture({
      title: '',
      course: '',
      year: '',
      branch: '',
      date: '',
      startTime: '',
      endTime: '',
    });
  };

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setSelectedDate(value[0]);
    }
  };

  const renderScheduleCard = (lecture: Lecture) => {
    const colorClasses = {
      'Computer Science': 'bg-blue-100 border-blue-500',
      'Electrical Engineering': 'bg-green-100 border-green-500',
      'Mechanical Engineering': 'bg-yellow-100 border-yellow-500',
      'Civil Engineering': 'bg-red-100 border-red-500',
    };
    const colorClass = colorClasses[lecture.course as keyof typeof colorClasses] || 'bg-gray-100 border-gray-500';

    return (
      <div key={lecture.title} className={`${colorClass} rounded-lg shadow-md py-2 px-2 mb-2 border-l-8`}>
        <h3 className="text-md font-semibold">{lecture.title}</h3>
        <p className="text-sm">{lecture.course}</p>
        <p className="text-sm">{`${moment(lecture.start).format('HH:mm')} - ${moment(lecture.end).format('HH:mm')}`}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row max-w-full gap-5 mt-3" style={{maxWidth:"80vw"}}>
      
      
      <div className="">
        <Card className="mb-4 md">
          <CardContent>
            <form onSubmit={handleAddLecture} className="space-y-4 py-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
                <div>
                  <Label htmlFor="title">Lecture Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newLecture.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select name="course" onValueChange={(value) => handleSelectChange('course', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Select name="year" onValueChange={(value) => handleSelectChange('year', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Select name="branch" onValueChange={(value) => handleSelectChange('branch', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newLecture.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={newLecture.startTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={newLecture.endTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="w-full">Add Lecture</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <AssignmentSubmissionChecker />
        </div>
        <div className="w-full md:w-4/12 bg-indigo-500 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Calendar</h2>
        <Card>
          <CardContent>
            <CalendarSmall
              onChange={handleDateChange}
              value={selectedDate}
              className="w-full"
            />
          </CardContent>
        </Card>
        <div className="mt-4">
          <h3 className="text-lg text-white font-semibold mb-1">
            Schedule for {selectedDate.toLocaleDateString()}
          </h3>
          {lectures
            .filter(lecture => moment(lecture.start).isSame(selectedDate, 'day'))
            .map(renderScheduleCard)}
        </div>
      </div>
        
      
    </div>
  );
};

export default CombinedLectureSchedulerCalendar;