require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs')
const cors = require('cors')
const app=express();

const users = require("./Mock_Data.json")
const PORT = process.env.PORT 
const corsURL = process.env.REACT_URL

app.use(
    cors({
        origin: corsURL
    })
)

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


/* To Fetch all the data from users*/
app.get("/users", (req,res) => { 
return res.json(users)
})


/* To Fetch all the data from users id, where id is dynamic*/

app.get("/users/:apiid", (req,res) => {
    const apiid = Number(req.params.apiid);
    const user = users.find((user) => user.id === apiid)
    if(user)
        return(res.json(user))
    else
    return(res.json(" "))
})

/* To add new data*/

app.post("/users", (req,res) =>{
    const body = req.body;
    console.log(body);
    users.push({id: users.length +1,
        first_name: body.first_name,
        last_name: body.first_name,
        email: body.email,
        password:body.password,
        gender:body.gender
    });
    fs.writeFile("./Mock_Data.json", JSON.stringify(users), (err,data) => { const logging = "SUMITED SUCCFULLY " + body.first_name
        return res.json(logging)})
   
})

app.listen(PORT, () => console.log("Server started at Post " + PORT))