const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Honey@1625",
    database:"crud_cms"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/api/get", (req,res)=>{
    const sqlGet = "SELECT * FROM entity";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});

app.post("/api/post", (req, res)=>{
    const {name, email, mobileNumber, dateOfBirth} = req.body;
    const sqlInsert = "INSERT INTO entity (name, email, mobileNumber, dateOfBirth) VALUES (?, ?, ? ,?)";
    db.query(sqlInsert, [name,email,mobileNumber,dateOfBirth], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:No", (req, res)=>{
    const { No } = req.params;
    const sqlRemove = "DELETE FROM entity WHERE No = ?";
    db.query(sqlRemove, No , (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:No", (req,res)=>{
    const{No} = req.params;
    const sqlGet = "SELECT * FROM entity where No = ?";
    db.query(sqlGet, No ,(error, result)=>{
        if(error)
            {
                console.log(error)
            }
        res.send(result);
    });
});

app.put("/api/update/:No", (req,res)=>{
    const{No} = req.params;
    const {name, email, mobileNumber, dateOfBirth} = req.body;
    const sqlUpdate = "UPDATE entity SET name= ?, email = ?, mobileNumber= ?, dateOfBirth = ? WHERE No = ?";
    db.query(sqlUpdate, [name, email, mobileNumber, dateOfBirth, No],(error, result)=>{
        if(error)
            {
                console.log(error)
            }
        res.send(result);
    });
});
app.get("/", (req, res)=>{
    
});
app.listen(5000, ()=>{
    console.log("server is running on port 5000");
})