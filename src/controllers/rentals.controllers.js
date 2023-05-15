import dayjs from "dayjs"
import { db } from "../database/database.connection.js"


export async function rentalsList(req, res) {

    try {
        const tabelaAlugueis = await db.query(`
        SELECT  
            rentals.*,
            customers.id AS client_id, 
            customers.name AS client_name, 
            games.id AS game_id,
            games.name AS game_name
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;
        `)
        console.table(tabelaAlugueis.rows)
        res.status(200).send(tabelaAlugueis.rows)

    } catch (err) {
        res.send(err.message)
    }
}

export async function insertRent(req, res) {
    const {customerId, gameId, daysRented} = req.body

    if(daysRented <= 0) return res.sendStatus(400)    
    
    try {
        const games = await db.query(`
        SELECT * FROM games;
        `)
        const priceDay = games.rows.pricePerDay

        const rentDate = dayjs().format("YYYY-MM-DD")
        const originalPrice = priceDay*daysRented
        const returnDate = null
        const delayFee = null

        if(games.rows.id !== gameId || games.rows.stockTotal <= 0) return res.sendStatus(400)

        await db.query(`
            INSERT INTO rentals(
                "customerId", 
                "gameId",
                "rentDate",
                "daysRented", 
                "originalPrice", 
                "returnDate", 
                "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);
        `, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])
        res.sendStatus(200)

    } catch (err) {
        res.send(err.message)
    }
}