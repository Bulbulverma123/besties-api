import { Request, Response } from "express";
import { CatchError, TryError } from "../util/error";
import { downloadObject, isFileExist, uploadDirect, uploadObject } from "../util/s3";

export const downloadaFile = async(req: Request, res: Response) =>{
  try{
     const path = req.body?.path
     if(!path)
        throw TryError('Failed to generate download url because path is missing', 400)
      
     const isExist = await isFileExist(path)

     if(!isExist)
        throw TryError("File doesn't exists", 404)
     
     const url = await downloadObject(path)
     res.json({url})
     
  }
  catch(err){
    CatchError(err, res, "Failed to generate download url")
  }
}

export const uploadFile = async(req:Request, res:Response) =>{
   try{
    const path = req.body?.path
    const type= req.body?.type
    const status = req.body?.status

     if(!path || !type || !status)
        throw TryError("Invalid request path or type is required", 400)

   const url =  await uploadObject(path, type, status)
   res.json({url})
   }
   catch(err){
    CatchError(err, res, "Failed to generate upload url")
  }
}

export const uploadFileDirect = async(req: Request, res: Response) => {
   try {
     const file = req.file
     const path = req.body?.path
     const type = req.body?.type || file?.mimetype || "application/octet-stream"

     if (!file || !path) {
       throw TryError("File and path are required for direct upload", 400)
     }

     const url = await uploadDirect(path, file.buffer, type)
     res.json({ url, path })
   }
   catch (err) {
     CatchError(err, res, "Failed to upload file directly")
   }
}