import express, {json} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import pornhubRouter from './src/router/pornhub.router.js'
import redtubeRouter from './src/router/redtube.router.js'
import pornhubMongoRouter from './src/router/phubMongo.router.js'
import 'dotenv/config'


const app = express()

const PORT = 4000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res)=>{
    res.status(200).json({ message: "Server On" })
})
app.use('/phub', pornhubRouter)
app.use('/rtube', redtubeRouter)
app.use('/phmongo', pornhubMongoRouter)

app.listen(PORT)
console.log(`Server started on http://localhost:${PORT}`)
