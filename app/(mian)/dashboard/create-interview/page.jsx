'use client'
import { Progress } from '@/components/ui/progress'; 
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FormConatiner from './_components/formconatainer'
import QuestionList from './_components/QuestionList'
import InterviewLink from './_components/InterviewLink'
import React, { useState } from 'react'
import { toast } from 'sonner';
import {useUser} from '@/app/provider'
function CreateInterview() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [interviewId,setinterviewId]=useState();
    const {user}=useUser();
   const [formData, setFormData] = useState({
    jobPosition: '',
    jobDescription: '',
    duration: '',
    type: '',
  }); 
    
    const onHandleInputChange = (field, value) => {
         setFormData(prev => ({
            ...prev,
            [field]: value
         }))
         console.log('Updated formData:', formData);
    }

    const onGoToNext = () => {
        // console.log('Checking formData:', formData); // Debug log
        if(user?.credits<=0)
        {
            toast('please add credits')
            return ;
        }
        if(!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type) {
            toast("Please fill all the fields");
            return;
        }
        else {
            setStep(step + 1);
            toast("Moving to next step!");
        }
    }
    const onCreateLink=(interview_id)=>{

        setinterviewId(interview_id);
        setStep(step+1);
    }
    return (
        <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-64'> 
            <div className='flex gap-5 '>
                <ArrowLeft 
                    onClick={() => router.back()} 
                    className='cursor-pointer'
                />
                <h2 className='font-bold text-2xl '>Create Interview</h2>
            </div>
            <Progress value={step * 33.33} className="w-full my-5" />
            {step == 1 ? 
                <FormConatiner 
                    onHandleInputChange={onHandleInputChange} 
                    GoToNext={onGoToNext}
                /> :
                step == 2 ? 
                <QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/> : 
                step==3?<InterviewLink  interview_id={interviewId} formData={formData}/>: null
            }
        </div>
    )
}

export default CreateInterview