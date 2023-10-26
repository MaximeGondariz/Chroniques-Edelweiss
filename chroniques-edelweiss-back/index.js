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

  //
  // Commande JDR
  //==========================
  // Récupère les jdrs
  //
  app.get("/jdrs", async (req, res) => {
    try {
        const jdrs = await JdrModel.find({});
        res.json(jdrs);
    } catch (err) {
        res.status(500).send(err.message);
    }
  });

  // Création d'un nouveau utilisateur
  //
  app.post("/jdrs/create", async (req, res) => {
    try {
        var data = req.body;
        console.log(data,'DATA', req.body, 'BODY')
        const newJdr = new JdrModel({
          name: data.name,
          description: data.description,
          date_prochaine_seance: undefined
        })
        newJdr.save();
        res.status(201).send(JSON.stringify('Saved !'));
    } catch (err) {
        res.status(500).send(err.message);
    }
  });

  // Change le jdr via la fenètre des administrateurs
  //
  app.put('/jdrs/modify', async (req, res) => {
    try{
      var data = req.body;
      await JdrModel.findByIdAndUpdate(data._id, data)
      res.send(JSON.stringify('Saved !'))
    }catch (err) {
      res.status(500).send(err.message);
    }
  })

  // Supprime un JDR
  //
  app.delete('/jdrs/delete', async (req, res) => {
    try{
      var data = req.body;
      const filter = {
        name: data.name
      }

      await JdrModel.findOneAndRemove(filter);

      res.send(JSON.stringify('Deleted'))
    }catch (err) {
      res.status(500).send(err.message);
    }
  })

  //
  // Commande users
  //==========================
  // Récupère tous les utilisateurs
  //
  app.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
  });

  // Création d'un nouveau utilisateur
  //
  app.post("/users/signin", async (req, res) => {
    try {
        var data = req.body;
        const Users = await UserModel.find({});
        const newUser = new UserModel({
            id: Users.length,
            pseudo: data.pseudo,
            email: data.email,
            password: data.password,
            status: data.status,
            flowers: 0
        })
        newUser.save();
        res.status(201).send(JSON.stringify('Saved !'));
    } catch (err) {
        res.status(500).send(err.message);
    }
  });

  // Vérifie si l'email est déjà utilisé
  //
  app.post('/users/checkSignin', async (req, res) => {
    var data = req.body;
    const Users = await UserModel.find({});
    let alreadyInUse = false;

    Users.forEach(user => {
      if(user.email === data.email){
        alreadyInUse = true;
      }
    })
    res.send(JSON.stringify(alreadyInUse))
  })

  // Vérifie les identifiants envoyé est connecte l'utilisateur si les identifiants sont bons
  // 
  app.post('/users/login', async (req, res) => {
    try{
      var data = req.body;
      const filter = {
        email: data.email,
        password: data.password
      }
      const user = await UserModel.findOne(filter);
      let connection = false;

      if(user){
        connection = true
        connectedUser = user
      }
    
      res.send(JSON.stringify(connection))
    }catch (err) {
      res.status(500).send(err.message);
    }
  })

  // Vérifie si un utilisateur est connécter
  //
  app.get('/users/checklogin', async (req, res) =>{
    if(connectedUser != undefined){
      res.send(connectedUser)
    }else{
      res.send(undefined)
    }
  })

  // Déconnecte l'utilisateur
  //
  app.get('/users/logout', async (req, res) => {
    connectedUser = undefined
    res.send(JSON.stringify(false))
  })

  // Change le status de l'utilisateurs
  //
  app.put('/users/status', async (req, res) => {
    try{
      var data = req.body;
      const filter = {
        email: data.email,
        password: data.password
      }

      console.log(data);
      
      await UserModel.findOneAndUpdate(filter, data);

      res.send(JSON.stringify('Saved !'))
    }catch (err) {
      res.status(500).send(err.message);
    }
  })

  // Change l'utilisateur via la fenètre des administrateurs
  //
  app.put('/users/modify', async (req, res) => {
    try{
      var data = req.body;

      await UserModel.findByIdAndUpdate(data._id, data);

      res.send(JSON.stringify('Saved !'))
    }catch (err) {
      res.status(500).send(err.message);
    }
  })

  // Supprime un utilisateur
  //
  app.delete('/users/delete', async (req, res) => {
    try{
      var data = req.body;
      const filter = {
        email: data.email,
        password: data.password
      }

      await UserModel.findOneAndRemove(filter);

      res.send(JSON.stringify('Deleted'))
    }catch (err) {
      res.status(500).send(err.message);
    }
  })

  // Démarrage de l'app Express
  app.listen(8000, () =>
    console.log(`Server running at http://localhost:8000/`)
  );
}