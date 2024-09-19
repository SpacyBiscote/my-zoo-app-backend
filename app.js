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





//Travail sur les middlewares
app.use(express.json());




app.post('/3000/Connexion', (req, res) => {
  const { email, password } = req.body;

  
  const query = 'SELECT * FROM utilisateur WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length > 0) {
      const user = results[0];
      if (user.email === 'admin@gmail.com' && user.password === 'admin12sdk') {
        const payload = { email: user.email, role: 'admin' };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
      } else {
        return res.status(401).json({ error: 'Accès non autorisé' });
      }
    } else {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
  });
});

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

// onglet service
app.post("/3000/Admins/service" , (req,res) => {
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

  app.delete ("/3000/Admins/service" , (req , res) => {
    const {supprimservice} = req.body;
    if (!supprimservice) {
      return res.status(400).send("Le champ supprimservice est requis");
  }
    const query = 'DELETE FROM service WHERE nom = ?';
    connection.query(query , [supprimservice], 
      (err,result) => {
        if (!err) {
          if (result.affectedRows > 0) {
              return res.json({ message: "Service supprimé avec succès", result });
          } else {
              return res.status(404).send("Service non trouvé");
          }
      }
    })
  })

  app.put("/3000/Admins/service" , (req,res) => {
    const {nommodifservice, imagemodifservice , descriptionmodifservice,anciennom} = req.body;
    const query = 'UPDATE service SET nom = ? , image_service = ?, description = ? WHERE nom = ?' ; 

    connection.query(query , [nommodifservice, imagemodifservice , descriptionmodifservice, anciennom],
      (err , result) => {
        if(!err) {
          return res.json(result);
        }else{
          res.status(404).send("Error lors des chargemement de valeur");
        }
      }
    )
  })
// onglet Habitat
app.post("/3000/Admins/habitat" , (req,res) => {
  const { imageajouthabitat, nomajouthabitat, descriptionajouthabitat } = req.body;
  const query = 'INSERT INTO habitat (image_habitat, nom, description) VALUES (?,?,?)';
  connection.query(query, [imageajouthabitat, nomajouthabitat, descriptionajouthabitat] ,
    (err ,result) => {
      if(!err) {
        return res.json(result);
      }else{
        res.status(404).send("Error lors des chargemement de valeur");
      }
    }
   )})

   app.delete ("/3000/Admins/habitat" , (req , res) => {
    const {supprimhabitat } = req.body;
    /*if (!supprimhabitat) {
      return res.status(400).send("Le champ supprimhabitat est requis");
  }*/
    const query = 'DELETE FROM habitat WHERE nom = ?';
    connection.query(query , [supprimhabitat], 
      (err,result) => {
        if (!err) {
          if (result.affectedRows > 0) {
              return res.json({ message: "Habitat supprimé avec succès", result });
          } else {
              return res.status(404).send("Habitat non trouvé");
          }
      }
    })
  })

  app.put("/3000/Admins/habitat" , (req,res) => {
    const {imagemodifhabitat,nommodifhabitat, descriptionmodifhabitat, anciennomhabitat} = req.body;
    const query = 'UPDATE habitat SET nom = ? , image_habitat = ?, description = ? WHERE nom = ?' ; 

    connection.query(query , [imagemodifhabitat,nommodifhabitat, descriptionmodifhabitat, anciennomhabitat],
      (err , result) => {
        if(!err) {
          return res.json(result);
        }else{
          res.status(404).send("Error lors des chargemement de valeur");
        }
      }
    )
  })

//Onglet animal
 app.post("/3000/Admins/animaux" , (req,res) => {
  const { imageajoutanimal, nomajoutanimal, disposeajoutanimal, habitatajoutanimal} = req.body;
  const query = 'INSERT INTO animal (animal_image, prenom, dispose , detient) VALUES (?,?,?)';
  connection.query(query, [imageajoutanimal, nomajoutanimal, disposeajoutanimal, habitatajoutanimal] ,
    (err ,result) => {
      if(!err) {
        return res.json(result);
      }else{
        res.status(404).send("Error lors des chargemement de valeur");
      }
    }
   )})
 
   app.delete ("/3000/Admins/animaux" , (req , res) => {
    const {supprimanimal } = req.body;
    const query = 'DELETE FROM animal WHERE nom = ?';
    connection.query(query , [supprimanimal], 
      (err,result) => {
        if (!err) {
          if (result.affectedRows > 0) {
              return res.json({ message: "animal supprimé avec succès", result });
          } else {
              return res.status(404).send("animal non trouvé");
          }
      }
    })
  })

  app.put("/3000/Admins/animaux" , (req,res) => {
    const {anciennomanimal,nommodifanimal, imagemodifanimal, disposemodifanimal,habitatmodifanimal } = req.body;
    const query = 'UPDATE animal SET nom = ? , animal_image = ?, prenom = ? , dispose = ? , detient = ?  WHERE nom = ?' ; 
    console.log(req.body)
    connection.query(query , [anciennomanimal,nommodifanimal, imagemodifanimal, disposemodifanimal,habitatmodifanimal],
      (err , result) => {
        if(!err) {
          return res.json(result);
        }else{
          res.status(404).send("Error lors des chargemement de valeur");
        }
      }
    )
  })


   //AJOUT User
   app.post("/3000/Admins/users" , (req,res) => {
    const {emailajoutuser ,passwordajoutuser,roleuser } =req.body;
    const query = 'INSERT INTO user (email , password , possede ) VALUES (?,?,?)';
    connection.query(query , [emailajoutuser ,passwordajoutuser,roleuser ],
      (err,result) => {
        if(!err) {
          return res.json(result);
        }else{
          res.status(404).send("Error lors des chargemement de valeur");
        }
      }
    )
   })



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
 
 app.get("/3000/Housing/animaux" , (req,res) => {
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

