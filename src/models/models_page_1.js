import { readJSON } from "../../utils.js";

const modelsPage1 = readJSON("./models.json")



export class PhubModel{
    static async getAll(){
        const data = modelsPage1
        return data
    }
}