"use client"
import { useParams } from 'next/navigation'
import { useUser } from '@/app/provider'
import {supabase} from'@/services/superbaseClient'
import { useEffect, useState } from 'react';
import InterveiwDetailsContainer from './_components/InterveiwDetailsContainer';
import CandidateLIst from './_components/CandidateLIst';

function InterviewDetail() {
    const {interview_id}=useParams();
    const { user } = useUser();
    const [interviewDetail,setInterviewDetail]=useState()
    useEffect(()=>{
      user&&GetInterveiwDetail();
    },[user])
    const GetInterveiwDetail=async()=>{
        const result=await supabase.from('interview')
        .select(`jobPosition,jobDescription,type,questionList,created_at,duration,
            interview_id,interview-feedback(userEmail,userName,feedback,created_at)`)
        .eq('userEmail', user?.email)
        .eq('interview_id',interview_id)
        setInterviewDetail(result?.data[0])
    }
  return (
    <div className='mt-5'>
        <h2 className='font-bold text-2xl'>InterviewDetails</h2>
        <InterveiwDetailsContainer interviewDetail={interviewDetail}/>
        <CandidateLIst candidateList={GetInterveiwDetail?.['interview-feedback']}/>
    </div>
  )
}

export default InterviewDetail