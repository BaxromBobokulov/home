import express from "express"
import { config } from "dotenv"
import UserRouter from "./routes/users.route.js"
import fileUpload from "express-fileupload"
config()


const server = express()

server.use(fileUpload())

server.use(express.json())
server.use(UserRouter)

server.listen(process.env.PORT, ()=> console.log("Sever is running " + process.env.PORT))