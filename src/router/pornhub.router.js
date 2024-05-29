import { Router } from "express";
import { PornHubController } from "../controllers/pornhub.controller.js";

const pornhubRouter = Router()
const pornhubController = new PornHubController()

pornhubRouter.get('/data', pornhubController.pornHubApiModels)
pornhubRouter.get('/models/:page', pornhubController.pornHubDataModels)
pornhubRouter.get('/models-filter/:name', pornhubController.pornHubFilterModels)
// pornhubRouter.get('/model-videos', pornhubController.pornHubApiSearchVideos)
pornhubRouter.get('/pics', pornhubController.pornHubApiPics)
pornhubRouter.get('/url', pornhubController.PornHubUrlData)


export default pornhubRouter