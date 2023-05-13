// {
//     id: 1,
//     name: 'João Alfredo',
//     phone: '21998899222',
//     cpf: '01234567890',
//     birthday: '1992-10-25'
// } tabela customers

import dayjs from "dayjs";
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
        if(client.rowCount === 0) return res.sendStatus(404)
        res.status(200).send(client.rows)

    } catch(err) {
        res.send(err.message)
    }
}

export async function insertCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body

    if(!name) return res.sendStatus(400)
    // if(birthday !== dayjs(birthday).format("YYYY:MM:DD")) return res.status(400).send("caiu aqui!")
    try {
        const customerExist = await db.query(`
            SELECT * FROM customers WHERE cpf = $1
        `, [cpf])
        if(customerExist.rowCount !== 0) return res.status(409).send("Cliente já possui cadastro!")

        await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday) VALUES($1, $2, $3, $4);
        `, [name, phone, cpf, birthday])
        res.sendStatus(201)

    } catch(err) {
        res.send(err.message)
    }
}
