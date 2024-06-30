import { MongoClient, ServerApiVersion } from "mongodb";


const uri = 'mongodb://eduarede:seba2010@149.50.135.133/'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function connect(collection) {
    try{
        await client.connect()
        const database = client.db('scrap')
        return database.collection(collection)
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
            const collection = 'models'
            const db = await connect(collection)
            const results = db.find().skip(per_page * current_page).limit(per_page)
            return results.toArray()
        }catch(error){
            console.error('Failed to request DB')
            console.error(error)
        }   
      
     }

     static async getInfo(name){
        try{
            const collection = 'modelsInfo'
            const db = await connect(collection)
            const results = db.findOne({name: name})
            return results
        }catch(error){
            console.error('Failed to request DB')
            console.error(error)
        } 
     }

     static async lenghtDocuments(){
        try{
            const collection = 'models'
            const db = await connect(collection)
            const count = await db.countDocuments()
            return count
        }catch(error){
            console.error('Failed to request DB')
            console.error(error)
        }
     }

     static async getFilter(query){
        try{
        const collection = 'models'    
        const db = await connect(collection)
        const search = db.find({name: { $regex: query }})
        return search.toArray()
       }catch(error){
        console.error('Failed to request DB')
        console.error(error)
       }
    }

    // Only for get data
     static async createModelsPages({name, url, views, videoNum, rank, photo, verified, awarded}){
        try{
        const collection = 'models'    
        const db = await connect(collection)
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

    static async createModelsInfo({name, cover, about, avatar, gender, birthPlace, height, weight}){
     try{
        const collection = 'modelsInfo'
        const db = await connect(collection)
        const { insertedId } = await db.insertOne({
            name: name,
            cover: cover,
            about: about,
            avatar: avatar,
            gender: gender,
            birthPlace: birthPlace,
            height: height,
            weight: weight
        })
        return 'done'
     }catch(error){
        console.error('Failed to request DB')
        console.error(error)
     }
        
    } 
}
  // Only for get data

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