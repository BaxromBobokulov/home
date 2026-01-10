import usersService from "../services/users.service.js";

class UserController {
    constructor() {}

    async Register(req,res,next){
        try {
            const data = await usersService.Register(req.body,req.files)
            res.status(200).json({
                status:200,
                message:"Registered susseccfully"
            })
            
        } catch (error) {
            next(error)
        }
    }

    async Login(req,res,next){
        try {
            const data = await usersService.Login(req.body,req.files)
            res.status(200).json({
                status:200,
                message:"Login susseccfully",
                accesstoken:data.accessToken ?? "token not exists",
                refreshtoken:data.refreshToken ?? "token not exists"
            })
            
        } catch (error) {
            next(error)
        }
    }

    async toGetImg(req,res,next){
        try {
            const data = await usersService.ToGetImage(req.params)
            res.sendFile(data)
        } catch (error) {
            next(error)
        }
    }

    async GettAll(req,res,next) {
        try {
            const data = await usersService.GetAll()
            res.status(200).json({
                status:200,
                data:data
            })
        } catch (error) {
            next(error)
        }

    }

    async DeleteById(req,res,next){
        try {
            const data = await usersService.DeleteById(req.params)
            res.status(200).json({
                status:200,
                message:"All information of User deleted successfully"
            })
            
        } catch (error) {
            next(error)
        }
    }

    async PutById(req,res,next){
        try {
            const data = await usersService.PutById(req.params,req.body,req.files)
            res.status(200).json({
                status:200,
                message:"User updaeted successfully"
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()