import pool from "../database/config.js";
import { BadRequestError, InternalError, NotFoundError } from "../utils/error.js";
import {extname,join} from "path"
import fs from "fs"

class FilesService {
    constructor() {}

    async PostVideo(body,files){
        const {title , userId} = body
        const {file}  = files

        const FoundUser = await pool.query("Select * from users where id  = $1",[userId])
        if(FoundUser.rows.length === 0){
            throw new NotFoundError(404,"User id not found")
        }

        let ExistsVedioType = [".mp4",".webm",".mpeg",".avi",".mkv",".m4v",".ogm",".mov",".mpg"]

        if(!ExistsVedioType.includes(extname(file.name))){
            throw new BadRequestError(400,"Please upload video format")
        }
        const NewUserId = Number(userId)
        const filename = Date.now() + extname(file.name)
        const path = join(process.cwd(),"src","uploads","videos",filename)

        const size = (file.size / 1024 / 1024).toFixed(2)

        await pool.query("insert into files(title,file_name,size,user_id) values($1,$2,$3,$4)",
            [title,filename,size,NewUserId])

            file.mv(path, (err)=>{
                if(err){
                    throw err
                }
          })
    }

    async GetVideoInfo(params){
        const {id}  = params

        const FoundUser = await pool.query("Select * from files where user_id = $1",[id])

        if(FoundUser.rows.length === 0){
            throw new NotFoundError(404,"User not found")
        }

        return {
            file:FoundUser.rows
        }
    }

    async DeleteVideoById(user,params){
        const {id} = params
        const existFiles = await pool.query("Select * from files where id=$1",[id])
        if(existFiles.rows.length === 0){
            throw new NotFoundError(404,"Videos not found")
        }

        const FilesInfo = await pool.query("Select * from files where id = $1 and user_id =$2",[id,user.id])
        
        if(FilesInfo.rows.length === 0){
            throw new NotFoundError(404,"Not found files belong to user")
        }

        await pool.query("Delete from files where id = $1 and user_id =$2 ",[id,user.id])

        fs.unlink(join(process.cwd(),"src","uploads","videos",FilesInfo.rows[0].file_name),(err) => {
            if(err){
                throw new InternalError(500,"Something wrong during delete files from uploads folder")
            }
        })
    }

    async UpdateVidoeById(user,params,body){
        const {id} = params
        const {title}  = body
        const existsFile = await pool.query("Update files set title = $1 where id = $2 and user_id = $3 returning *",
            [title,id,user.id]
        )

        if(existsFile.rows.length === 0){
            throw new NotFoundError(404,"files not found belong to users")
        }
    }

    async SearchVideo(body){
        const {data} = body
        const JoinData = await pool.query("Select  f.title , f.size , f.created_at , f.file_name from users as u inner join files as f on u.id  = f.user_id where u.username ilike $1 or f.title ilike $2",[`%${data}%`,`%${data}%`])


        if(JoinData.rows.length === 0){
            throw new NotFoundError(404,`not found data about ${data}`)
        }

        return {
            found:JoinData.rows 
        }
    }
}

export default new FilesService()