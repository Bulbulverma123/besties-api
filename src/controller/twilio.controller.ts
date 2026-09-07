import { Request , Response} from 'express'
import twilio from 'twilio'

const fallbackIceServers = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" }
]

export const getTurnServer = async(req: Request, res: Response) =>{
    try{
        if (process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN) {
          const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
          const { iceServers } = await client.tokens.create()
          return res.json(iceServers && iceServers.length > 0 ? iceServers : fallbackIceServers)
        }
        res.json(fallbackIceServers)
    }
    catch(err)
    {
        console.log("Twilio turn server fallback:", err)
        res.json(fallbackIceServers)
    }
}