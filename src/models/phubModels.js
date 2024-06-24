import { readJSON } from "../../utils.js";


export class PhubModel{
    static async getAll(page){
        const data = readJSON(`./data/modelsPages/response_models_page_${page}.json`)
        return data
    }

    static async getModelsFilter(page, name){
    
        const {data:data} = await readJSON(`./data/modelsPages/response_models_page_${page}.json`)
        const models = await data.map((d) => {
          // return d["name"].toLowerCase().includes(name.toLowerCase()) 
          d.name.toLowerCase() 
        }
        // item => item.name.toLowerCase().includes(name.toLowerCase()) 
      
    )
   

        return models
    }

    static async getModelInfoURL(page){
        const {data: data} = readJSON(`./data/modelsPages/response_models_page_${page}.json`)
        const info = data.map((item)=>{
            return item.url
        })

        return info
    }

    // Return model info detail
    static async getModelInfo(name, page){
        
          const data = await readJSON(`./data/modelIndex/${page}-model-info-index.json`)

           const modelInfo = await data.find(model => model.name.toLowerCase() === name.toLowerCase())

           return modelInfo
        
    }

    static async getPicsPages(tag, page){
        const data = await readJSON(`./data/pics/${tag}_pics/porn_pics_${tag}_page_${page}.json`)
        return data
    }
}