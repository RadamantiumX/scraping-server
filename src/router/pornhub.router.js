import { Router } from "express";
import { PornHubController } from "../controllers/pornhub.controller";

const pornhubRouter = Router()
const pornhubController = new PornHubController()

pornhubRouter.get('/models', pornhubController.pornHubApi)


export default pornhubRouter