import { Router } from "express";
import { PornHubController } from "../controllers/pornhub.controller.js";

const pornhubRouter = Router()
const pornhubController = new PornHubController()

pornhubRouter.get('/data', pornhubController.pornHubApiModels)
pornhubRouter.get('/models/:page', pornhubController.pornHubDataModels)
pornhubRouter.get('/models-filter/:name', pornhubController.pornHubFilterModels)
pornhubRouter.get('/pics', pornhubController.pornHubApiPics)


export default pornhubRouter