import { Router } from "express"
import { gameList } from "../controllers/games.controllers.js"

const gamesRouter = Router()

gamesRouter.get("/games", gameList)
// gamesRouter.get("/games", o esquema entra aqui pra validar (middleware) , gameList)


export default gamesRouter
