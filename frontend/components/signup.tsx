import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';


export function SignupFormDemo() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'student' | 'teacher' | null>(null);
  const { register, login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    uid: '',
    phoneNo: '',
    year: '',
    branch: '',
    leetcodeProfileUrl: '',
    githubProfileUrl: '',
    teacherId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router=useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      if (!isLogin && role) {
        await register({ ...formData, role });
        if (role === 'student') {
          router.push('/face-recognition');
        } else if (role === 'teacher') {
          router.push(`/admin-dashboard?teacherId=${formData.teacherId}`);
        }
      } else {
        const response = await login(formData.email, formData.password);
        const userRole = response.role;
         // Retrieve role from the login response
        const user=response.user;
  
        if (userRole === 'student') {
          router.push(`/student-dashboard/${user.studentId}`);
        } else if (userRole === 'teacher') {
          router.push(`/admin-dashboard/${user.teacherId}`);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };
  
  
  

  return (
    <div className=" mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black h-screen overflow-hidden flex flex-col justify-center" style={{width:"40vw", padding:'20px', maxHeight:'90vh'}}>
      <h2 className="pt-10 font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to EduVerse
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {isLogin ? "Login to your account" : "Create a new account"}
      </p>

      <form className="my-4 flex-grow overflow-y-auto" onSubmit={handleSubmit}>
        <div className="space-y-4">
          {!isLogin && (
            <LabelInputContainer>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" placeholder="John Doe" type="text" value={formData.name} onChange={handleChange} required />
            </LabelInputContainer>
          )}

          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" placeholder="you@example.com" type="email" value={formData.email} onChange={handleChange} required />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} required />
          </LabelInputContainer>

          {!isLogin && !role && (
            <div className="flex justify-between">
              <button type="button" onClick={() => setRole('student')} className="px-4 py-2 bg-blue-500 text-white rounded">Student</button>
              <button type="button" onClick={() => setRole('teacher')} className="px-4 py-2 bg-green-500 text-white rounded">Teacher</button>
            </div>
          )}

          {!isLogin && role === 'student' && (
            <>
              <LabelInputContainer>
                <Label htmlFor="uid">UID</Label>
                <Input id="uid" name="uid" placeholder="Student ID" type="text" value={formData.uid} onChange={handleChange} required />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="phoneNo">Phone Number</Label>
                <Input id="phoneNo" name="phoneNo" placeholder="Phone Number" type="tel" value={formData.phoneNo} onChange={handleChange} required />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" placeholder="Current Year" type="number" value={formData.year} onChange={handleChange} required />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="branch">Branch</Label>
                <Input id="branch" name="branch" placeholder="Your Branch" type="text" value={formData.branch} onChange={handleChange} required />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="leetcodeProfileUrl">LeetCode Profile URL</Label>
                <Input id="leetcodeProfileUrl" name="leetcodeProfileUrl" placeholder="LeetCode Profile" type="url" value={formData.leetcodeProfileUrl} onChange={handleChange} />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="githubProfileUrl">GitHub Profile URL</Label>
                <Input id="githubProfileUrl" name="githubProfileUrl" placeholder="GitHub Profile" type="url" value={formData.githubProfileUrl} onChange={handleChange} />
              </LabelInputContainer>
            </>
          )}

          {!isLogin && role === 'teacher' && (
            <LabelInputContainer>
              <Label htmlFor="teacherId">Teacher ID</Label>
              <Input id="teacherId" name="teacherId" placeholder="Teacher ID" type="text" value={formData.teacherId} onChange={handleChange} required />
            </LabelInputContainer>
          )}
        </div>
        
        <div className="mt-4">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {isLogin ? "Login" : "Sign up"} &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

          <div className="text-center">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-500">
              {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
