import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import pornhubDataRouter from './src/router/pornhubData.router.js'
import redtubeDataRouter from './src/router/redtubeData.router.js'
import pornhubMongoDataRouter from './src/router/phubMongoData.router.js'
import getDataScrapDataRouter from './src/router/getScrapData.router.js'
import 'dotenv/config'


const app = express()

const PORT = 4000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res)=>{
    res.status(200).json({ message: "Server On" })
})
app.use('/phub', pornhubDataRouter)
app.use('/rtube', redtubeDataRouter)
app.use('/phmongo', pornhubMongoDataRouter)
app.use('/get-data', getDataScrapDataRouter)

app.listen(PORT)
console.log(`Server started on http://localhost:${PORT}`)
