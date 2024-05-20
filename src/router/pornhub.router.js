import { Router } from "express";
import { PornHubController } from "../controllers/pornhub.controller.js";

const pornhubRouter = Router()
const pornhubController = new PornHubController()

pornhubRouter.get('/models', pornhubController.pornHubApi)
pornhubRouter.get('/data', pornhubController.pornHubData)


export default pornhubRouter