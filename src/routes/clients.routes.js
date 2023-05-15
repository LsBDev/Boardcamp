import { Router } from "express";
import { clientsList, insertCustomer, specificCustomer, updateCustomer } from "../controllers/clients.controllers.js";


const clientsRouter = Router()

clientsRouter.get("/customers", clientsList)
clientsRouter.get("/customers/:id", specificCustomer)
clientsRouter.post("/customers", insertCustomer)
clientsRouter.put("/customers/:id", updateCustomer)


export default clientsRouter