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
        const returnObject = tabelaAlugueis.rows.map((item) => {
            const customer = {
                id: item.client_id,
                name: item.client_name                
            }
            const game = {
                id: item.game_id,
                name: item.game_name
            }
            return {
                id: item.id,
                customerId: item.customerId,
                gameId: item.gameId,
                rentDate: item.rentDate,
                daysRented: item.daysRented,
                returnDate: item.returnDate, 
                originalPrice: item.originalPrice,
                delayFee: item.delayFee,
                customer: customer,
                game: game                
            }             
        })
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
        SELECT * FROM games WHERE games.id = $1;
        `, [gameId])
        const priceDay = games.rows[0].pricePerDay

        const rentDate = dayjs().format("YYYY-MM-DD")
        const originalPrice = Number(priceDay*daysRented)
        const returnDate = null
        const delayFee = null

        if(games.rows[0].id != gameId || games.rows.stockTotal <= 0) return res.sendStatus(400)

        await db.query(`
            INSERT INTO rentals(
                "customerId", 
                "gameId",
                "rentDate",
                "daysRented", 
                "returnDate", 
                "originalPrice", 
                "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);
        `, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])
        res.sendStatus(201)

    } catch (err) {
        res.send(err.message)
    }
}

export async function finishedRent(req, res) {
    const {id} = req.params
    const today = dayjs().format("YYYY-MM-DD")

    try {
        const rentalList = await db.query(`
            SELECT * FROM rentals WHERE rentals.id = $1;
        `, [id])
        if(rentalList.rowCount === 0) return res.sendStatus(404)
        if(rentalList.rows[0].returnDate != null) return res.sendStatus(400)
        const rental = rentalList.rows[0]
        const totalDays = today - rental.rentDate
        const delayDays = totalDays - rental.daysRented

        if(delayDays > 0) {
            await db.query(`
                UPDATE rentals
                SET "delayFee" = $1, "returnDate" = $2
                WHERE rentals.id = $3;
            `,[delayDays*rental.pricePerDay, today, id])
        } else {
            await db.query(`
                UPDATE rentals 
                SET "returnDate" = $2
                WHERE rentals.id = $1
            `, [id, today])
        }
        res.sendStatus(200)        
        
    } catch(err) {
        res.send(err.message)
    }
}

export async function deleteRental(req, res) {
    const {id} = req.params

    try {
        const rentalList = await db.query(`
            SELECT * FROM rentals WHERE rentals.id = $1;            
        `, [id])
        if(rentalList.rowCount === 0) return res.sendStatus(404)
        if(rentalList.rows[0].returnDate === null) return res.sendStatus(400)

        await db.query(`
            DELETE FROM rentals WHERE rentals.id = $1
        `, [id])
        res.sendStatus(200)

    } catch (err) {
        res.send(err.message)
    }
}