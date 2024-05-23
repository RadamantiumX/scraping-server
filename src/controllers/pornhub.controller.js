import { PornHub } from "pornhub.js";
import { StatusCodes } from "http-status-codes"
import { PhubModel } from "../models/phubModels.js";
import fs from 'node:fs'


export class PornHubController{

    async pornHubApiModels(req, res, next){
        
        try{    
        const loaded = 1001
        
        const pornhub = new PornHub()
        for(let i = 1; i < loaded; i++){
           let filePath = `../../data/responses/response_models_page_${i}.json` 
           const models = await pornhub.pornstarList({
            page: i,
            gender: 'female',
            order: 'Most Popular'
        }) 
        let jsonData = JSON.stringify(models)
          try{
             fs.writeFileSync(filePath, jsonData)
             console.log('JSON is saved!')
          }catch(err){
            console.log('Error in this request', err)
          }
        }
        

        res.status(StatusCodes.OK).json({ message: 'done' })
    }catch(err){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Something went wrong'
        })
    }
    }



    async pornHubDataModels(req, res, next){
        try{
            const page = req.query.page
            const models = await PhubModel.getAll(page)
            const count = 379

            res.status(StatusCodes.OK).json({models, count})
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