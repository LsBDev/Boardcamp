import { Router } from "express";
import { clientsList, insertCustomer, specificCLient, updateCustomer } from "../controllers/clients.controllers.js";


const clientsRouter = Router()

clientsRouter.get("/customers", clientsList)
clientsRouter.get("/customers/:id", specificCLient)
clientsRouter.post("/customers", insertCustomer)
clientsRouter.put("/customers/:id", updateCustomer)


export default clientsRouter