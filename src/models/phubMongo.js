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

     static async getFilter(){
        const db = await connect()
        return db.find({name: "Sweetie Fox"})
     }

     static async create({item}){
        const db = await connect()
        const { insertedId } = await db.insertOne(item)
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