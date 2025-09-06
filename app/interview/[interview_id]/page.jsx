"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Video, Loader2Icon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from "@/services/superbaseClient";
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation'

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setInterviewInfo] = useContext(InterviewDataContext); // Only need setInterviewInfo
  const router = useRouter();

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetails();
    }
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from('interview')
        .select("jobPosition,jobDescription,duration,type")
        .eq('interview_id', interview_id);
      
      if (error || !Interviews || Interviews.length === 0) {
        toast("Incorrect Interview Link");
        setLoading(false);
        return;
      }
      setInterviewData(Interviews[0]);
    } catch (e) {
      toast("Incorrect Interview Link");
    } finally {
      setLoading(false);
    }
  };

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews, error } = await supabase
      .from('interview')
      .select("*")
      .eq('interview_id', interview_id);

    if (error) {
      console.error("Error fetching full interview data:", error);
      toast("Failed to join interview. Please try again.");
      setLoading(false);
      return;
    }
    
    // Set the interview information in the global context
    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: Interviews[0]
    });

    // Navigate to the start page
    router.push('/interview/' + interview_id + '/start');
    setLoading(false);
  };

  if (loading || !interviewData) {
    return <div className="min-h-screen flex items-center justify-center">
      <Loader2Icon className="animate-spin h-10 w-10 text-blue-500" />
    </div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-10 md:px-28 lg:px-28 xl:px-80 mt-10">
      <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto border rounded-lg bg-white pb-10 p-6">
        <Image src="/logo.png" width={100} height={10} className="w-[180px] mb-2" alt="logo" />
        <div className="text-sm text-gray-600 mb-3">AI-Powered Interview Platform</div>
        <Image
          src="/interview.png"
          width={300}
          height={180}
          className="w-[215px] mb-2"
          alt="Interview"
        />
        <h2 className="font-bold text-xl mt-2 mb-1 text-center">{interviewData?.jobPosition}</h2>
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
          <Clock className="h-5 w-5" />
          {interviewData?.duration} Min
        </div>
        <div className="w-full mb-2">
          <label className="text-sm font-medium block mb-1" htmlFor="fullname">
            Enter your full name
          </label>
          <Input
            id="fullname"
            placeholder="e.g. Jhon Smith"
            className="placeholder-gray-400 w-full" onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="w-full mb-4">
          <label className="text-sm font-medium block mb-1" htmlFor="email">
            Enter your Email
          </label>
          <Input
            id="email"
            placeholder="e.g. jhon@gmail.com"
            className="placeholder-gray-400 w-full" onChange={(event) => setUserEmail(event.target.value)}
            type="email"
          />
        </div>
        <div className="w-full bg-blue-100 border-l-4 border-blue-400 rounded-lg p-4 mb-6 text-sm">
          <div className="font-semibold text-blue-900 mb-1">Before you begin</div>
          <ul className="pl-2 text-blue-900">
            <li>- Test your camera and microphone</li>
            <li>- Ensure you have a stable internet connection</li>
            <li>- Find a Quiet place for interview</li>
          </ul>
        </div>
        <Button className="mt-0 w-full font-bold flex items-center justify-center gap-2 h-12 bg-blue-400 hover:bg-blue-500" disabled={loading || !userName || !userEmail}
          onClick={onJoinInterview}>
          <Video className="mr-2" /> {loading && <Loader2Icon className="animate-spin" />} Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;