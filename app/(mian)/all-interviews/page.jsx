'use client'
import { Video } from 'lucide-react';
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from 'react';
import {supabase} from '@/services/superbaseClient'
import { useUser } from '@/app/provider';
import InterviewCard from '../dashboard/_components/InterviewCard'
function AllInerview() {
 const [interviewList, setInterviewList] = useState([]);
  const {user}=useUser();
  
  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  const GetInterviewList=async()=>{
    let{data:interview,error}=await supabase
     .from('interview')
     .select('*')
     .eq('userEmail',user?.email)
     .order('id',{ascending:false})
      console.log(interview)
      setInterviewList(interview)

  }
  
  return (
    <div>
      <h2 className='font-bold text-xl mb-4'>
        Previously Created Interviews
      </h2>
      {interviewList?.length === 0 && ( 
        <div className='flex flex-col gap-2 items-center bg-white p-4 mt-4 rounded-lg border'> 
          <Video className='h-8 w-8 text-primary mb-2 p-1.5 bg-blue-50 rounded-md' />
          <h2 className='font-semibold text-base mb-1'>You don't have any interview created</h2>
          <Button className='text-sm px-4 py-2'>+ Create Interview</Button>
        </div>
      )}
      {interviewList &&
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
            {interviewList.map((interview,index)=>(
                <InterviewCard interview={interview} key={index}/>
            ))}
        </div>
      }
    </div>
  );
}

export default AllInerview