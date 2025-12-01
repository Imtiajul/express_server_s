import { create } from "domain";
import express, { Request, Response } from "express";
import {Pool} from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(), '.env')})

const app = express()
const port = 5000
const pool = new Pool({
connectionString: `${process.env.CONNECTION_STRING}`});

const createDB = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(15) UNIQUE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NOW()
    )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(200) NOT NULL,
      decription TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW()
      )`)
}

createDB();

// parser
app.use(express.json());

app.get('/', (req: Request, res:Response) => {
  res.send('Hello Next Lever Coders!')
})

app.post('/', (req: Request, res:Response) => {
  console.log(req.body);

  res.status(201).json({
    sucess: true,
    message: "Post data sended successfully"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})