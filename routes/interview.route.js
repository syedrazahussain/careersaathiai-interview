import express from "express"
import { getAllInterview, getInterview, startInterview, submitAnswer } from "../controllers/interview.controller.js";

const interviewRouter = express.Router();

interviewRouter.post("/start",startInterview)

interviewRouter.post("/answer",submitAnswer)

interviewRouter.get("/all",getAllInterview)

interviewRouter.get("/:id",getInterview)


export default interviewRouter