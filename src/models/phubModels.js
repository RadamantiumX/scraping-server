import { readJSON } from "../../utils.js";


export class PhubModel{
    static async getAll(){
        const data = readJSON("./data/modelsPages/models-page-1.json")
        return data
    }
}