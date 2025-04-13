const express = require('express');
const { open } = require("sqlite");
const sqlite3 = require('sqlite3');
const path = require("path");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

const dbPath = path.join(__dirname, "categoryAndUserDetails.db");
let db = null; 

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(port, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();



app.post("/signup", async (request, response) => {
  const { username, password, email } = request.body;
 console.log(username,password,email)
  const hasedPassword = await bcrypt.hash(password, 10); 
  const selectUserQuery = `SELECT * FROM userDetails WHERE user_name = '${username}'`;
  const dbUser = await db.get(selectUserQuery);
  // console.log(dbUser,"userDb")

  if (dbUser === undefined) {
    const createUserQuery = `INSERT INTO userDetails (user_name, password,email) 
    VALUES ('${username}', 
    '${hasedPassword}',
    '${email}')`;
    await db.run(createUserQuery);
    response.send("User created successfully");
  } else {
    response.status(400);
    response.send("User already exists");
  }
});

app.post("/login", async (request, response) => {
       const { username, password } = request.body;

    // console.log(username, password, "username,password")
    const selectUserQuery = `SELECT * FROM userDetails WHERE user_name  = '${username}'`;
    // console.log(selectUserQuery,"query")
    const dbUser = await db.get(selectUserQuery);
   
    if (dbUser === undefined) {
      response.status(400);
      response.send("Invalid User");
    } else {
      console.log(password,dbUser.password)
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
      
      if (isPasswordMatched === true) {
        const payLoad = {
          username: username,
        };
        const jwtToken = jwt.sign(payLoad,"jwt_secret_key");
        response.send({ jwtToken });
      } else {
        response.status(400);
        response.send("Invalid Password");
      }
    }
  });
  
  app.get("/categories",async (request,response) =>{
    const getCategoriesQuery = `SELECT * FROM categories`;
    const categories = await db.all(getCategoriesQuery)
   response.send(categories);
  })
