// import dotenv from 'dotenv'
// dotenv.config()

// import mongoose from 'mongoose'
// mongoose.connect(process.env.DB!)

// import express from 'express'
// import { createServer } from 'http'
// import {Server} from 'socket.io'
// import cors from 'cors'
// import AuthRouter from './router/auth.router'
// import cookieParser from 'cookie-parser'
// import StorageRouter from './router/storage.router'
// import AuthMiddleware from './middleware/auth.middleware'
// import FriendRouter from './router/friend.router'
// import SwaggerConfig from './util/swagger'
// import { serve, setup } from 'swagger-ui-express'
// import StatusSocket from './socket/status.socket'
// import corsConfig from './util/cors'
// import ChatSocket from './socket/chat.socket'
// import ChatRouter from './router/chat.router'
// import VideoSocket from './socket/video.socket'
// import TwilioRouter from './router/twilio.router'
// import PaymentRouter from './router/payment.router'

// const app = express()
// const server  = createServer(app)

// //Socket connection
// const io = new Server(server, {cors: corsConfig})
// StatusSocket(io)
// ChatSocket(io)
// VideoSocket(io)


// // ✅ 1. Middleware FIRST
// app.use(cors(corsConfig))
// app.use(cookieParser())
// app.use(express.json())
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// // ✅ 2. Routes(Endpoint) AFTER middleware
// app.use("/api-docs", serve, setup(SwaggerConfig))
// app.use("/auth", AuthRouter)
// app.use("/storage",AuthMiddleware, StorageRouter)
// app.use("/friend",AuthMiddleware, FriendRouter)
// app.use("/chat", ChatRouter)
// app.use("/twilio", TwilioRouter)
// app.use("/payment", PaymentRouter)


// // ✅ 3. Listen LAST
// server.listen(
//     process.env.PORT || 8080,
//     () => console.log(`Server is running on port ${process.env.PORT}`)
// )




import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB!)

import express from 'express'
import { createServer } from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import AuthRouter from './router/auth.router'
import cookieParser from 'cookie-parser'
import StorageRouter from './router/storage.router'
import AuthMiddleware from './middleware/auth.middleware'
import FriendRouter from './router/friend.router'
import SwaggerConfig from './util/swagger'
import { serve, setup } from 'swagger-ui-express'
import StatusSocket from './socket/status.socket'
import corsConfig from './util/cors'
import ChatSocket from './socket/chat.socket'
import ChatRouter from './router/chat.router'
import VideoSocket from './socket/video.socket'
import TwilioRouter from './router/twilio.router'
import PaymentRouter from './router/payment.router'
import PostRouter from './router/post.router'

const app = express()
const server  = createServer(app)

//Socket connection
const io = new Server(server, {cors: corsConfig})
StatusSocket(io)
ChatSocket(io)
VideoSocket(io)


// ✅ 1. Middleware FIRST
app.use(cors(corsConfig))
app.use(cookieParser())

//app.use("/payment/webhook", express.raw({ type: "application/json" }))
app.use(express.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ✅ 2. Routes(Endpoint) AFTER middleware
app.use("/api-docs", serve, setup(SwaggerConfig))
app.use("/auth", AuthRouter)
app.use("/storage",AuthMiddleware, StorageRouter)
app.use("/friend",AuthMiddleware, FriendRouter)
app.use("/chat", ChatRouter)
app.use("/twilio", TwilioRouter)
app.use("/payment", PaymentRouter)
app.use("/post", AuthMiddleware, PostRouter)


// ✅ 3. Listen LAST
server.listen(
    process.env.PORT || 8080,
    () => console.log(`Server is running on port ${process.env.PORT}`)
)




