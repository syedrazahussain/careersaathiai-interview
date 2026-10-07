import { END, START, StateGraph } from "@langchain/langgraph";
import InterviewState from "./state.js";
import { feedbackNode, interviewNode, summaryNode } from "./node.js";
import { interviewAgent } from "../agents/interview.agents.js";
import { feedbackAgent } from "../agents/feedback.agent.js";
import { summaryAgent } from "../agents/summary.agent.js";



function router(state) {
    switch (state.action) {
        case "start":
            return "interviewAgent";

        case "feedback":
            return "feedbackAgent";

        default:
            return END;
    }
}

function feedbackRouter(state) {
    if (state.completed) {
        return "summaryAgent";
    }
    return END;
}

const graph = new StateGraph(InterviewState)

    //nodes

    .addNode("interviewAgent", interviewNode)
    .addNode("feedbackAgent", feedbackNode)
    .addNode("summaryAgent", summaryNode)

    //condition start
    .addConditionalEdges(
        START,
        router,
        {
            interviewAgent: "interviewAgent",
            feedbackAgent: "feedbackAgent",

        }
    )

    .addEdge(
        "interviewAgent",
        END
    )

    .addConditionalEdges(
        "feedbackAgent",
        feedbackRouter,
        {
            summaryAgent:"summaryAgent",
            [END]:END
        }
    )

    .addEdge(
        "summaryAgent",
        END
    )

    .compile()

    export default graph
