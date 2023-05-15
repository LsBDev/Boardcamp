import { db } from "../database/database.connection.js";
import dayjs from "dayjs";


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

export async function specificCustomer(req, res) {
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

    if(birthday !== dayjs(birthday).format("YYYY-MM-DD")) return res.sendStatus(400)

    const cpfRegex = /^\d{11}$/
    if(!cpfRegex.test(cpf) || 11 < phone.length || phone.length < 10 || !name) return res.sendStatus(400)

    try {
        const customerExist = await db.query(`
            SELECT * FROM customers WHERE cpf = $1
        `, [cpf])
        if(customerExist.rowCount !== 0) return res.status(409).send("Cliente já possui cadastro!")

        await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);
        `, [name, phone, cpf, birthday])
        res.sendStatus(201)

    } catch(err) {
        res.send(err.message)
    }
}

export async function updateCustomer(req, res) {
    const {id} = req.params
    const {name, phone, cpf, birthday} = req.body

    const cpfRegex = /^\d{11}$/
    if(!cpfRegex.test(cpf) || 11 < phone.length || phone.length < 10 || !name) return res.sendStatus(400)

    try {
        const cpfExist = await db.query(`
            SELECT * FROM customers WHERE customers.cpf = $1 AND customers.id <> $2;
        `, [cpf, id])
        if(cpfExist.rowCount !== 0) return res.status(409).send("Conflito de cpf!")

        await db.query(`
            UPDATE customers SET name = $2, phone = $3, cpf = $4, birthday = $5
            WHERE id = $1;
        `,[id, name, phone, cpf, birthday])
        res.sendStatus(200)
    } catch(err) {
        res.send(err.message)
    }
}
