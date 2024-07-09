import { PornHub } from "pornhub.js";
import { StatusCodes } from "http-status-codes";
import { PhubModel } from "../models/phubModels.js";
import { PhubPics } from "../models/phubPics.js";
import fs from "node:fs";
import process from "node:process";
import path from "node:path";


export class PornHubController {
  


  async pornHubDataModels(req, res, next) {
    try {
      const page = req.params.page;
      const models = await PhubModel.getAll(page);
      const count = 379;

      res.status(StatusCodes.OK).json({ models, count });
    } catch (err) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Something went wrong",
      });
    }
  }

  // Search Model Query
  async pornHubFilterModels(req, res, next) {
    try {
      const name = req.params.name;
      const count = 379;
      for (let i = 1; i <= count; i++) {
        const models = await PhubModel.getModelsFilter(i, name);
        if (models.length !== 0) {
          const response = JSON.stringify(models)
         // const length = models.length;
          res.status(StatusCodes.OK).json({ response });
        }
        res.status(StatusCodes.OK).json({ message: "No results found" });
      }
    } catch (err) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: err.message,
      });
    }
  }

  
  

  // Only for get data url from the JSON file
  async pornHubUrlData(req, res, next) {
    try {
      const results = [];
      let filePath = `../../data/responses/url_models.json`;
      for (let i = 1; i <= 379; i++) {
        const url = await PhubModel.getModelInfoURL(
          "https://www.pornhub.com/pornstar/angela-white"
        );
        results.push(...url); // Combine ARRAYS
      }

      const jsonData = JSON.stringify(results);
      try {
        fs.writeFileSync(filePath, jsonData);
        console.log("JSON is saved!");
      } catch (err) {
        console.log("Error in this request", err);
      }

      const length = results.length;

      res.status(StatusCodes.OK).json({ url });
    } catch (err) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Something went wrong",
      });
    }
  }

  // Search Model Info
  async pornHubModelInfo(req, res, next) {
    try {
      const name = req.params.name;

      for (let i = 1; i <= 4; i++) {
        const model = await PhubModel.getModelInfo(name.replace("-", " "), i);
        if (model) {
          res.status(StatusCodes.OK).json(model);
        }
      }
    } catch (err) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Something went wrong",
      });
    }
  }

  async pornHubAlbumTag(req, res, next) {
    try {
      const page = req.params.page;
      const tag = req.params.tag.toLowerCase();
      const currentProjectPath = process.cwd();
      const dataPath = path.join(currentProjectPath, `/data/pics/albums/${tag}_pics`);

      const picsPage = await PhubPics.getPicsPages(tag, page);
      const data = picsPage.data;
      fs.promises
        .readdir(dataPath)
        .then((files) => {
          console.log(files.length);
          res
            .status(StatusCodes.OK)
            .json({ data, pages: files.length, currentPage: parseInt(page) });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Something went wrong",
      });
    }
  }

  async pornHubPics(req, res, next){
    try{
      const tag = req.params.tag
      const id = req.params.id
      const album = await PhubPics.getAlbumContent(tag, id)
      res.status(StatusCodes.OK).json(album)

    }catch(error){
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Something went wrong",
      });
    }
  }
}
