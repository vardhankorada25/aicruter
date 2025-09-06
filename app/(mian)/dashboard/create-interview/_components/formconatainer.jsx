import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewTypes } from "@/services/constants"
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
function FormContainer({onHandleInputChange, GoToNext}) {
         const [interviewType,setinterviewType] =useState([]);
         useEffect(()=>{
           if(interviewType)
           {
              onHandleInputChange('type', interviewType)
           }
         },[interviewType])
         const AddInterviewType = (type) => {
            const data=interviewType.includes(type)
            if (!data)
            {
                setinterviewType(prev => [...prev, type])
            }
            else{
              const result=interviewType.filter((item) => item !== type);
              setinterviewType(result)
            }
        }
  return (
    <div className='p-5 bg-white rounded-2xl'>
        <div>
            <h2 className='text-sm font-medium mb-2'>Job Position</h2>
            <Input placeholder='e.g. Full Stack Developer' className='mt-2' onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)} />
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium mb-2'>Job Description</h2>
            <Textarea placeholder='Enter details of Job description' className='h-[200px] mt-2' onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}/>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium mb-2'>Interview Duration</h2>
            <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Min</SelectItem>
                <SelectItem value="15">15 Min</SelectItem>
                <SelectItem value="30">30 Min</SelectItem>
                <SelectItem value="45">45 Min</SelectItem>
                <SelectItem value="60">60 Min</SelectItem>
              </SelectContent>
            </Select>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium mb-2'>Interview Type</h2>
            <div className='flex gap-3 flex-wrap mt-2'>
                {InterviewTypes.map((type, index) => (
                    <div key={index} className={`flex items-center gap-2 mt-2 bg-white border border-gray-200 rounded-2xl p-2 cursor-pointer hover:bg-secondary ${interviewType.includes(type.tittles)&& 'bg-blue-100 text-primary'} `} onClick={()=>AddInterviewType(type.tittles)}>
                    <type.icon className='text-primary' />
                    <span className='text-sm'>{type.tittles}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className='mt-7 flex justify-end' onClick={()=>GoToNext()}>
          <Button className='cursor-pointer'>Generate Question <ArrowRight></ArrowRight></Button>
        </div>
    </div>
  )
}

export default FormContainer