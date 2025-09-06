import {FEEDBACK_PROMPT} from '@/services/constants'
import OpenAI from 'openai';
export async function POST(req){
    const { converstaion }=await req.json();
    const FINAL_PROMPT=FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(converstaion))


    try {
        // Validate input
        const openai = new OpenAI({
          baseURL: "https://openrouter.ai/api/v1",
          apiKey: process.env.OPENROUTER_API_KEY,
        });
    
        const completions = await openai.chat.completions.create({
          model: "tngtech/deepseek-r1t2-chimera:free", // Verify this model exists on OpenRouter
          messages: [
            {
              role: "user",
              content: FINAL_PROMPT,
            },
          ],
        });
    
        if (!completions.choices?.[0]?.message?.content) {
          throw new Error("Invalid response from OpenRouter API");
        }
    
        return NextResponse.json(completions.choices[0].message);
      } catch (e) {
        console.error("API Error:", e.message, e.stack);
        return NextResponse.json(
          { error: "Failed to generate questions", details: e.message },
          { status: 500 }
        );
      }

}