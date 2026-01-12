import { Router } from "express";
import validion from "../middleware/validion.js";
import filesController from "../controllers/files.controller.js";
import chekcToken from "../middleware/chekcToken.js";


const FilesRouter = Router()

FilesRouter.post("/api/upload",validion.PostVideoShchema,filesController.PostVideo)
FilesRouter.get("/api/info/:id",filesController.GetVideoInfo)
FilesRouter.put("/api/edit/:id",chekcToken,validion.UpdateVidoeByIdSchema,filesController.UpdateVidoeById)
FilesRouter.delete("/api/remove/:id",chekcToken,filesController.DeleteVideoById)
FilesRouter.get("/api/search",validion.SearchVideoSchema,filesController.SearchVideo)


export default FilesRouter