import { BadRequestError } from "../utils/error.js";
import { UserRegisterSchema,UserLoginSchema,UserUpdateSchema } from "../validations/vaidations.js";

class validation {
    constructor() {}

    register = (req,res,next) => {
        try {
            const {error}  = UserRegisterSchema.validate(req.body)
            if(error){
                throw new BadRequestError(400,error.details[0].message)
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    login = (req,res,next) => {
        try {
            const {error}  = UserLoginSchema.validate(req.body)
            if(error){
                throw new BadRequestError(400,error.details[0].message)
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    UserUpdate = (req,res,next) => {
        try {
            const {error}  = UserUpdateSchema.validate(req.body)
            if(error){
              throw new BadRequestError(400,error.details[0].message)
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

export default new validation()