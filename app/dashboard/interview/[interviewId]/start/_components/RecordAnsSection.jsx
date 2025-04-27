/*
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam'

function RecordAnsSection() {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
    
  return (
    <div className="flex items-center justify-center flex-col">
    <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image src={'/webcam.png'} alt='webcam' width={200} height={200} className='absolute'/>
      <Webcam mirrored={true}
      style={{
        height:300,
        width:300,
        zIndex:10,
      }}/>
    </div>
    <Button variant="outline" className="my-10">Record Answer</Button>
    <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
       
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
      

    </div>
  )
}

<button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      
      <h1 className="mt-4">Recording: {isRecording ? '🎙️ Yes' : '❌ No'}</h1>

      
      <div className="mt-4 bg-gray-100 p-4 rounded w-full max-w-md">
        <h2 className="font-bold mb-2">Transcript:</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
          ))}
          {interimResult && <li className="italic text-gray-500">{interimResult}</li>}
        </ul>
      </div>
      
      </div>
    );
  }
  
  export default RecordAnsSection;
  
export default RecordAnsSection
*/
"use client";
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
import { Button } from '@/components/ui/button';

import { Mic } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { timestamp } from 'drizzle-orm/pg-core';

function RecordAnsSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const [userAnswer,setUserAnswer]=useState('');
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (error) console.error("Speech Recognition Error:", error);
  }, [error]);

  useEffect(()=>{
    results.map((result)=>{
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    })
  },[results])

  useEffect(()=>{
    if(!isRecording && userAnswer.length>10)
    updateUserAnswer();
  },[userAnswer]);


  const StartStopRecording=async()=>{
    if(isRecording){
      stopSpeechToText()
    console.log(userAnswer);
    if(userAnswer?.length<10){
      setLoading(false);
      toast('Error while saving your answer, please record again');
      return ;
    }
  }else{
      startSpeechToText();
    }

  }
  const updateUserAnswer=async()=>{
    console.log(userAnswer);
    setLoading(true);
   const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+", User Answer:"+userAnswer+", Depends on question and user answer for given interview question"+" please give us rating for answer and feeback as area of improvement if any"+"in just 3 to 5 lines to improve it in json format in rating field and feedback feild.";
      const result = await model.generateContent(feedbackPrompt);
      const response = await result.response;
      const text = response.text();

    // Clean and parse the response
    let jsonString = text;
    // Remove markdown code blocks if present
    jsonString = jsonString.replace(/```json|```/g, '').trim();
    console.log(jsonString);
    const jsonFeedbackResp=JSON.parse(jsonString);
    const resp=await db.insert(UserAnswer)
    .values({
      mockIdRef:interviewData?.mockId,
      question:mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns:userAnswer,
      feedback:jsonFeedbackResp?.feedback,
      rating:jsonFeedbackResp?.rating,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      createdAt:timestamp("createdAt").defaultNow(),
    })

    if(resp){
      toast('User Answer recorded successfully')
      setUserAnswer('');
      setResults([]);
    }
    setResults([]);
    
    setLoading(false);


  }

/*
const updateUserAnswer = async () => {
  try {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
    User Answer: ${userAnswer}. 
    Based on the question and answer, please provide a JSON in the format:
    {"rating": number, "feedback": "string (area of improvement in 3-5 lines)"}
    ONLY output the JSON without any extra text.`;

    const result = await model.generateContent(feedbackPrompt);
    const response = await result.response;
    let text = response.text();

    // Clean up - remove markdown ```json blocks if any
    text = text.replace(/```json|```/g, '').trim();
    console.log('Model raw response:', text);

    // Validate if text is parsable
    let jsonFeedbackResp;
    try {
      jsonFeedbackResp = JSON.parse(text);
    } catch (error) {
      console.error('Failed to parse model response:', text);
      toast('Error parsing feedback response. Please try again.');
      setLoading(false);
      return;
    }

    const resp = await db.insert(UserAnswer)
      .values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: timestamp("createdAt").defaultNow(),
      });

    if (resp) {
      toast('User Answer recorded successfully');
    }

    setUserAnswer('');
    setLoading(false);
  } catch (err) {
    console.error('Something went wrong:', err);
    setLoading(false);
    toast('Something went wrong. Please try again.');
  }
};
*/
  return (
    <div className="flex items-center justify-center flex-col">
     
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src="/webcam.png"
          alt="webcam"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: 300,
            zIndex: 10,
          }}
        />
      </div>

      
      <Button disabled={loading}variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecording?
        <h2 className='text-red-600 flex gap-2'>
          <Mic/>'Stop Recording'
        </h2>
        :
        'Record Answer'}
      </Button>
    
      
    </div>
  );
}

export default RecordAnsSection;
