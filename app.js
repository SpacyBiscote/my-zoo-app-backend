const express = require('express')
const app = express(); 
const port = 8082;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const cors = require('cors');
const connection = require('./BDD/database');
app.use(cors({
    origin: 'http://localhost:3000' ,
    credentials: true
  }));


//admin
const admin = {
    email : "admin@gmail.com",
    password : "admin12sdk"
}

//Connexion avec le JWT token pour l'admin

const JWT_SECRET = 'secretadmin@key';

const payload1 = {email : "admin@gmail", role :"admin"};

const token1 = jwt.sign(payload1 , JWT_SECRET , {expiresIn : '1h'}); 



//Travail sur les middlewares
app.use(express.json());


//Page CONNEXION
app.post("/3000/Connexion" , (req ,res) => {
  const dataadmin = req.body
  console.log(dataadmin);
  if(req.body.email === admin.email && req.body.password === admin.password ) {
    return res.json(token1);
  } else {
    return res.send("erreur de connexion") ;
 }
  
})

//PAGE SERVICE
app.get("/3000/Services" , (req,res) => {
  connection.query('SELECT * FROM service', (err, result) => {
    if(!err) {
      return res.json(result);
    }else{
      res.status(404).send("ERROR lors des chargement des ressources");
    }
  })
})

//PAGE ADMINS
app.post("/3000/Admins" , (req,res) => {
  const { imageajoutservice, nomajoutservice, descriptionajoutservice } = req.body;

  const query = `INSERT INTO service (image_service, nom, description) VALUES (?,?,?)`;
  connection.query(query, [imageajoutservice, nomajoutservice, descriptionajoutservice] ,
    (err ,result) => {
      if(!err) {
        return res.json(result);
      }else{
        res.status(404).send("Error lors des chargemement de valeur");
      }
    }
   )})

 //page Habitat 
 app.get("/3000/Housing" , (req,res) => {
  connection.query('SELECT * FROM habitat' , (err , result) => {
    if(!err){
      return res.json(result);
    }else{
      res.status(404).send("Error lors des changements de valeur");
    }
  })
 })
 
 app.get("/3000/Housing/${habitatId}/animals" , (req,res) => {
  connection.query('SELECT * FROM animal' , (err , result) => {
    if(!err){
      return res.json(result);
    }else{
      res.status(404).send("Error lors des changements de valeur");
    }
  })
 })



 //PAGE HOME 

 app.post ("/3000" , (req,res) => {
  const {pseudo , avis} = req.body

  const query = `INSERT INTO avis (pseudo , commentaire ) VALUES (?,?)`;

  connection.query(query , [pseudo , avis],
    (err ,result) => {
      if(!err) {
        return res.json(result);
      }else{
        res.status(404).send("Error lors des chargemement de valeur");
      }
    }
  )
 })


//redirection vers la page admin avec react router 
app.use("/admin" , (req, res , next) => 
    res.send("Vous êtes connecté en tant qu'admin")
)

app.get("/" , (req,res) => res.send("Hello express 6")) 

app.listen(port , () => console.log(`Notre application est démarré sur : http://localhost:${port}`))

