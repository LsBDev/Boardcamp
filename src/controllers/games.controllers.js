// Tipo de obj {
//     id: 1,
//     name: 'Banco Imobiliário',
//     image: 'http://',
//     stockTotal: 3,
//     pricePerDay: 1500,
//   }
import { db } from "../database/database.connection.js";

export async function gameList(req, res) {
    try {
        const games = await db.query(`
            SELECT * FROM games;
        `)
        res.status(200).send(games.rows)

    } catch(err) {
        res.send(err.message)
    }
}

export async function insertGame(req, res) {
    const {name, image, stockTotal, pricePerDay} = req.body

    try {
        if(!name || stockTotal <= 0 || pricePerDay <= 0) return res.sendStatus(400)
        const gameExist = await db.query(`
            SELECT * FROM games WHERE name = $1;
        `, [name])
        if(gameExist) return res.sendStatus(409)

        await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);
        `, [name, image, stockTotal, pricePerDay])
        res.sendStatus(201)

    } catch(err) {
        res.send(err.message)
    }
}