import { readJSON } from "../utils/readJson.js";

const modelsPage1 = readJSON("../../models_page_1.json")



export class PhubModel{
    static async getAll(){
        const data = modelsPage1
        return data
    }
}