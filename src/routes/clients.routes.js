import { Router } from "express";
import { clientsList, insertCustomer, specificCLient } from "../controllers/clients.controllers.js";


const clientsRouter = Router()

clientsRouter.get("/customers", clientsList)
clientsRouter.get("/customers/:id", specificCLient)
clientsRouter.post("/customers", insertCustomer)


export default clientsRouter