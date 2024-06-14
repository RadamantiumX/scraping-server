import { PornHub } from "pornhub.js";
import { StatusCodes } from "http-status-codes"
import { PhubModel } from "../models/phubModels.js";
import { URL_MODELS } from "../const/url.js";
import fs from 'node:fs'
// import { TAGS } from "../../constants.js";
// import { Worker } from "node:worker_threads";
import process from "node:process";
import path from "node:path";
import { error } from "node:console";



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

    async someTestOnPhub(req, res, next){
        try{
            const pornhub = new PornHub()
            const tag = req.params.tag
                for(let i = 1; i <= 50; i++){
              let filePath = `../../data/responses/${tag.toLowerCase()}_pics/porn_pics_${tag.toLowerCase()}_page_${i}.json`   
              const album = await pornhub.searchAlbum(tag , {
                order: "Most Relevant",
                page: i,           
              })  

              let jsonData = JSON.stringify(album)
              try{
                fs.writeFileSync(filePath, jsonData)
                console.log('JSON is saved!')
             }catch(err){
                console.log('Error in this request', err)
             }
            }
            
            
            
            res.status(StatusCodes.OK).json({ message: "Done!" })

        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something went wrong'
            })
        }
    }

    async anotherTestOnPhub(req, res, next){
        try{
            const pornhub = new PornHub()
            const albumInfo = await pornhub.album('77656451')

            res.status(StatusCodes.OK).json(albumInfo)

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

    // Search Model Query
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
   

  // Create a JSON file with model info detailed
    async pornHubApiData(req, res, next){
        try{    
            const pornhub = new PornHub()
            let results = []
          
           // Start FOR 
          for(let i = 13000; i < 15000; i++){ 
                  const lastSlash = URL_MODELS[i].lastIndexOf('/') // Last slash of the URL
                  // const modelName = URL_MODELS[i].substring(lastSlash + 1)
                
                  const sliceCat = URL_MODELS[i].slice(24, lastSlash)

                  // Models & PornStars conditional
                  if (sliceCat === "model"){
                     const model = await pornhub.model(URL_MODELS[i])
                     console.log(i)
                     results.push({name:model.name,cover: model.cover, about:model.about, avatar:model.avatar,gender: model.gender,birthPlace: model.birthPlace, height: model.height, weight: model.weight})
                  
                   }else{
                     const model = await pornhub.pornstar(URL_MODELS[i])
                     console.log(i)
                      results.push({name:model.name,cover: model.cover, about:model.about, avatar:model.avatar,gender: model.gender,birthPlace: model.birthPlace, height: model.height, weight: model.weight})
                  
                }
             }
             // End FOR

             let filePath = `../../data/responses/model-info-index.json`
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
    



// Only for get data url from the JSON file
 async PornHubUrlData(req, res, next){
    try{
        const results = []
       let filePath = `../../data/responses/url_models.json`
       for(let i = 1; i <= 379; i++){
            const url = await PhubModel.getModelInfoURL('https://www.pornhub.com/pornstar/angela-white')
           results.push(...url) // Combine ARRAYS
       }
        
       const jsonData = JSON.stringify(results)        
          try{
             fs.writeFileSync(filePath, jsonData)
             console.log('JSON is saved!')
          }catch(err){
            console.log('Error in this request', err)
          }
        
       const length = results.length


        res.status(StatusCodes.OK).json({ url })

    }catch(err){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Something went wrong'
        })
    }
 }

 // Search Model Info
 async PornHubModelInfo(req, res, next){
    try{
        const name = req.params.name

        for(let i = 1; i <= 4; i++){
            const model = await PhubModel.getModelInfo(name.replace("-", " "), i)
            if (model){
            res.status(StatusCodes.OK).json(model)
          }
        }

    }catch(err){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Something went wrong'
        })
    }
 }

 async PornHubPicTag(req, res, next){
    try{
        const page = req.params.page
        const tag = req.params.tag.toLowerCase()
        const currentProjectPath = process.cwd()
        const dataPath = path.join(currentProjectPath, `/data/pics/${tag}_pics`)
    
        const picsPage = await PhubModel.getPicsPages(tag, page)
        const data = picsPage.data
        fs.promises.readdir(dataPath)
          .then(files => {
            console.log(files.length)
            res.status(StatusCodes.OK).json({data, pages: files.length, currentPage: parseInt(page) })
          })
          .catch(err => {
            console.log(err.message)
          })

       
        
    }catch(err){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Something went wrong'
        })
    }
 }
    
}

