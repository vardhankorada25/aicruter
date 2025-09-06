import React from 'react'
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft,ArrowRight, Calendar, Clock, Copy, List, Mail } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link'; //



function InterviewLink({ interview_id, formData }) {
  console.log(interview_id)
  const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
  const GetInterviewUrl=()=>{
     
     return url;
  }
  const onCopyLink=async()=>{
    await navigator.clipboard.writeText(url)
    toast("Link copied")
  }
  return (
    <div className=' flex flex-col items-center justify-center mt-10'>
      <Image
        src={'/checkicone.png'}
        alt='check'
        width={50}
        height={50}
        className='mb-4'
      />
      <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
      <p className='text-center mt-3'>
        Share this link with your candidates to start the interview process
      </p>

      <div className='w-full p-7 mt-6 rounded-xl bg-white '>
         <div className='flex item-center justify-between'>
            <h2 className='font-bold'>Interview Link</h2>
            <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-4xl'> Valid for 30 days</h2>
         </div>
         
          <div className='mt-3 flex gap-3 item-center'>
            <Input defaultValue={GetInterviewUrl()} disabled={true}/>
            <Button onClick={()=>onCopyLink()}><Copy/> Copy Link</Button>
          </div>
          <hr className='my-7' />
          <div className='flex gap-5'>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'>
                  <Clock className='h-4 w-4'/> {formData?.duration} mins
                </h2>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'>
                  <List className='h-4 w-4'/> {formData?.question?.length} Questions
                </h2>
            {/* <h2 className='text-sm tex-gray-500 felx gap-2 item-center'> <Calendar  className='h-4 w-4'/>  {formData?.duration}</h2> */}
          </div>
         
          
      </div>
         <div className='mt-7 bg-white p-5 rounded-lg w-full '>
            <h2 className='font-bold'>Share Via</h2>
              <div className='flex gap-5'>
                    <Button variant={'outline'}><Mail/> Email</Button>
                    <Button variant={'outline'}><Mail/> Slack</Button>
                    <Button variant={'outline'}><Mail/> Whatsapp</Button>
              </div>
          </div>
            <div className='flex justify-between mt-6 w-full'>
                  <Button asChild variant="outline">
                    <Link href="/dashboard">
                      <ArrowLeft className="mr-2" />
                      Back to Dashboard
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/create-interview">
                      Create New Interview
                      <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
              </div>
    </div>
  )
}

export default InterviewLink
