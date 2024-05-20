import { Router } from "express";
import { PornHubController } from "../controllers/pornhub.controller.js";

const pornhubRouter = Router()
const pornhubController = new PornHubController()

pornhubRouter.get('/models', pornhubController.pornHubApi)
pornhubRouter.get('/test', pornhubController.pornTest)


export default pornhubRouter