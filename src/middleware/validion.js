import { UserRegisterSchema,UserLoginSchema,UserGetImg } from "../validations/vaidations.js";

class validation {
    constructor() {}

    register = (req,res,next) => {
        try {
            const {error}  = UserRegisterSchema.validate(req.body)
            if(error){
                return res.status(400).json({
                    status:400,
                    message:error.details[0].message,
                })
            }
            next()
        } catch (error) {
            return res.status(400).json({
                status:400,
                message:error.message
            })
        }
    }

    login = (req,res,next) => {
        try {
            const {error}  = UserLoginSchema.validate(req.body)
            if(error){
                return res.status(400).json({
                    status:400,
                    message:error.details[0].message,
                })
            }
            next()
        } catch (error) {
            return res.status(400).json({
                status:400,
                message:error.message
            })
        }
    }

    getImg = (req,res,next) => {
        try {
            const {error}  = UserGetImg.validate(req.params)
            if(error){
                return res.status(400).json({
                    status:400,
                    message:error.details[0].message,
                })
            }
            next()
        } catch (error) {
            return res.status(400).json({
                status:400,
                message:error.message
            })
        }
    }
}

export default new validation()