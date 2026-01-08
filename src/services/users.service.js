import pool from "../database/config.js";
import {join,extname} from "path"
import JWT from "jsonwebtoken"
import { config } from "dotenv";
import bcrypt from "bcrypt"
config()

class UserService {
    constructor() {}

    async Register(body,files){
        const {username,password} = body
        const {file} = files

        const filename = Date.now() + extname(file.name)
        const path = join(process.cwd(),"uploads",filename)
        
        const existsUsername = await pool.query("Select * from users where username = $1",[username])
        if(existsUsername.rows.length != 0){
            const error  = new Error("This username already taken")
            error.statusCode = 409
            throw error
        }

        await file.mv(path)

        const passHash = await bcrypt.hash(password,10)

        await pool.query("Insert into users(username,password,avatar) values($1,$2,$3) ",[username,passHash,filename])
    }
 
    async Login(body){
        const {username,password} = body

        const check = await pool.query("Select * from users where username  = $1",[username])
        // console.log(check.rows)
        if(check.rows.length === 0){
            const error  = new Error(" Wrong username please try again")
            error.statusCode = 409
            throw error
        }

        const CheckPas = bcrypt.compare(password,check.rows[0].password)
        if(!CheckPas){
            const error  = new Error(" Wrong password please try again")
            error.statusCode = 409
            throw error
        }
        let FoundUser = await pool.query("Select * from users where username = $1",[username])

        let id = FoundUser.rows[0].id
        let tokenusername = FoundUser.rows[0].username
        return {
            accessToken:JWT.sign({id,tokenusername},process.env.SECRET)
        }
    }

    async ToGetImage(params){
        const {filename} = params
        return (join(process.cwd(),"uploads",filename))
    }

    async GetAll(){
        const data = await pool.query("Select * from users")
        return data.rows
    }

}

export default new UserService()