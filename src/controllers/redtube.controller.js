import { StatusCodes } from "http-status-codes"
import { PhubModel } from "../models/phubModels.js";

export class RedTubeController{
    async redtubeModels(req, res, next){
        try{
            const request = await fetch('https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=sweetie+fox&ordering=newest')
            const { videos: data } = await request.json()
            res.status(StatusCodes.OK).json(data)

        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something went wrong'
            })
        }
    }
}