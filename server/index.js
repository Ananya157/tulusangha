const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'mysql',
    username: 'AataDB21',
    password: 'Aata2021@',
    database: 'db_aata'
})

app.get("/", (req, res) => {
    const sqlquery = "INSERT INTO `Members` (`ID`, `Name`, `SpouseName`, `Address`, `City`, `State`, `ZIP`, `MemType`, `Email`, `Phone`, `P-Method`) VALUES (NULL, 'Ananya', NULL, 'Austin', 'Austin', 'Texas', '78735', 'Individual', 'an@g.com', '2077666642', 'paypal');)"
    db.query(sqlquery, (err, result) =>{
        console.log(err.message)
    })
   
})
app.listen(3001, () =>{
    console.log("Running on 3001");
});