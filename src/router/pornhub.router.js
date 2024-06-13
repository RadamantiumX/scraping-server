import { Router } from "express";
import { PornHubController } from "../controllers/pornhub.controller.js";

const pornhubRouter = Router()
const pornhubController = new PornHubController()

pornhubRouter.get('/data', pornhubController.pornHubApiModels)
pornhubRouter.get('/models/:page', pornhubController.pornHubDataModels)
pornhubRouter.get('/models-filter/:name', pornhubController.pornHubFilterModels)
pornhubRouter.get('/loop-data', pornhubController.pornHubApiData)
pornhubRouter.get('/url', pornhubController.PornHubUrlData)
pornhubRouter.get('/model-info/:name', pornhubController.PornHubModelInfo)
pornhubRouter.get('/test/:tag', pornhubController.someTestOnPhub)
pornhubRouter.get('/test2', pornhubController.anotherTestOnPhub)
pornhubRouter.get('/pics',pornhubController.PornHubPicTag)

export default pornhubRouter