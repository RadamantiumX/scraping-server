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
            const query = 'Sweetie'
            const models = await PhubMongo.getFilter(query)

            res.status(StatusCodes.OK).json(models)

        }catch(error){
            console.error('Fail to get data')
            console.error(error)
        }
    }

    async getDataAndSave(req, res, next){
        try{
            const pornhub = new PornHub
            for (let i = 2; i <= 379; i++){
                const models = await pornhub.pornstarList({
                page: i,
                gender: "female",
                order: "Most Popular",
              });

            for (let i = 0; i < models.data.length; i++){
                const newRecords = PhubMongo.create({
                    name: models.data[i].name, 
                    url: models.data[i].url,
                    views: models.data[i].views, 
                    videoNum: models.data[i].videoNum, 
                    rank: models.data[i].rank, 
                    photo: models.data[i].photo, 
                    verified: models.data[i].verified, 
                    awarded: models.data[i].awarded
                })
            }
            }
            
                
        

            res.status(StatusCodes.OK).json({message:'done'})

        }catch(error){
            console.error('Fail to get data')
            console.error(error)
        }
    }
}