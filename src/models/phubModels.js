import { readJSON } from "../../utils.js";


export class PhubModel{
    static async getAll(page){
        const data = readJSON(`./data/modelsPages/response_models_page_${page}.json`)
        return data
    }

    static async getModelsFilter(page, name){
        const {data:data} = readJSON(`./data/modelsPages/response_models_page_${page}.json`)
        const models = data.filter((d) => {
           return d["name"].toLowerCase().includes(name.toLowerCase()) 
        })

        return models
    }

    static async getModelInfo(page, name){
        const {data: data} = readJSON(`./data/modelsPages/response_models_page_${page}.json`)
        const info = data.map((item)=>{
            return item.url
        })

        return info
    }
}