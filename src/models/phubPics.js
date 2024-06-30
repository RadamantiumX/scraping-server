import { readJSON } from "../../utils.js";

export class PhubPics{
   
    static async getPicsPages(tag, page){
        const data = await readJSON(`./data/pics/${tag}_pics/porn_pics_${tag}_page_${page}.json`)
        return data
    }
}