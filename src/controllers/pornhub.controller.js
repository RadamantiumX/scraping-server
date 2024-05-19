import { PornHub } from "pornhub.js";
import { StatusCodes } from "http-status-codes"
import { HttpsProxyAgent } from "https-proxy-agent";

export class PornHubController{
    async pornHubApi(req, res, next){
        
        try{
        const proxy = 'https://162.241.204.101:60526'
        const httpsAgent =  new HttpsProxyAgent(proxy)
        const pornhub = new PornHub()
         pornhub.setAgent(httpsAgent)
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