import { Server } from "socket.io"

const VideoSocket = (io: Server) => {
  io.on("connection", (socket) => {

    socket.on("offer", ({ offer, to, socketId, from, type}) => {
      from.socketId = socket.id
      if (to) io.to(to).emit("offer", { offer, from, type })
      if (socketId && socketId !== to) io.to(socketId).emit("offer", { offer, from, type })
    })

    socket.on("candidate", ({candidate, to, socketId})=>{
       if (to) io.to(to).emit("candidate", {candidate, from: socket.id})
       if (socketId && socketId !== to) io.to(socketId).emit("candidate", {candidate, from: socket.id})
    })

    socket.on("answer", ({answer, to, socketId})=>{
       if (to) io.to(to).emit("answer", {answer, from: socket.id})
       if (socketId && socketId !== to) io.to(socketId).emit("answer", {answer, from: socket.id})
    })

    socket.on("end", ({to, socketId})=>{
      if (to) io.to(to).emit("end", {from: socket.id})
      if (socketId && socketId !== to) io.to(socketId).emit("end", {from: socket.id})
    })
    
  })
}
export default VideoSocket