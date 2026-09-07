import { CorsOptions } from "cors"

const allowedOrigins = [
  "https://besties-seven.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:8080"
]

if (process.env.CLIENT) {
  const envOrigin = process.env.CLIENT.replace(/\/$/, "")
  if (!allowedOrigins.includes(envOrigin)) {
    allowedOrigins.push(envOrigin)
  }
}

const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      return callback(null, true)
    }
    return callback(null, true)
  },
  credentials: true
}

export default corsConfig