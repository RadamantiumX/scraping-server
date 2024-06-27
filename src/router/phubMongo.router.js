import { Router } from "express"
import { MongoPhubController } from "../controllers/mongoPhub.controller.js"

const pornhubMongoRouter = Router()
const mongoPhubController = new MongoPhubController()

pornhubMongoRouter.get('/data/:page', mongoPhubController.modelsFromMongoDb) // Al data
pornhubMongoRouter.get('/search-models/:query', mongoPhubController.searchModels) // Query model
pornhubMongoRouter.get('/models', mongoPhubController.getDataAndSave)

export default pornhubMongoRouter

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