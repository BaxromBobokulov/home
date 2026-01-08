import usersService from "../services/users.service.js";

class UserController {
    constructor() {}

    async Register(req,res){
        try {
            // console.log(req.body,req.files)
            const data = await usersService.Register(req.body,req.files)
            res.status(200).json({
                status:200,
                message:"Registered susseccfully"
            })
            
        } catch (error) {
            res.status(409).json({
                status:409,
                message:error.message
            })
        }
    }

    async Login(req,res){
        try {
            const data = await usersService.Login(req.body,req.files)
            res.status(200).json({
                status:200,
                message:"Login susseccfully",
                token:data.accessToken || "token not exists"
            })
            
        } catch (error) {
            res.status(409).json({
                status:409,
                message:error.message
            })
        }
    }

    async toGetImg(req,res){
        try {
            const data = await usersService.ToGetImage(req.params)
            res.sendFile(data)
        } catch (error) {
            res.status(400).json({
                status:400,
                message:error.message
            })
        }
    }

    async GettAll(req,res) {
        try {
            const data = await usersService.GetAll()
            res.status(200).json({
                status:200,
                data:data
            })
        } catch (error) {
            res.status(400).json({
                status:400,
                message:error.message
            })
        }

    }

}

export default new UserController()