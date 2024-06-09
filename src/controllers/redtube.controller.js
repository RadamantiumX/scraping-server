import { StatusCodes } from "http-status-codes"
import { PhubModel } from "../models/phubModels.js";

export class RedTubeController{
    async redtubeModels(req, res, next){
        try{
            const name = await req.params.name
            //  let results = []
            const raplaceMiddleDash = await name.replace("-", "+")
           
                const request = await fetch(`https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=${raplaceMiddleDash}&ordering=newest&page=all`)


                const { videos: data } = await request.json()
               // results.push(data)
            
            
                
           // const dataArray = results.flat()
            
            
            res.status(StatusCodes.OK).json({ response: data.map((item)=>{  
               return {
                title: item.video.title, 
                default_thumb: item.video.default_thumb,
                video_id: item.video.video_id,
                duration: item.video.duration,
                views: item.video.views,
                tags: item.video.tags
               }
            }), length: data.length}  )

        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something went wrong'
            })
        }
    }
}