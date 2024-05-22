import { PornHub } from "pornhub.js";
import { StatusCodes } from "http-status-codes"
import { PhubModel } from "../models/models_page_1.js";


export class PornHubController{

    async pornHubApiModels(req, res, next){
        
        try{    
        const pornhub = new PornHub()
        const models = await pornhub.pornstarList({
            page: 1,
            gender: 'female',
            order: 'Most Popular'
        })

        res.status(StatusCodes.OK).json({ models: models })
    }catch(err){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Something went wrong'
        })
    }
    }

    async pornHubDataModels(req, res, next){
        try{
            const models = await PhubModel.getAll()

            res.status(StatusCodes.OK).json(models)
        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something went wrong'
            })
        }
    }
   
    async pornHubApiPics(req, res, next){
        try{    
            const pornhub = new PornHub()
           /* const pics = await pornhub.searchGif('popular', {
                page: 1,
                order: "Most Relevant",
                sexualOrientation: "straight"
            })*/

            const page = await pornhub.route.mainPage()
    
            // res.status(StatusCodes.OK).json({ pics: pics })
            res.status(StatusCodes.OK).json({ page: page })
        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something went wrong'
            })
        }
    }
    

    
}