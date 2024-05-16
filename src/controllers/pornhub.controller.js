import { PornHub } from "pornhub.js";
import { StatusCodes } from "http-status-codes"

export class PornHubController{
    async pornHubApi(req, res, next){
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
}