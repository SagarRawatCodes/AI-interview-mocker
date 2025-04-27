
"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { use } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const RecordAnsSection = dynamic(() => import('./_components/RecordAnsSection'), { ssr: false });


function StartInterview({ params }) {
  const { interviewId } = use(params);
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);
 

  useEffect(() => {
    GetInterviewDetails(); 
  }, []);

  
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
  
    const rawJson = result[0]?.JsonMockResp;
  
    if (!rawJson) {
      throw new Error("No interview data found");
    }
  
    try {
      // Attempt to clean and convert the invalid object-like structure into a JSON array
      // Remove leading and trailing braces
      let cleanedJson = rawJson.trim();
      if (cleanedJson.startsWith('{') && cleanedJson.endsWith('}')) {
        cleanedJson = cleanedJson.slice(1, -1); // remove { }
      }
  
      // Wrap the comma-separated strings with brackets to turn into array
      cleanedJson = `[${cleanedJson}]`;
  
      // Parse into array of strings
      const parsedStringArray = JSON.parse(cleanedJson);
      console.log(parsedStringArray);
  
      // Then parse each string into actual objects
      const finalData = parsedStringArray.map((item, index) => {
        try {
          return JSON.parse(item);
        } catch (e) {
          console.error(`Error parsing item ${index}:`, e);
          return null;
        }
      }).filter(Boolean);
  
      setMockInterviewQuestion(finalData);
      console.log(finalData);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error parsing fixed JsonMockResp:", error);
    }
  };


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
     <QuestionsSection mockInterviewQuestion={mockInterviewQuestion}
     activeQuestionIndex={activeQuestionIndex}/>

    
{interviewData && (
  <RecordAnsSection
    mockInterviewQuestion={mockInterviewQuestion}
    activeQuestionIndex={activeQuestionIndex}
    interviewData={interviewData}
  />
)}
     </div>

     <div className="flex justify-end gap-6">
      {activeQuestionIndex>0 &&
      <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
      {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
      <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
      {activeQuestionIndex==mockInterviewQuestion?.length-1&&
      <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}><Button>End Interview</Button>
      </Link>}
     </div>
    </div>
  );
}

export default StartInterview;

