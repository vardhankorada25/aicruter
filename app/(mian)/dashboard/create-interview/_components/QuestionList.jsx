import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from './QuestionListContainer'
import { supabase } from "@/services/superbaseClient"
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from 'uuid';

function QuestionList({ formData , onCreateLink}) {
  const [loading, setLoading] = useState(false);
  const [questionsList, setQuestionsList] = useState(null);
  const {user}=useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]); 

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", formData);
      console.log("API Response:", result.data.content);
      const Content=result.data.content;
      const FINAL_PROMPT =Content
        .replace(/```json\n?/g, '')  
        .replace(/```\n?/g, '')     
        .replace(/^[^{[]*/, '')     
        .replace(/[^}\]]*$/, '')     
        .trim();
      setQuestionsList(JSON.parse(FINAL_PROMPT).interviewQuestions);
      console.log("API Response:", result.data);
      setLoading(false);
    } catch (e) {
      console.error("Error generating questions:", e.response?.data || e.message);
      toast.error("Failed to generate questions. Please try again.");
      setLoading(false);
    }
  };
    


const onFinish=async ()=>{
  setSaveLoading(true);
      const interview_id=uuidv4();
         const { data, error } = await supabase
          .from('interview')
          .insert([
            { ...formData,
              questionList:questionsList,
              userEmail:user?.email,
              interview_id:interview_id
             },
          ])
          .select()

          const userUpdate= await supabase
              .from('users')
              .update({ credits: Number(user?.credits)-1 })
              .eq('email', 'user?.emai')
              .select()



          setSaveLoading(false);
          onCreateLink( interview_id)
          // console.log(interview_id);
    }

  return (
  <div>
    {loading && (
      <div className="p-5 bg-blue-100 rounded-xl border border-gray-100 flex gap-5 items-center">
        <Loader2Icon className="animate-spin" />
        <div>
          <h2>Generating Questions...</h2>
          <p>Our AI is crafting personalized questions based on your job position</p>
        </div>
      </div>
    )}

    {questionsList && (
      <div>
           <QuestionListContainer questionsList={questionsList}/>
      </div>
    )}
<div className="flex justify-end mt-10">
    <Button onClick={() => onFinish()} disabled={saveLoading}>
      {saveLoading &&  <Loader2 className='animate-spin '/>}
      Create interview link and Finish</Button>
</div>

  </div>
);

}

export default QuestionList;