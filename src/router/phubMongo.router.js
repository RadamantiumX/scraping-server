import { Router } from "express"
import { MongoPhubController } from "../controllers/mongoPhub.controller.js"

const pornhubMongoRouter = Router()
const mongoPhubController = new MongoPhubController()

pornhubMongoRouter.get('/data', mongoPhubController.phubMongoTest)

export default pornhubMongoRouter
