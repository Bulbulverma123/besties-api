// import { Request, Response } from "express"
// import Razorpay from "razorpay"
// import { CatchError, TryError } from "../util/error"
// import crypto from 'crypto'
// import fs from 'fs'

// const razorpay =  new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })

// export const createOrder = async(req: Request, res: Response)=>{
//     try{
//         const amount = req.body?.amount
//         if(!amount)
//             throw TryError("Amount is required", 400)

//         const payload = {
//             amount: (amount*100),
//             currency: process.env.CURRENCY!,
//             receipt: `rcp_${Date.now()}`
//         }

//      const order = await razorpay.orders.create(payload)
//      res.json(order)
//     }
//     catch(err)
//     {
//         CatchError(err, res, "Failed to create order")
//     }
// }


// // export const webhook = async(req: Request, res: Response) =>{
// //   try{  
// //       console.log("SECRET being used:", process.env.RAZORPAY_SECRET)
// //       console.log("Body type:", typeof req.body, "Is Buffer:", Buffer.isBuffer(req.body))
      
// //       const signature = req.headers['x-razorpay-signature']
      
// //       if(!signature)
// //         throw TryError("Invalid request",400)

// //       const rawBody = req.body
// //       const generateSignature = crypto
// //         .createHmac('sha256', process.env.RAZORPAY_SECRET!)
// //         .update(rawBody)
// //         .digest('hex')

// //       console.log("Received:", signature)
// //       console.log("Generated:", generateSignature)

// //       if(signature !== generateSignature)
// //         throw TryError("Invalid request",400)

// //       fs.writeFileSync("Payment.json", rawBody.toString())

// //       res.json({message: "Payment success"})
// //   }
// //   catch(err: any)
// //   {
// //     console.log(err.message)
// //     CatchError(err, res, "Failed to process webhook")
// //   }
// // }

// export const webhook = async(req: Request, res: Response) =>{
//   try{  
    
//       const signature = req.headers['x-razorpay-signature']

//       if(!signature)
//         throw TryError("Invalid request", 400)

//       const body = req.body // Buffer, kyunki index.ts mein express.raw() laga hai
//       const payload = JSON.parse(body.toString())

//       const generateSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_SECRET!)
//         .update(body)
//         .digest('hex')

//        if(signature !== generateSignature)
//         throw TryError("Invalid signature", 400)
     
//        fs.writeFileSync("Payment.json", JSON.stringify(payload, null, 2))

//        if(body.event === "payment.authorized" && process.env.NODE_ENV === "dev")
//        {
//         console.log("payment success for dev  server")
//        }

//        if(body.event === "payment.captured" && process.env.NODE_ENV === "prod")
//        {
//         console.log("payment success for prod server")
//        }

//         if(body.event === "payment.failed")
//        {
//         console.log("payment failed")
//        }
      
//        res.json({message: "Payment success"})
//   }
//   catch(err)
//   {
//      CatchError(err, res, "Failed to process webhook")
//   }
// }


import { Request, Response } from "express"
import Razorpay from "razorpay"
import { CatchError, TryError } from "../util/error"
import crypto from 'crypto'
import fs from 'fs'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const createOrder = async (req: Request, res: Response)=>{
    try {
        const amount = req.body?.amount
        if(!amount)
            throw TryError("Amount is required", 400)

        const payload = {
            amount: (amount*100),
            currency: process.env.CURRENCY!,
            receipt: `rcp_${Date.now()}`
        }

        const order = await razorpay.orders.create(payload)
        res.json(order)
    }
    catch(err)
    {
        CatchError(err, res, "Failed to create order")
    }
}

export const webhook = async (req: Request, res:  Response)=>{
    try {
        const body = req.body
        const signature = req.headers['x-razorpay-signature']

        if(!signature)
            throw TryError("Invalid request", 400)

        const payload = JSON.stringify(body)
        const generateSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET!).update(payload).digest('hex')

        if(signature !== generateSignature)
            throw TryError("Invalid request", 400)

        fs.writeFileSync("payment.json", JSON.stringify(body, null, 2))

        if(body.event === "payment.authorized" && process.env.NODE_ENV === "dev")
        {
            console.log("Payment success for dev server")
        }

        if(body.event === "payment.captured" && process.env.NODE_ENV === "prod")
        {
            console.log("Payment success for prod server")
        }

        if(body.event === "payment.failed")
        {
            console.log("Payment failed")
        }

        res.json({message: "Payment success"})
    }
    catch(err)
    {
        CatchError(err, res, "Failed to process webhook")
    }
}