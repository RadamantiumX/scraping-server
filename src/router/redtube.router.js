import { Router } from "express";
import { RedTubeController } from "../controllers/redtube.controller.js";

const redtubeRouter = Router()
const redtubeController = new RedTubeController()

redtubeRouter.get('/model',redtubeController.redtubeModels)

export default redtubeRouter