import mariadb from 'mariadb'
import {user, cart} from '../model/user.model.js'
import 'dotenv/config'



const pool = mariadb.createPool({
    host: "159.223.89.24",
    user: "root",
    password: "c1vG7R34",
    database: "secondhandbook",
    port: 3306,
});

// const pool = mariadb.createPool({
//   host: process.env.DB_HOST, 
//   user:process.env.DB_USER, 
//   database:process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port:process.env.DB_PORT
// });

export const dbInit = async ()=>{
    try {
        const myData= await pool.getConnection();
        const rows = await myData.query("SELECT NOW ()");
        console.log(rows[0])
        await user();
        await cart ();
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export const query = async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.affectedRows })
    return res
  }