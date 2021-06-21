import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import users from './routers/users.js'

const app = express()
const PORT = process.env.port || 5000

app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))        //gioi han dung luong co the submit len server
app.use(cors())                                             //tat ca route deu di qua cors

app.use('/users', users)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
