import { PornHub } from "pornhub.js";
import { StatusCodes } from "http-status-codes"
import { HttpsProxyAgent } from "https-proxy-agent";
import { HttpProxyAgent } from "http-proxy-agent";
import { Client, BaseCollection } from "porn-x";


export class PornHubController{
    async pornHubApi(req, res, next){
        const agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
        const header = 'User-Agent'
        const proxy = 'https://202.93.244.38:8080'
        const httpsAgent = new HttpsProxyAgent(proxy)
        try{    
        const pornhub = new PornHub()
        pornhub.setHeader(header, agent)
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

   async pornTest(res, req, next){
    const client = new Client()

          const results = await client.getGif("Alison Tyler")
          .then((res)=> console.log(res))

          
   } 
}