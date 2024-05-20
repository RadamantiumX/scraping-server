import { readJSON } from "../utils/readJson.js";
// import path from '../phubData/models_page_1.json'
import fs from 'node:fs'

const modelsPage1 = readJSON('../phubData/models_page_1.json')



export class PhubModel{
    static async getAll(){
        const data = modelsPage1

        return data
    }
}