import { Router } from "express"
import multer from "multer"
import { downloadaFile, uploadFile, uploadFileDirect } from "../controller/storage.controller"

const upload = multer({ storage: multer.memoryStorage() })
const StorageRouter = Router()

StorageRouter.post("/download", downloadaFile)
StorageRouter.post("/upload", uploadFile)
StorageRouter.post("/upload-direct", upload.single("file"), uploadFileDirect)

export default StorageRouter