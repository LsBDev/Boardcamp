import { Router } from "express"
import gamesRouter from "./games.routes.js"
import clientsRouter from "./clients.routes.js"
//importar as rotas de acesso ao banco 


const router = Router()
router.use(gamesRouter)
router.use(clientsRouter)

export default router