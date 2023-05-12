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