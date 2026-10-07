import llm from "../config/llm.js";
import feedbackPrompt from "../prompts/feeback.prompts.js";



export const feedbackAgent = async (data) => {
    try {
        const prompt = feedbackPrompt(data)
        const response = await llm.invoke(prompt)
        const cleaned = response.content.replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();

        return JSON.parse(cleaned)

    } catch (error) {
        console.log("feedback agent pasrse error")
        console.log(response.content);
        throw new Error("failed to genrate feedback")

    }
}