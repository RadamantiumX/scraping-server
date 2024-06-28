import { Router } from "express"
import { MongoPhubDataController } from "../controllers/pornhubMongoDBData.controller.js"

const pornhubMongoDataRouter = Router()
const mongoPhubDataController = new MongoPhubDataController()

pornhubMongoDataRouter.get('/data/:page', mongoPhubDataController.modelsFromMongoDb) // Al data
pornhubMongoDataRouter.get('/search-models/:query', mongoPhubDataController.searchModels) // Query model
pornhubMongoDataRouter.get('/models', mongoPhubDataController.getDataAndSave)

export default pornhubMongoDataRouter

/*
DB MONGO DONWEB VPS

db.createUser(
{
user: "eduarede",
pwd: "seba2010",
roles: [ { role: "root", db: "admin" } ]
}
);



*/