import llm from "../config/llm.js"
import hrInterviewPrompt from "../prompts/hrInterview.prompts.js"
import technicalInterviewPrompt from "../prompts/technicalInterview.prompts.js"



export const interviewAgent = async (data) => {
    try {
        const prompt = data?.type.toLowerCase() === "hr" ? hrInterviewPrompt(data) : technicalInterviewPrompt(data)
        const response = await llm.invoke(prompt)
        const cleaned = response.content.replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();

        return JSON.parse(cleaned)

    } catch (error) {
        console.log("Interview agent pasrse error")
        console.log(response.content);
        throw new Error("failed to genrate interview questions")

    }
}