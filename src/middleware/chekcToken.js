import JWT from "jsonwebtoken"
import { NotFoundError, UnauthorizedError } from "../utils/error.js"
import pool from "../database/config.js"


export default async(req,res,next)=> {
    try {
        const {token} = req.headers
        if(!token){
            throw new UnauthorizedError(401,"Cannot upload video without token")
    }

    const data = JWT.verify(token,process.env.SECRET)

    const FoundUser = await pool.query("Select * from users where id  = $1",[data.id])
    if(FoundUser.rows.length === 0){
        throw new NotFoundError(404,"User not found")
    }

    req.user = data
    next()
    } catch (error) {
        if(error.name == "TokenExpiredError"){
            error.status = 400
            next(400,error.message)
            console.log("Expired error")
        }else{
            next(error)
            console.log("Simple error")
        }
    }
}