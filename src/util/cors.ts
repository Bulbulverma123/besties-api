const origin = process.env.CLIENT ? process.env.CLIENT.replace(/\/$/, "") : process.env.CLIENT

const corsConfig ={
     origin: origin,
     credentials: true
}
export default corsConfig