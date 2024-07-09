import { readJSON } from "../../utils.js";

export class PhubPics{
   
    static async getPicsPages(tag, page){
        const data = await readJSON(`./data/pics/albums/${tag}_pics/porn_pics_${tag}_page_${page}.json`)
        return data
    }

    static async getAlbumContent(tag,id){
        const data = await readJSON(`./data/pics/photos/${tag}/album_${id}.json`)
        return data
    }
}