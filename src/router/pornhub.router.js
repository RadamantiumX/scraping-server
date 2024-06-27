import { Router } from "express";
import { PornHubController } from "../controllers/pornhub.controller.js";

const pornhubRouter = Router()
const pornhubController = new PornHubController()


pornhubRouter.get('/models/:page', pornhubController.pornHubDataModels)
pornhubRouter.get('/models-filter/:name', pornhubController.pornHubFilterModels)
pornhubRouter.get('/url', pornhubController.PornHubUrlData)
pornhubRouter.get('/model-info/:name', pornhubController.PornHubModelInfo)
pornhubRouter.get('/pics/:page/:tag',pornhubController.PornHubPicTag)

export default pornhubRouter


// Admin MongoDB Donweb
// db.createUser(
//     {
//     user: "radamantium",
//     pwd: "seba2010",
//     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
//     }
//     );
// CONNECTION STRING MONGODB DONWEB: mongodb://149.50.135.133/