import { Server } from "socket.io"
import * as cookie from 'cookie'
import jwt, { JwtPayload } from 'jsonwebtoken'

const onlineUsers = new Map()

const StatusSocket =(io: Server)=>{
   
   io.on("connection", (socket)=>{
      try{
        const rowCookie =  socket.handshake.headers.cookie || ""
        const cookies = cookie.parse(rowCookie)
        const accessToken = cookies.accessToken || socket.handshake.auth?.token || socket.handshake.query?.token

        if(!accessToken)
          throw new Error("Access token not found")

          const user = jwt.verify(accessToken, process.env.AUTH_SECRET!) as JwtPayload
          onlineUsers.set(socket.id, user)
          socket.join(user.id)

         
          const getUniqueUsers = () => {
             const users = Array.from(onlineUsers.values())
             return Array.from(new Map(users.map(u => [String(u.id), u])).values())
          }

          io.emit("online", getUniqueUsers())

          socket.on("get-online", ()=>{
             io.emit("online", getUniqueUsers())
          })

          socket.on("disconnect", ()=>{
             onlineUsers.delete(socket.id)
             io.emit("online", getUniqueUsers())
          })
      }
      catch(err)
      {
         if(err instanceof Error)
         {
            console.log(err.message)
            socket.disconnect()
         }
      }
     
   })
}
export default StatusSocket