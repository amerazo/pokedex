// //Dependencies
const express = require('express');
const app = express();
const PORT = 3000;
const methodOverride = require('method-override');
//Declaring pokemon from models/pokemon.js
const pokemon = require("./models/pokemon.js");

// Middleware
app.set('view engine', 'ejs');
//View Engine Template Engine
app.use(express.static('public'));
//Tells app to look for static files in the public directory. 
app.use(express.urlencoded({ extended:false }));
//Adds to the req.body object. This middleware is required to access the form data submitted in a POST request.
app.use(express.json());
//https://expressjs.com/en/resources/middleware/method-override.html#:~:text=Lets%20you%20use%20HTTP%20verbs,client%20doesn't%20support%20it.
app.use(methodOverride("_method")); 
//HTML forms only support GET and POST methods. MethodOverride is used to be able to utilize PUT and DELETE routes.


//Root Route: GET
app.get('/', (req, res) => {
    res.redirect('/pokemon');
  });

//Index Route: GET
  app.get('/pokemon', (req, res) => {
    //Declaring pokemon to render images
    res.render('index.ejs', {pokemon});
  });

//New Pokemon: GET
  app.get("/pokemon/new", (req, res)=>{
    res.render('new.ejs');
})

// New Pokemon: POST
app.post('/pokemon', (req, res) => {
  // too much to find all the data elements, doing partial data entry
  const { name, img, type, misc, stats } = req.body;
  const newPokemon = {
    name: name || "",
    img: img || "",
    type: type || "",
    misc: misc || {},
    stats: stats || {},
  };
  pokemon.push(newPokemon);
  res.redirect('/pokemon');
});


//Show Individual Pokemon Route: GET
app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const foundPokemon = pokemon.find(pokemon => pokemon.id === id);
  res.render('show', { pokemon: foundPokemon });
});


//Edit Individual Pokemon Route: GET
app.get('/pokemon/:id/edit', (req, res) => {
  const id = req.params.id;
  const foundPokemon = pokemon.find(pokemon => pokemon.id === id);
  res.render('edit', { pokemon: foundPokemon });
});

// Edit UPDATE: PUT
app.put('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  //function created an object called "updatedPokemon" which contains all the updated information for the Pokémon. 
  const updatedPokemon = {
    id: id,
    name: req.body.name,
    img: req.body.img,
    //Type property of the updatedPokemon object is split into an array using ", ".
    //  Due to orig data being received as a string with comma-separated values.
    type: req.body.type.split(', '),
    misc: {
      height: req.body.height,
      weight: req.body.weight,
      abilities: {
        normal: req.body.abilities.split(', '),
        hidden: [req.body.hidden_ability]
      }
    },
    stats: {
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      spattack: req.body.spattack,
      spdefense: req.body.spdefense,
      speed: req.body.speed
    }
  };
  //function findss the index of the Pokémon with the given ID in the "pokemon" array via "findIndex" method. 
  //== Pokemon is found, the "pokemon" array is updated with the new information for the Pokémon.
  const index = pokemon.findIndex(pokemon => pokemon.id === id);
  if (index !== -1) {
    pokemon[index] = updatedPokemon;
  }
  res.redirect('/pokemon');
});



//Destroy Route: DELETE
app.delete('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const deletedPokemon = pokemon.find(pokemon => pokemon.id === id);
  const index = pokemon.indexOf(deletedPokemon);
  //Splice method is built via JS to add or remove elements from an array. 
  pokemon.splice(index, 1);
  res.redirect('/pokemon');
});

//PORT
app.listen(PORT, () => {
  console.log(`Server listening on port 3000 ${PORT}`);
});
