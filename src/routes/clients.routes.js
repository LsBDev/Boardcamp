import { Router } from "express";
import { clientsList, specificCLient } from "../controllers/clients.controllers.js";


const clientsRouter = Router()

clientsRouter.get("/customers", clientsList)
clientsRouter.get("/customers/:id", specificCLient)


export default clientsRouter