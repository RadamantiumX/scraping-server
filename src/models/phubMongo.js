import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { readJSON } from "../../utils.js";

const uri = 'mongodb://eduarede:seba2010@149.50.135.133/'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function connect() {
    try{
        await client.connect()
        const database = client.db('scrap')
        return database.collection('models')
    }catch(error){
        console.error('Error to connect DB')
        console.error(error)
        await client.close()
    }
}


export class PhubMongo{
     static async getAllInfo({id}){
        const db = await connect()
        const objectId = new ObjectId(id) 
        return db.findOne({_id: objectId})
     }

     static async getFilter(query){
        const db = await connect()
        const search = db.find({name: { $regex: query }})
        return search.toArray()
    }

     static async create({name, url, views, videoNum, rank, photo, verified, awarded}){
        const db = await connect()
        const { insertedId } = await db.insertOne({
            name: name, 
            url: url, 
            views: url, 
            videoNum: videoNum, 
            rank: rank, 
            photo: photo, 
            verified: verified, 
            awarded: awarded
        })
        return "done"
     }
}

/** 
 * Page MODELS (KEY-VALUE)
 * 
 * {
      "paging": {
         "current": 1,
         "maxPage": 10,
         "isEnd": false  
   }
 * 
 * 
*/