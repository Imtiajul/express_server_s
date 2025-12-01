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

