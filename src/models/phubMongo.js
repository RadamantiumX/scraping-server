import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const uri = 'mongodb://149.50.135.133/'

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
        const database = client.db('test')
        return database.collection('signal')
    }catch(error){
        console.error('Error to connect DB')
        console.error(error)
        await client.close()
    }
}


export class PhubMongo{
     static async getAllInfo(){
        const db = await connect()

        return db.find().toArray()
     }
}