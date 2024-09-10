const express = require('express')
const app = express(); 
const port = 8082;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const cors = require('cors');
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


/*const authadmin = () => {
    if(email !== admin.email) {
      return  res.status(404).json({ message: "mot de passe ou/et utilisateur incorrect" });
    }

    const isPasswordValid = bcrypt.compareSync(password, admin.password);
    if (!isPasswordValid) {
    return res.status(404).json({ message: "mot de passe ou/et utilisateur incorrect" });
  }
}*/


//Travail sur les middlewares
app.use(express.json());

//on intercepte la requête envoyé depuis le react et renvoie si c'est bon
app.post("/3000/Connexion" , (req ,res) => {
  const dataadmin = req.body
  console.log(dataadmin);
  if(req.body.email === admin.email && req.body.password === admin.password ) {
    return res.json(token1);
  } else {
    return res.send("erreur de connexion") ;
 }
  
})

//redirection vers la page admin avec react router 
app.use("/admin" , (req, res , next) => 
    res.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac ligula eu ligula tincidunt aliquet. Suspendisse eget magna vel erat sodales mollis. Nam commodo sapien eget metus congue, a interdum elit convallis. Ut sit amet augue eu justo lobortis vehicula non nec justo. Donec dictum sem id ligula auctor, quis rutrum libero hendrerit. Vivamus pulvinar sapien et sem luctus, nec consectetur erat ullamcorper. Vestibulum fringilla justo sed ipsum fringilla, ac finibus velit varius. Nam vehicula")
)

app.get("/" , (req,res) => res.send("Hello express 6")) 

app.listen(port , () => console.log(`Notre application est démarré sur : http://localhost:${port}`))