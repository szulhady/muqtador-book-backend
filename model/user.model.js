import { query } from "../database/connection.js"

export const user = async ()=>{
    try {
        await query (`CREATE TABLE IF NOT EXISTS users ( userID  SERIAL PRIMARY KEY, name varchar(255) not null, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL UNIQUE, created_at TIMESTAMP DEFAULT NOW())`)
        console.log('User table created')
        
    } catch (error) {
        console.log('failed created the user table')
    }
}

export const cart = async ()=>{
    try {
        await query(`CREATE TABLE IF NOT EXISTS books (
            bookId INT AUTO_INCREMENT PRIMARY KEY,
            userId INT, 
            bookName VARCHAR(255) NOT NULL,
            publisher VARCHAR(255),
            year INT,
            price DECIMAL(10, 2),
            url VARCHAR(255),
            created_at TIMESTAMP DEFAULT NOW()
          );`)
    } catch (error) {
        console.log('failed created the user table')
    }
}


