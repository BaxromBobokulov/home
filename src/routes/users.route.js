import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import validion from "../middleware/validion.js";

const UserRouter = Router()

UserRouter.post("/api/register",validion.register,usersController.Register)
UserRouter.post("/api/login",validion.login,usersController.Login)
UserRouter.get("/api/getimg/:filename",validion.getImg,usersController.toGetImg)
UserRouter.get("/api/users",usersController.GettAll)

export default UserRouter