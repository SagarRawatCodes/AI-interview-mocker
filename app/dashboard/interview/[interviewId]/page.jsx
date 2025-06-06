/*"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {
    const [interviewData,setInterviewData]=useState();
    const [webCamEnabled,setWebCamEnabled]=useState(false);
    useEffect(()=>{
        console.log(params.InterviewId)
        GetInterviewDetails();
    },[])

    
    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
        setInterviewData(result[0])
    }
  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl">Lets Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        
      <div className="flex flex-col my-5 w-full">
        <div className='flex flex-col p-5 rounded-lg border gap-5'>
        <h2 className="text-lg"><strong>Job Role/Job Position:</strong>{interviewData?.jobPosition}</h2>
         <h2 className="text-lg"><strong>Job Description/Tech Stack:</strong>{interviewData?.jobDescription}</h2>
          <h2 className="text-lg"><strong>Years of Experience:</strong>{interviewData?.jobExperience}</h2>
      </div>
      <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
        <h2 className="flex gap-2 items-center"><Lightbulb/><strong>Information</strong></h2>
        <h2 className="mt-3 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
      </div>
      </div>
      <div className="my-5">
        {webCamEnabled?<Webcam
        onUserMedia={()=>setWebCamEnabled(true)}
        onUserMediaError={()=>setWebCamEnabled(false)}
        mirrored={true}
        
        style={{
            height:300,
            width:300
        }}
        />
        :
        <>
        <WebcamIcon className="h-72 w-full my--10 p-20 bg-secondary rounded-lg border" />
        <Button className="w-full mt-2 " variant="ghost" onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
        </>
    }
      </div>

      </div>
      <div className="flex justify-end items-end">
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button>Start Interview</Button>
        </Link>
      </div>
     
      
    </div>
  )
}

export default Interview
    
*/

"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  // Unwrap the params Promise using React.use()
  const resolvedParams = React.use(params);
  const interviewId = resolvedParams.interviewId;

  useEffect(() => {
    console.log(interviewId); // Use the unwrapped interviewId
    GetInterviewDetails(interviewId); // Pass the unwrapped interviewId
  }, [interviewId]);

  const GetInterviewDetails = async (currentInterviewId) => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, currentInterviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl">Lets Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div className="flex flex-col my-5 w-full">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>
              {interviewData?.jobDescription}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        <div className="my-5">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my--10 p-20 bg-secondary rounded-lg border" />
              <Button
                className="w-full mt-2 "
                variant="ghost"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;