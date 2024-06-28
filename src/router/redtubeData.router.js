import { Router } from "express";
import { RedTubeController } from "../controllers/redtubeData.controller.js";

const redtubeDataRouter = Router()
const redtubeController = new RedTubeController()

redtubeDataRouter.get('/model/:name',redtubeController.redtubeModels)

export default redtubeDataRouter