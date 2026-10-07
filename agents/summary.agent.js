import llm from "../config/llm.js";
import summaryPrompt from "../prompts/summary.prompts.js";




export const summaryAgent = async (data) => {
    try {
        const prompt = summaryPrompt(data)
        const response = await llm.invoke(prompt)
        const cleaned = response.content.replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();

        return JSON.parse(cleaned)

    } catch (error) {
        console.log("summary agent pasrse error")
        console.log(response.content);
        throw new Error("failed to generate summary")

    }
}