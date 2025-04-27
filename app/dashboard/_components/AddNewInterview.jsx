/*

"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateInterviewQuestions } from '@/utils/GeminiAIModel';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [JobDescription, setJobDescription] = useState();
  const [JobExperience, setJobExperience] = useState();


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(jobPosition, JobDescription, JobExperience);
    const InputPrompt =
      "Job Position: " +
      jobPosition +
      ", Job Description:" +
      JobDescription +
      ",Years of Experience:" +
      JobExperience +
      ", Depends on this information please give US " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " interview questions with Answered in json format.give question and answers as fill in json";

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat();
      const result = await chat.sendMessage(InputPrompt);
      const response = await result.response;
      console.log(response.text());
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Tell us more about your job interviewing
              </DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-4">
                  <p>Add Details about your job position/role, Job description and years of Experience</p>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Job Role/Job Position
                </label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  onChange={(event) => setJobPosition(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Job Description/ Tech Stack (In Short)
                </label>
                <Textarea
                  placeholder="Ex. React, Angular, NodeJs, MySql etc"
                  required
                  onChange={(event) => setJobDescription(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Years of Experience
                </label>
                <Input
                  placeholder="2"
                  type="number"
                  max="50"
                  required
                  onChange={(event) => setJobExperience(event.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-5 justify-end mt-6">
              <Button variant="ghost" type="button" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Start Interview</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateInterviewQuestions } from '@/utils/GeminiAIModel';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const promptData = {
        jobPosition,
        jobDescription,
        jobExperience
      };

      const generatedQuestions = await generateInterviewQuestions(promptData);
      setQuestions(generatedQuestions);
      
    } catch (error) {
      console.error("Error:", error);
      setQuestions([{
        question: "Error generating questions",
        answer: error.message
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Tell us more about your job interviewing
              </DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-4">
                  <p>Add Details about your job position/role, Job description and years of Experience</p>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Job Role/Job Position
                </label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Job Description/ Tech Stack (In Short)
                </label>
                <Textarea
                  placeholder="Ex. React, Angular, NodeJs, MySql etc"
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Years of Experience
                </label>
                <Input
                  placeholder="2"
                  type="number"
                  max="50"
                  required
                  value={jobExperience}
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
            </div>

            {isLoading && (
              <div className="p-4 bg-blue-50 rounded-lg mt-4">
                <p>Generating questions...</p>
              </div>
            )}

            {questions && (
              <div className="mt-4 space-y-3">
                <h3 className="font-medium">Generated Questions:</h3>
                {questions.map((q, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Q: {q.question}</p>
                    <p className="text-sm text-gray-600 mt-1">A: {q.answer}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-5 justify-end mt-6">
              <Button 
                variant="ghost" 
                type="button" 
                onClick={() => {
                  setOpenDialog(false);
                  setQuestions(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Questions"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;*/
"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateInterviewQuestions } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

 


function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [JsonResponce,setJsonResponce]=useState([]);
  const router=useRouter();
  const {user}=useUser();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const promptData = {
        jobPosition,
        jobDescription,
        jobExperience
      };

      const generatedQuestions = await generateInterviewQuestions(promptData);
      console.log("Generated Questions:", generatedQuestions);
      setJsonResponce(generatedQuestions);
      if(generatedQuestions){
      const resp=await db.insert(MockInterview)
      .values({
        mockId:uuidv4(),
        JsonMockResp:generatedQuestions,
        jobPosition:jobPosition,
        jobDescription:jobDescription,
        jobExperience:jobExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date()
      }).returning({mockId:MockInterview.mockId});

      console.log("Inserted ID:",resp)
      if(resp){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
    }else{
      console.log("error");
    }

      
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setIsLoading(false);
      setOpenDialog(false);
      // Reset form fields
      setJobPosition('');
      setJobDescription('');
      setJobExperience('');
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Tell us more about your job interviewing
              </DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-4">
                  <p>Add Details about your job position/role, Job description and years of Experience</p>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Job Role/Job Position
                </label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Job Description/ Tech Stack (In Short)
                </label>
                <Textarea
                  placeholder="Ex. React, Angular, NodeJs, MySql etc"
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Years of Experience
                </label>
                <Input
                  placeholder="2"
                  type="number"
                  max="50"
                  required
                  value={jobExperience}
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
            </div>

            {isLoading && (
              <div className="p-4 bg-blue-50 rounded-lg mt-4">
                <p>Generating questions...</p>
              </div>
            )}

            <div className="flex gap-5 justify-end mt-6">
              <Button 
                variant="ghost" 
                type="button" 
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading? 
                <>
                <LoaderCircle className='animate-spin'/>"Generate Questions"</>:"start interview"
                }
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;