import express from 'express'
import { createUser, deleteUser, getAllUsers, getDetailUser, updateUser } from '../controllers/users.js'
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getDetailUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


export default router