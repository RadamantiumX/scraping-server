import { Router } from "express";
import { GetDataController } from "../controllers/pornhubGetData.controller.js";

const getDataRouter = Router()
const getDataController = new GetDataController()

getDataRouter.get('/data', getDataController.pornHubApiModels)
getDataRouter.get('/test/:tag', getDataController.someTestOnPhub)
getDataRouter.get('/test2', getDataController.anotherTestOnPhub)
getDataRouter.get('/test3', getDataController.getAlbumFromScraping)
getDataRouter.get('/loop-data', getDataController.pornHubApiData)

export default getDataRouter