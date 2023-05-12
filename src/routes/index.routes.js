import { Router } from "express"
import gamesRouter from "./games.routes.js"
//importar as rotas de acesso ao banco 


const router = Router()
router.use(gamesRouter)

export default router