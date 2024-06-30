import { URL_MODELS } from "../const/url.js";
import { PhubMongo } from "../models/phubMongo.js";
import { StatusCodes } from "http-status-codes";
import { PornHub } from "pornhub.js";


export class MongoPhubDataController{
    async modelsFromMongoDb(req, res, next){
        try{
            const page = parseInt(req.params.page)
            const fixedIndex = page - 1
            const limit = 20
            const models = await PhubMongo.getAllInfo(limit,fixedIndex)
            const count = await PhubMongo.lenghtDocuments()
            const totalPages = Math.ceil(count / limit)
            const paging = {
                currentPage: page,
                totalResults: count,
                totalPages: totalPages,
            }
            res.status(StatusCodes.OK).json({data: models, paging: paging})
            
        }catch(error){
            console.error('Fail to get data')
            console.error(error)
        }
       
    }

    async searchModels(req, res, next){
        try{
            const query = req.params.query
            const models = await PhubMongo.getFilter(query)

            res.status(StatusCodes.OK).json(models)

        }catch(error){
            console.error('Fail to get data')
            console.error(error)
        }
    }

    async modelInfo(req, res, next) {
      try{
         const name = req.params.name
         const model = await PhubMongo.getInfo(name)
         res.status(StatusCodes.OK).json(model)
      }catch(error){
         console.error('Fail to get data')
         console.error(error)
      }
    }


   // Getting Data and Save in MongoDB 
    async getDataModelsPagesAndSave(req, res, next){
        try{
            const pornhub = new PornHub
            for (let i = 1; i <= 379; i++){
                const models = await pornhub.pornstarList({
                page: i,
                gender: "female",
                order: "Most Popular",
              });

            for (let i = 0; i < models.data.length; i++){
                const newRecords = await PhubMongo.createModelsPages({
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

    // Getting Data and Save in MongoDB 
    // It's a "HARD LOOP" data recovery
  async getDataModelsInfoAndSave(req, res, next) {
    try {
      const pornhub = new PornHub();
   

      // Start FOR
      // Last SnapShot (let i = 13000; i < 15000; i++)
      // Total: 22359
      for (let i = 17000; i <= URL_MODELS.length; i++) {
        const lastSlash = URL_MODELS[i].lastIndexOf("/"); // Last slash of the URL
        const sliceCat = URL_MODELS[i].slice(24, lastSlash);

        // Models & PornStars conditional
        if (sliceCat === "model") {
          const model = await pornhub.model(URL_MODELS[i]);
          const newRecords = await PhubMongo.createModelsInfo({
            name: model.name,
            cover: model.cover,
            about: model.about,
            avatar: model.avatar,
            gender: model.gender,
            birthPlace: model.birthPlace,
            height: model.height,
            weight: model.weight,
          })

        } else {
          const model = await pornhub.pornstar(URL_MODELS[i]);
          const newRecords = await PhubMongo.createModelsInfo({
            name: model.name,
            cover: model.cover,
            about: model.about,
            avatar: model.avatar,
            gender: model.gender,
            birthPlace: model.birthPlace,
            height: model.height,
            weight: model.weight,
          })
        }
      }
    // END FOR

      res.status(StatusCodes.OK).json({ message: "Done" });
    } catch (err) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Something went wrong",
      });
    }
  }
}