import { Router } from "express";
import { PornHubController } from "../controllers/pornhubData.controller.js";

const pornhubDataRouter = Router()
const pornhubController = new PornHubController()


pornhubDataRouter.get('/models/:page', pornhubController.pornHubDataModels)
pornhubDataRouter.get('/models-filter/:name', pornhubController.pornHubFilterModels)
pornhubDataRouter.get('/url', pornhubController.pornHubUrlData)
pornhubDataRouter.get('/model-info/:name', pornhubController.pornHubModelInfo)
pornhubDataRouter.get('/pics/:page/:tag',pornhubController.pornHubAlbumTag)

export default pornhubDataRouter


// Admin MongoDB Donweb
// db.createUser(
//     {
//     user: "radamantium",
//     pwd: "seba2010",
//     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
//     }
//     );
// CONNECTION STRING MONGODB DONWEB: mongodb://149.50.135.133/