const express = require('express')
const app = express(); 

const port = 8081; 



app.get("/" , (req,res) => res.send("Hello express 4 ")) 

app.listen(port , () => console.log(`Notre application est démarré sur : http://localhost:${port}`))