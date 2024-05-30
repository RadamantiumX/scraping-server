import { PornHub } from "pornhub.js";
import { StatusCodes } from "http-status-codes"
import { PhubModel } from "../models/phubModels.js";
import { URL_MODELS } from "../const/url.js";
import fs from 'node:fs'


export class PornHubController{

    async pornHubApiModels(req, res, next){
        
        try{    
        const loaded = 1001
        // Saving JSON data
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
            const page = req.params.page
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

    async pornHubFilterModels(req, res, next){
        try{
            const name = req.params.name
            const count = 379
            for (let i = 1; i <= count;i++){
                const models = await PhubModel.getModelsFilter(i, name)
                if (models.length !== 0){
                    const length = models.length
                    res.status(StatusCodes.OK).json({models, length}) 
                }
                res.status(StatusCodes.OK).json({message: "No results found"})   
                
                }
               
              
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
            let results = []
            let filePath = `../../data/responses/model_index.json` 
          for(let i = 0; i < 10; i++){ 

         const lastSlash = URL_MODELS[i].lastIndexOf('/') // Last slash of the URL
         // const modelName = URL_MODELS[i].substring(lastSlash + 1)
         
         // Taken the reference on the URL ("pornstart" or "model")
         const sliceCat = URL_MODELS[i].slice(24, lastSlash)

         // Models & PornStars conditional
         if (sliceCat.includes("model")){
         const model = await pornhub.model(URL_MODELS[i])
         results.push(model)
        }
         const model = await pornhub.pornstar(URL_MODELS[i])
        results.push(model)


      }

       let jsonData = JSON.stringify(results)

            try{
                fs.writeFileSync(filePath, jsonData)
                 console.log('JSON is saved!')
              }catch(err){
                console.log('Error in this request', err)
             }
            res.status(StatusCodes.OK).json( { message: 'Done' } )
        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something went wrong'
            })
        }
    }
    
 async PornHubUrlData(req, res, next){
    try{
        //const results = []
       // let filePath = `../../data/responses/url_models.json`
       // for(let i = 1; i <= 379; i++){
            const url = await PhubModel.getModelInfo('https://www.pornhub.com/pornstar/angela-white')
          //  results.push(...url) // Combine ARRAYS
       // }
        
       // const jsonData = JSON.stringify(results)        
        //   try{
        //      fs.writeFileSync(filePath, jsonData)
        //      console.log('JSON is saved!')
        //   }catch(err){
        //     console.log('Error in this request', err)
        //   }
        
       // const length = results.length


        res.status(StatusCodes.OK).json({ url })

    }catch(err){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Something went wrong'
        })
    }
 }
    
}