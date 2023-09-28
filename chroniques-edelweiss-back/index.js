import express from "express";
import mongoose from "mongoose";
import cors from "cors"

mongoose.set('strictQuery', true);

// Connexion à la base de données
mongoose
  .connect("mongodb://localhost:27017/edelweiss", {
    useNewUrlParser: true,
    useUnifiedTopology: true, // options qui évitent des warnings inutiles
  })
  .then(init); // Toutes les méthodes de mongoose renvoient des promesses

async function init() {
  // Création d'un schéma
  const UserSchema = new mongoose.Schema({
    id: Number,
    pseudo: String,
    email: String,
    password: String,
    status: String,
    flowers: Number
  })

  const JdrSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    date_prochaine_seance: Date
  })

  // Création d'un objet Modèle basé sur le schéma
  const UserModel = mongoose.model("users", UserSchema)
  const JdrModel = mongoose.model("jdr", JdrSchema)

  var connectedUser = undefined
  // Initialisation de l'app Express
  const app = express();

  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(cors())

  // On interroge la base de données et on récupère tous les documents liés à la collection cats
  // ==========================
  app.get("/", async (req, res) => {
    try {
        // la méthode .find() du Modèle permet de récupérer les documents
        const docs = await JdrModel.find({});
        res.json(docs);
    } catch (err) {
        res.status(500).send(err.message);
    }
  });

  app.get("/users", async (req, res) => {
    try {
        // la méthode .find() du Modèle permet de récupérer les documents
        const docs = await UserModel.find({});
        res.json(docs);
    } catch (err) {
        res.status(500).send(err.message);
    }
  });

  // Création d'un nouveau document
  // ==========================
  app.post("/users/signin", async (req, res) => {
    try {
        var data = req.body;
        const Users = await UserModel.find({});
        const newUser = new UserModel({
            id: Users.length,
            pseudo: data.pseudo,
            email: data.email,
            password: data.password,
            status: 'player',
            flowers: 0
        })
        newUser.save();
        res.status(201).send("Saved!");
    } catch (err) {
        res.status(500).send(err.message);
    }
  });

  app.post('/users/checkSignin', async (req, res) => {
    var data = req.body;
    const Users = await UserModel.find({});
    let connection = false;

    Users.forEach(user => {
      if(user.email == data.email){
        connection = true
      }
    })
    
    res.send(JSON.stringify(connection))
  })

  app.post('/users/login', async (req, res) => {
    try{
      var data = req.body;
      const Users = await UserModel.find({});
      let connection = false;

      Users.forEach(user => {
      if(user.email == data.email && user.password == data.password){
        connection = true
        connectedUser = {
          id: user.id,
          pseudo: user.pseudo,
          email: user.email,
          password: user.password,
          status: user.status,
          flowers: user.flowers
        }
      }
      })
    
      res.send(JSON.stringify(connection))
    }catch (err) {
      res.status(500).send(err.message);
    }
  })

  app.get('/users/checklogin', async (req, res) =>{
    if(connectedUser != undefined){
      res.send(connectedUser)
    }else{
      res.send(undefined)
    }
  })

  app.get('/users/logout', async (req, res) => {
    connectedUser = undefined
    res.send(JSON.stringify(false))
  })

  // Démarrage de l'app Express
  app.listen(8000, () =>
    console.log(`Server running at http://localhost:8000/`)
  );
}