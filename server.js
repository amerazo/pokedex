//Dependencies
const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

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


//Root Route: GET
app.get('/', (req, res) => {
    res.redirect('/pokemon');
  });

//Index Route: GET
  app.get('/pokemon', (req, res) => {
    res.render('index.ejs');
  });

//New Route: GET
  app.get("/pokemon/new", (req, res)=>{
    res.render('new.ejs');
})

// Create route: POST
app.post('/pokemon', (req, res) => {
  });
  
// Edit route: GET
app.get('/pokemon/:id/edit', (req, res) => {
    //('edit.ejs')
  });
  
// Update route: PUT
app.put('/pokemon/:id', (req, res) => {
  });
  
// Destroy route: DELETE
app.delete('/pokemon/:id', (req, res) => {
});
  

//PORT
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});