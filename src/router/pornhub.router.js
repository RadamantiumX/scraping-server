import { Router } from "express";
import { PornHubController } from "../controllers/pornhub.controller.js";

const pornhubRouter = Router()
const pornhubController = new PornHubController()

pornhubRouter.get('/scraping', pornhubController.pornHubApiModels)
pornhubRouter.get('/models', pornhubController.pornHubDataModels)
pornhubRouter.get('/pics', pornhubController.pornHubApiPics)


export default pornhubRouter