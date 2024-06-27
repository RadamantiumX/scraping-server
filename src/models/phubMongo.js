import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";


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

    // All data
     static async getAllInfo(per_page, current_page){
        try{
            const db = await connect()
            const results = db.find().skip(per_page * current_page).limit(per_page)
            return results.toArray()
        }catch(error){
            console.error('Failed to request DB')
            console.error(error)
        }   
      
     }

     static async lenghtDocuments(){
        try{
            const db = await connect()
            const count = await db.countDocuments()
            return count
        }catch(error){
            console.error('Failed to request DB')
            console.error(error)
        }
     }

     static async getFilter(query){
        try{
        const db = await connect()
        const search = db.find({name: { $regex: query }})
        return search.toArray()
       }catch(error){
        console.error('Failed to request DB')
        console.error(error)
       }
    }

    // Only for get data
     static async create({name, url, views, videoNum, rank, photo, verified, awarded}){
        try{
        const db = await connect()
        const { insertedId } = await db.insertOne({
            name: name, 
            url: url, 
            views: views, 
            videoNum: videoNum, 
            rank: rank, 
            photo: photo, 
            verified: verified, 
            awarded: awarded
        })
        return "done"
    } catch (error) {
        console.error('Failed to request DB')
        console.error(error)
    }
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