import Joi from "joi";

export const UserRegisterSchema = Joi.object({
    username:Joi.string().min(3).max(20).required(),
    password:Joi.string().pattern( new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
})

export const UserLoginSchema = Joi.object({
    username:Joi.string().min(3).max(20).required(),
    password:Joi.string().pattern( new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
})

export const UserGetImg = Joi.object({
    filename:Joi.string().required()
})
