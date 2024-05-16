import { PornHub } from "pornhub.js";
import { StatusCodes } from "http-status-codes"

export class PornHubController{
    async pornHubApi(req, res, next){
        const pornhub = new PornHub()
        const models = await pornhub.pornstarList({
            page: 1,
            gender: 'female',
            order: 'Most Popular'
        })

        res.status(StatusCodes.OK).json({ models: models })
    }
}