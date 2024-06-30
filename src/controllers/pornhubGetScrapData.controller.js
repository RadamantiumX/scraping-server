import { StatusCodes } from "http-status-codes";
import { PornHub } from "pornhub.js";
import { URL_MODELS } from "../const/url.js";
import { PhubPics } from "../models/phubPics.js";
import fs from "node:fs";

export class GetDataScrapController{
    async pornHubApiModels(req, res, next) {
        try {
          const loaded = 1001;
          // Saving JSON data
          const pornhub = new PornHub();
          for (let i = 1; i < loaded; i++) {
            let filePath = `../../data/responses/response_models_page_${i}.json`;
            const models = await pornhub.pornstarList({
              page: i,
              gender: "female",
              order: "Most Popular",
            });
            let jsonData = JSON.stringify(models);
            try {
              fs.writeFileSync(filePath, jsonData);
              console.log("JSON is saved!");
            } catch (err) {
              console.log("Error in this request", err);
            }
          }
    
          res.status(StatusCodes.OK).json({ message: "done" });
        } catch (err) {
          return next({
            status: StatusCodes.BAD_REQUEST,
            message: "Something went wrong",
          });
        }
      }

      async someTestOnPhub(req, res, next) {
        try {
          const pornhub = new PornHub();
          const tag = req.params.tag;
          for (let i = 1; i <= 50; i++) {
            let filePath = `../../data/responses/${tag.toLowerCase()}_pics/porn_pics_${tag.toLowerCase()}_page_${i}.json`;
            const album = await pornhub.searchAlbum(tag, {
              order: "Most Relevant",
              page: i,
            });
    
            let jsonData = JSON.stringify(album);
            try {
              fs.writeFileSync(filePath, jsonData);
              console.log("JSON is saved!");
            } catch (err) {
              console.log("Error in this request", err);
            }
          }
    
          res.status(StatusCodes.OK).json({ message: "Done!" });
        } catch (err) {
          return next({
            status: StatusCodes.BAD_REQUEST,
            message: "Something went wrong",
          });
        }
      }

      async anotherTestOnPhub(req, res, next) {
        try {
          const pornhub = new PornHub();
          const albumInfo = await pornhub.album("76182781");
    
          res.status(StatusCodes.OK).json(albumInfo);
        } catch (err) {
          return next({
            status: StatusCodes.BAD_REQUEST,
            message: "Something went wrong",
          });
        }
      }

      async getAlbumFromScraping(req, res, next) {
        try {
          let results = [];
          const tag = "Sex";
          const pages = 30;
          const pornhub = new PornHub();
          for(let i = 1; i <= pages; i++){
          const data = await PhubPics.getPicsPages(tag, i);
    
          for (let i = 0; i < data.data.length; i++) {
            results.push(data.data[i].url);
          }
    
          for (let i = 0; i < results.length; i++) {
            const slashedIndex = results[i].lastIndexOf("/");
            const albumId = results[i].slice(slashedIndex + 1);
            let filePath = `../../data/albums/sex/album_${albumId}.json`;
           
            const albumInfo = await pornhub.album(albumId)
              .then((data)=>{
                  let jsonData = JSON.stringify(data);
                  fs.writeFileSync(filePath, jsonData);
                  console.log("JSON is saved!");
              })
              .catch(err=>{
                console.log(`File ${albumId} is missing - Not Found 404 -`)
              })
          }
          console.log(`Finish page Nº${i}`)
        }
    
          res.status(StatusCodes.OK).json({message: 'done!'});
        } catch (err) {
          res.status(StatusCodes.BAD_REQUEST).json({message: 'Fail in this request'})
        }
      }
      
 // Create a JSON file with model info detailed
 // It's a "HARD LOOP" data recovery
  async pornHubApiData(req, res, next) {
    try {
      const pornhub = new PornHub();
      let results = [];

      // Start FOR
      // Last SnapShot (let i = 13000; i < 15000; i++)
      for (let i = 0; i <= URL_MODELS.length; i++) {
        const lastSlash = URL_MODELS[i].lastIndexOf("/"); // Last slash of the URL
        // const modelName = URL_MODELS[i].substring(lastSlash + 1)

        const sliceCat = URL_MODELS[i].slice(24, lastSlash);

        // Models & PornStars conditional
        if (sliceCat === "model") {
          const model = await pornhub.model(URL_MODELS[i]);
          console.log(i);
          results.push({
            name: model.name,
            cover: model.cover,
            about: model.about,
            avatar: model.avatar,
            gender: model.gender,
            birthPlace: model.birthPlace,
            height: model.height,
            weight: model.weight,
          });
        } else {
          const model = await pornhub.pornstar(URL_MODELS[i]);
          console.log(i);
          results.push({
            name: model.name,
            cover: model.cover,
            about: model.about,
            avatar: model.avatar,
            gender: model.gender,
            birthPlace: model.birthPlace,
            height: model.height,
            weight: model.weight,
          });
        }
      }
      // End FOR

      let filePath = `../../data/responses/model-info-index.json`;
      let jsonData = JSON.stringify(results);
      try {
        fs.writeFileSync(filePath, jsonData);
        console.log("JSON is saved!");
      } catch (err) {
        console.log("Error in this request", err);
      }

      res.status(StatusCodes.OK).json({ message: "Done" });
    } catch (err) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Something went wrong",
      });
    }
  }
    
}