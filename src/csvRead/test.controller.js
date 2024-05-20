import { readFileSync } from 'fs'
import { parse } from 'csv-parse'

export class ReadTesterController{
    async read(req, res, next){
       const fileContent = readFileSync('../../../../phubcsv/pornhub.com-db.csv', 'utf-8')
       const csvParsedContent = await parse(fileContent, {
       columns: true
         })

      res.status(200).json({ data: csvParsedContent })   
 
    }
}

