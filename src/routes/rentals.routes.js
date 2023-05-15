import { Router } from "express"
import { insertRent, rentalsList } from "../controllers/rentals.controllers.js"


const rentRouter = Router()

rentRouter.get("/rentals", rentalsList)
rentRouter.post("/rentals", insertRent)



export default rentRouter