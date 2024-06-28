import { Router } from "express";
import { GetDataScrapController } from "../controllers/pornhubGetScrapData.controller.js";

const getDataScrapDataRouter = Router()
const getDataScrapController = new GetDataScrapController()

getDataScrapDataRouter.get('/data', getDataScrapController.pornHubApiModels)
getDataScrapDataRouter.get('/test/:tag', getDataScrapController.someTestOnPhub)
getDataScrapDataRouter.get('/test2', getDataScrapController.anotherTestOnPhub)
getDataScrapDataRouter.get('/test3', getDataScrapController.getAlbumFromScraping)
getDataScrapDataRouter.get('/loop-data', getDataScrapController.pornHubApiData)

export default getDataScrapDataRouter