import { create } from "domain";
import express, { NextFunction, Request, Response } from "express";
import {Pool} from "pg";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

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
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
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

// middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`);
 
  const log = `[${new Date().toISOString()}] ${req.method} ${req.path}\n`;
  fs.writeFile(path.join(process.cwd(), 'server.log'), log, {flag: 'a'}, (err) => {
    if(err) {
      console.log(err.message);
    }
  });
  // to proceed the next part
  next();
}

app.get('/', logger, (req: Request, res:Response) => {
  res.send('Hello Next Lever Coders!')
})

// users crud - insert user
app.post('/users', async (req: Request, res:Response) => {
  const {name, email} = req.body;
  try {
   const result = await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`, [name, email]);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Message could not be sent",
    })
  }
})
//users get crud
app.get('/users', logger, async (req: Request, res:Response) => {

  try {
   const result = await pool.query(`SELECT * FROM users`);
  //  console.log(result);
    res.status(200).json({
      success: true,
      message: "User data fetch successfully",
      data: result.rows,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Data could not be fetched",
      details: error,
    })
  }
})
//users get by id
app.get('/users/:id', async (req: Request, res: Response) => {
  // console.log(req.params.id);
  // res.send('Api is working coooly');

  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id]);
    
    if(result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "User data fetch successfully",
          data: result.rows[0],
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Data could not be fetched",
      details: error.message,
    })
    
  }
})
// users update by id
app.put('/users/:id', async (req: Request, res: Response) => {
  const {name, email} = req.body;

  try {
    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id = $3 RETURNING *`, [name, email, req.params.id]);
    
    if(result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "User data updated successfully",
          data: result.rows[0],
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "User could not be updated",
      details: error.message,
    })
    
  }
})
// users delete by id
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [req.params.id]);
    console.log(result);
    
    if(result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "User data deleted successfully",
          data: null,
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "User could not be deleted",
      details: error.message,
    })
    
  }
})

//todos crud - insert todo
app.post('/todos', async (req: Request, res:Response) => {
  const {user_id, title} = req.body;
  try {
   const result = await pool.query(`INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *`, [user_id, title]);
    res.status(201).json({
      success: true,
      message: "Todos created successfully",
      data: result.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Todos could not be added",
    })
  }
})
//todos get crud
app.get('/todos', async (req: Request, res:Response) => {

  try {
   const result = await pool.query(`SELECT * FROM todos`);
  //  console.log(result);
    res.status(200).json({
      success: true,
      message: "Todos data retrived successfully",
      data: result.rows,
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Data could not be fetched",
      details: error,
    })
  }
})
//todos get by id
app.get('/todos/:id', async (req: Request, res: Response) => {

  try {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [req.params.id]);
    console.log(result);
    if(result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todos not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "Todos fetch successfully",
          data: result.rows[0],
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Data could not be fetched",
      details: error.message,
    })
    
  }
})
// todos update by id
app.put('/todos/:id', async (req: Request, res: Response) => {
  const {title, id} = req.body;

  try {
    const result = await pool.query(`UPDATE todos SET title=$1 WHERE id = $2 RETURNING *`, [title, req.params.id]);
    
    if(result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "User data updated successfully",
          data: result.rows[0],
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "User could not be updated",
      details: error.message,
    })
    
  }
})
// todos delete by id
app.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM todos WHERE id = $1 RETURNING *`, [req.params.id]);
    console.log(result);
    
    if(result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "User data deleted successfully",
          data: null,
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "User could not be deleted",
      details: error.message,
    })
    
  }
})
// 404 route not found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})