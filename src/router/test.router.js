import { Router } from "express";


const testRouter = Router()
const testController = new ReadTesterController()

testRouter.get('/data', testController.read)

export default testRouter