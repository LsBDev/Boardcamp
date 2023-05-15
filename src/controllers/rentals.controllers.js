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
    // daysRented: 3, // por quantos dias o cliente agendou o aluguel
    //rentDate:  '2021-06-20'  dayjs().format("YYYY-MM-DD")     
    // returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
    // originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
    // delayFee: null 

    try {
        await db.query(`
            INSERT INTO rentals("customerId", "gameId", "daysRented") VALUES ($1, $2, $3);
        `, [customerId, gameId, daysRented])
        res.sendStatus(200)

    } catch (err) {
        res.send(err.message)
    }
}