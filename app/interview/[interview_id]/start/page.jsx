  "use client"

  import { InterviewDataContext } from '@/context/InterviewDataContext'
  import { Mic, Phone, Timer } from 'lucide-react';
  import React, { useContext, useEffect, useState } from 'react'
  import Image from 'next/image';
  import Vapi from '@vapi-ai/web';
  import { supabase } from "@/services/superbaseClient";
  import { useParams } from 'next/navigation'
  import AlertConformation from './_components/AlertConformation'
  import { toast } from 'sonner';
  import axios from 'axios';
  import { useRouter } from 'next/navigation';


  function StartInterview() {
    const [interviewInfo, setInterviewInfo] = useState();
    const[interview,setInterview]=useContext(InterviewDataContext);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    const { interview_id } = useParams();
    const [activeUser,setActiveUser]=useState(false)
    const[conversation,setConversation]=useState()
    const router=useRouter();
    const [seconds, setSeconds] = useState(0)    

    // const formatTime = (secs) => {
    //     const hours = String(Math.floor(secs / 3600)).padStart(2, '0');
    //     const minutes = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    //     const seconds = String(secs % 60).padStart(2, '0');
    //     return `${hours}:${minutes}:${seconds}`;
    // };



    // Fetch interview details on mount or when interview_id changes
    useEffect(() => {
      if (interview_id) {
        getDetails();
      }
    }, [interview_id]);
    console.log(interviewInfo)
    const getDetails = async () => {
      let { data: Interviews, error } = await supabase
        .from('interview')
        .select("questionList,jobPosition")
        .eq('interview_id', interview_id);

      if (error) {
        console.error('Error fetching interview details:', error);
      } else {
        setInterviewInfo(Interviews[0]);
      }
    };

    useEffect(() => {
      if (interviewInfo) startCall();
    }, [interviewInfo]);

    const startCall = () => {
      // const questionList = interviewInfo?.questionList?.map(item => item.question).join(",");
      const questionList = interviewInfo?.interviewData?.questionList?.map(item => item.question).join(",");

      const assistantOptions = {
    name: "AI Recruiter",
    firstMessage: "Hi "+ interview?.userName+", how are you? Ready for your interview on "+interviewInfo?.jobPosition,
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: "jennifer",
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages:[
        {
          role: "system",
          content: `
    You are an AI voice assistant conducting interviews.
    Your job is to ask candidates provided interview questions, assess their responses.
    Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
    "Hey there! Welcome to your `+interviewInfo?.jobPosition+` interview, let’s get started with a few questions!"
    Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
    Questions:`+questionList+`
    If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
    "Need a hint? Think about how React tracks component updates!"
    Provide brief, encouraging feedback after each answer. Example:
    "Nice! That’s a solid answer."
    "Hmm, not quite! Want to try again?"
    Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
    After 5–7 questions, wrap up the interview smoothly by summarizing their performance. Example:
    "Great work today! You handled some tough questions well. Keep sharpening your skills!"
    End on a positive note:
    "Thanks for chatting! Hope to see you crushing projects soon!"
    Key Guidelines:
    ✅ Be friendly, engaging, and witty
    ✅ Keep responses short and natural, like a real conversation
    ✅ Adapt based on the candidate’s confidence level
    ✅ Ensure the interview remains focused on React
    `.trim(),
        },
      ]
    },
      }

      vapi.start(assistantOptions)

    };

    const stopInterview = () => {
      vapi.stop();
     setTimeout(() => {
     if (interview_id) router.replace(`/interview/${interview_id}/completed`);
    }, 500);
   };

    
    //   vapi.on("call-start",()=>{
    //   console.log("Call has started")
    //   toast('Call Connected ...')
    // });

    // vapi.on("speach-start",()=>{
    //   console.log("Assistant sppech is stared")
    //   setActiveUser(false);
    // });

    //  vapi.on("speach-start",()=>{
    //   console.log("Assistant sppech has ended")
    //   setActiveUser(true);
    // })

    // vapi.on("call-end",()=>{
    //   console.log("Call has ended")
    //   toast('Interview Ended')
    //   GenerateFeedback()
    // });

    //  vapi.on("message",(message)=>{
    //   console.log(message)
    //   setConversation(message?.conversation)
     
    // });
    useEffect(() => {
    const handleMessage = (message) => {
        console.log('Message:', message);
        if (message?.conversation) {
            const convoString = JSON.stringify(message.conversation);
            console.log('Conversation string:', convoString);
            setConversation(convoString);
        }
    };

    vapi.on("message", handleMessage);



    vapi.on("call-start",()=>{
      console.log("Call has started")
      toast('Call Connected ...')
    });

    vapi.on("speach-start",()=>{
      console.log("Assistant sppech is stared")
      setActiveUser(false);
    });

     vapi.on("speach-end",()=>{
      console.log("Assistant sppech has ended")
      setActiveUser(true);
    })

    vapi.on("call-end",()=>{
      console.log("Call has ended")
      toast('Interview Ended')
      GenerateFeedback()
    });

    // Clean up the listener
    return () => {
        vapi.off("message", handleMessage);
        vapi.off('call-start', ()=>console.log('END'))
        vapi.off('speach-start', ()=>console.log('END'))
        vapi.off('speach-end', ()=>console.log('END'))
        vapi.off('call-end', ()=>console.log('END'))
    };
}, []);

    
     const GenerateFeedback=async()=>{
        const result=await axios.post('api/ai-feedback',{
          conversation:conversation
        });
        console.log(result?.data)
        const Content=result.data.content
        const FINAL_CONTENT=Content
        .replace(/```json\n?/g, '')  
        .replace(/```\n?/g, '')     
        .replace(/^[^{[]*/, '')     
        .replace(/[^}\]]*$/, '')     
        .trim();
        console.log(FINAL_CONTENT);
        const { data, error } = await supabase
            .from('interview feedback')
            .insert([
              { userName: interviewInfo?.userName,
                userEmail: interviewInfo?.userEmail,
                interview_id:interview_id,
                feedback:JSON.parse(FINAL_CONTENT),
                recommendation:false,
               },
            ])
            .select()
            router.replace(`/interview/${interview_id}/completed`);
     }
    return (
      <div className='p-20 lg:px-48 xl:px-56'>
        <h2 className='font-bold text-xl flex justify-between'>
          AI Interview Session
         <span className='flex gap-2 items-center'>
          <Timer />
          00:00
          {/* {formatTime(seconds)} */}
        </span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-8'>
          <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
            <div className='relative'>
            {!activeUser && <span  className='absolute inset-0 rounded-full bg-blue-500 opacity-75  animate-ping'/>}
            <Image src={'/ai.png'} alt='ai' width={100} height={100} className='w-[60px] h-[60px] rounded-full object-cover' />
            </div>
            <h2>AI Recruiter</h2>
          </div>
          <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
            <div className='relative'>
            {activeUser && <span  className='absolute inset-0 rounded-full bg-blue-500 opacity-75  animate-ping'/>}
            <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-6'>{interview?.userName?.[0]}</h2>
            </div>
            <h2>{interview?.userName}</h2>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-5 mt-5'>
          <div className='flex items-center gap-5 justify-center'>
            <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
            <AlertConformation stopInterview={()=>stopInterview()}>
                  <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer' />
            </AlertConformation>
            
          </div>
          <h2 className='text-sm text-gray-400 text-center'>Interview in Progress...</h2>
        </div>
      </div>
    )
  }

  export default StartInterview
