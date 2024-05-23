import { readJSON } from "../../utils.js";


export class PhubModel{
    static async getAll(page){
        const data = readJSON(`./data/modelsPages/response_models_page_${page}.json`)
        return data
    }
}