import { Router } from "express"
import { finishedRent, insertRent, rentalsList } from "../controllers/rentals.controllers.js"


const rentRouter = Router()

rentRouter.get("/rentals", rentalsList)
rentRouter.post("/rentals", insertRent)
rentRouter.post("/rentals/:id/return", finishedRent)



export default rentRouter