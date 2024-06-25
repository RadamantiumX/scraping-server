import { PhubMongo } from "../models/phubMongo.js";
import { StatusCodes } from "http-status-codes";
import { PornHub } from "pornhub.js";

export class MongoPhubController{
    async phubMongoTest(req, res, next){
        try{
            const id = '6679b2bc3c883933f63045e0'
            const {data:data} = await PhubMongo.getAllInfo({id})
            res.status(StatusCodes.OK).json(data)
        }catch(error){
            console.error('Fail to get data')
            console.error(error)
        }
       
    }

    async searchTest(req, res, next){
        try{
            // const query = 'Sweetie'
            const models = await PhubMongo.getFilter()

            res.status(StatusCodes.OK).json(models)

        }catch(error){
            console.error('Fail to get data')
            console.error(error)
        }
    }

    async getDataAndSave(req, res, next){
        try{
            const pornhub = new PornHub
            const models = await pornhub.pornstarList({
                page: 1,
                gender: "female",
                order: "Most Popular",
              });

            
                const newRecords = PhubMongo.create(models.data)
        

            res.status(StatusCodes.OK).json({message:'done'})

        }catch(error){
            console.error('Fail to get data')
            console.error(error)
        }
    }
}