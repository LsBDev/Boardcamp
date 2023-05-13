// {
//     id: 1,
//     name: 'João Alfredo',
//     phone: '21998899222',
//     cpf: '01234567890',
//     birthday: '1992-10-25'
// } tabela customers

import { db } from "../database/database.connection.js";


export async function clientsList(req, res) {
    try {
        const customersList = await db.query(`
            SELECT * FROM customers;
        `)
        res.status(200).send(customersList.rows)

    } catch(err) {
        res.send(err.message)
    }
}

export async function specificCLient(req, res) {
    const {id} = req.params

    try {
        const client = await db.query(`
            SELECT * FROM customers WHERE id = $1;
        `, [id])
        res.status(200).send(client.rows)

    } catch(err) {
        res.send(err.message)
    }
}