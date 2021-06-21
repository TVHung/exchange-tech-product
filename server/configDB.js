import pkg from 'pg';
const { Client, Pool } = pkg;

var connectionString = "postgres://postgres:hung1309@localhost:1309/HealthCare";

const pool = new Pool({
  connectionString,
})
// pool.query('SELECT NOW()', (err, res) => {
//   // console.log(err, res)
//   pool.end()
// })

// const client = new Client({
//   connectionString,
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   // console.log(err, res)
//   client.end()
// })

export default pool