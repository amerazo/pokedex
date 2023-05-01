//Dependencies
const express = require('express');
const app = express();
const port = 3000;

//Root Route
app.get('/', (req, res) => {
    res.redirect('/pokemon');
  });

//Index Route
  app.get('/pokemon', (req, res) => {
    res.render('index.ejs');
  });
  

//PORT
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});