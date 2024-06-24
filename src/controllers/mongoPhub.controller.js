import { PhubMongo } from "../models/phubMongo.js";
import { StatusCodes } from "http-status-codes";

export class MongoPhubController{
    async phubMongoTest(req, res, next){
        try{
            const data = await PhubMongo.getAllInfo()
            res.status(StatusCodes.OK).json(data)
        }catch(error){
            console.error('Fail to get data')
            console.error(error)
        }
       
    }
}