import pool from '../configDB.js';

export const getAllUsers = async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message)
    }
}

export const createUser = async (req, res) => {
    try {
        res.send(req.body);
        const user = req.body
        const newUser = await pool.query(
            "INSERT INTO users (id, name, password) VALUES ($1, $2)", [user.id, user.name, user.password]
        )
        res.json(newUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
}

export const getDetailUser = async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message)
    }
}

export const updateUser = async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message)
    }
}

export const deleteUser = async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message)
    }
}
