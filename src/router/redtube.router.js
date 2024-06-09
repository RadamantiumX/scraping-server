import { Router } from "express";
import { RedTubeController } from "../controllers/redtube.controller.js";

const redtubeRouter = Router()
const redtubeController = new RedTubeController()

redtubeRouter.get('/model/:name',redtubeController.redtubeModels)

export default redtubeRouter