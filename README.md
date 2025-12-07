## 12-1 Create a simple server with express.js & typescript

- First all package
npm init -y
npm install express --save
npm i -D typescript
npx tsc --init

- confiq tsc file
comment out jsx & varTimModuleSyntex

- config package.json
we could remove type declartion bacause we it in tsconfig.json

- To run node file continuously
npm i -D tsx

- add script to package.js
npx tsx watch "filePath"

## 12-2 Installing Postgres as database

- to get json data from client using parser
```typescript
app.use(express.json())
```

- install pool 
```javascript
npm i pg
 ```

## 12-4 Solve the previous error, add .env & connect with GitHub

- install dotenv package
```javascript
npm i dotenv
```
## 12-5 Create our first User using POST
create user DB

```SQL
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
```

## 12-6 Getting All Users & single user using params

```SQL
`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]
`SELECT * FROM users WHERE id = $1`, [req.params.id]

```


```SQL
`DELETE FROM users WHERE id = $1`, [req.params.id]

```


## 12-9 Not Found Route & Middleware

- not found 
```typescript
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
});
```
- middleware 

```typescript
const logger = app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`);
  // to proceed the next part
  next();
})
```

------------------------------------------------------------------------------------

# [Modular Pettern, Authentication, Authorizaton](https://github.com/Apollo-Level2-Web-Dev/express_server/tree/modular-demo)

## 13-2 Why Configuration Is Important?
We will move env & DB file to config

env, db -> config

route.ts - middleware -> controller.ts -> service.ts 

route.ts    - work as router. Here we use moduler pattern
middleware  - we can modify, filter, update req, res data with middleware
controller  - handle request, response
service     - business logic


# [Modular Pettern, Authentication, Authorizaton](https://github.com/Apollo-Level2-Web-Dev/express_server/tree/modular-demo)

## 13-2 Why Configuration Is Important?
We will move env & DB file to config

env, db -> config

route.ts - middleware -> controller.ts -> service.ts 

route.ts    - work as router. Here we use moduler pattern
middleware  - we can modify, filter, update req, res data with middleware
controller  - handle request, response
service     - business logic
