  'use client'
  import { useUser } from '@/app/provider'
  import { Video } from 'lucide-react';
  import React, { useEffect, useState } from 'react'
  import { Button } from "@/components/ui/button";
  import InterviewCard from '../dashboard/_components/InterviewCard'
  import {supabase} from'@/services/superbaseClient'

  function ScheduledInterview() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
      async function GetInterviewList() {
        if (!user) return;
        const result = await supabase
          .from('interview')
          .select('jobPosition, duration, interview_id, interview-feedback(userEmail)')
          .eq('userEmail', user?.email)
          .order('id', { ascending: false });
          setInterviewList(result.data)
      }
      GetInterviewList();
    }, [user]);

    return (
      <div className='mt-5'>
        <h2 className='font-bold text-xl'>
          Interview List with candidate feedback
        </h2>

        <div>
          {/* <h2 className='font-bold text-xl mb-4'>
            Previously Created Interviews
          </h2> */}
          {interviewList?.length === 0 && (
            <div className='flex flex-col gap-2 items-center bg-white p-4 mt-4 rounded-lg border'>
              <Video className='h-8 w-8 text-primary mb-2 p-1.5 bg-blue-50 rounded-md' />
              <h2 className='font-semibold text-base mb-1'>You don't have any interview created</h2>
              <Button className='text-sm px-4 py-2'>+ Create Interview</Button>
            </div>
          )}
          {interviewList?.length > 0 &&
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
              {interviewList?.map((interview, index) => (
                <InterviewCard interview={interview} key={index}  viewDetail={true} />
              ))}
            </div>
          }
        </div>
      </div>
    )
  }

  export default ScheduledInterview
