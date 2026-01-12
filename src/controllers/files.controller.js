import filesService from "../services/files.service.js"

class FilesController {
    constructor() {}

    async PostVideo(req,res,next){
    try {
        const data = await filesService.PostVideo(req.body,req.files)
        res.status(200).json({
            status:200,
            message:"Video uploaded successfully"
        })
    } catch (error) {
        console.log(error.stack)
        next(error)
        }
    }

    async GetVideoInfo(req,res,next){
        try {
            const data = await filesService.GetVideoInfo(req.params)
            res.status(200).json({
                status:200,
                data:data.file
            })
        } catch (error) {
            next(error)
        }
    }

    async DeleteVideoById(req,res,next){
        try {
            const data = await filesService.DeleteVideoById(req.user,req.params)
            res.status(200).json({
                status:200,
                message:"Video deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    async UpdateVidoeById(req,res,next){
        try {
            const data = await filesService.UpdateVidoeById(req.user,req.params,req.body)
            res.status(200).json({
                status:200,
                message:"Video changed successfully"
            })

        } catch (error) {
            next(error)
        }
    }

    async SearchVideo(req,res,next){
        try {
            const data = await filesService.SearchVideo(req.body)
            res.status(200).json({
                status:200,
                data:data.found
            })
        } catch (error) {
            next(error)
        }
    }

}


export default new FilesController()