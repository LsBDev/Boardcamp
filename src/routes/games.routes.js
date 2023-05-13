import { Router } from "express"
import { gameList, insertGame } from "../controllers/games.controllers.js"

const gamesRouter = Router()

gamesRouter.get("/games", gameList)
gamesRouter.post("/games", insertGame)
// gamesRouter.get("/games", o esquema entra aqui pra validar (middleware) , gameList)


export default gamesRouter
