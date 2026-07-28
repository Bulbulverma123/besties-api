import { Router } from "express";
import { getTurnServer } from "../controller/twilio.controller";
import AuthMiddleware from "../middleware/auth.middleware";
const TwilioRouter = Router()

TwilioRouter.get("/turn-server", AuthMiddleware,  getTurnServer)

export default TwilioRouter