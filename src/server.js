import express from "express"
import { config } from "dotenv"
import UserRouter from "./routes/users.route.js"
import fileUpload from "express-fileupload"
import fs from "fs"
import {join} from "path"
import FilesRouter from "./routes/files.route.js"
config()


const server = express()

server.use(fileUpload())

server.use(express.json())
server.use(UserRouter)
server.use(FilesRouter)

server.use((error,req,res,next) => {
    if(error.status && error.status < 500){
        return res.status(error.status).json({
            status:error.status,
            message:error.message,
            name:error.name
        })
    }else{
        let errorText = `\n[${new Date()}]--${req.method}--${req.url}--${req.message}`
        fs.appendFileSync(join(process.cwd(),"src","logs","error.txt"),errorText)

        return res.status(500).json({
            status:500,
            message:error.message,
            path:error.stack
        })
    }
})

server.listen(process.env.PORT, ()=> console.log("Sever is running " + process.env.PORT))