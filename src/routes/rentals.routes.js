import { Router } from "express"
import { deleteRental, finishedRent, insertRent, rentalsList } from "../controllers/rentals.controllers.js"


const rentRouter = Router()

rentRouter.get("/rentals", rentalsList)
rentRouter.post("/rentals", insertRent)
rentRouter.post("/rentals/:id/return", finishedRent)
rentRouter.delete("/rentals/:id", deleteRental)



export default rentRouter