const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


// Pagina principale
app.get('/home', (req, res) => {
  res.render('index');
});

//////// FILIALE ///////

// Visualizza tutte le filiali
app.get('/filiali', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM filiale;');
    res.render('filiali', { filiali: rows });
    // res.json({ rows })
  } catch (error) {
    console.error('Errore nella query:', error);
    res.status(500).send('Errore nel server');
  }
});

app.get('/api/filiali', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM filiale;');
    res.json(rows)
  } catch (error) {
    console.error('Errore nella query:', error);
    res.status(500).send('Errore nel server');
  }
});

// Aggiungi una nuova filiale
app.post('/filiali', async (req, res) => {
  const {indirizzo, city, cap } = req.body;
  try {
    await pool.query('INSERT INTO filiale (indirizzo, city, cap) VALUES ($1, $2, $3)', [indirizzo, city, cap]);
    res.redirect('/filiali');
  } catch (error) {
    console.error('Errore nella query:', error);
    res.status(500).send('Errore nel server');
  }
});

// Elimina una filiale
app.post('/filiali/delete/:id', async (req, res) => {
  const filialeId = req.params.id;
  try {
    await pool.query('DELETE FROM filiale WHERE codice = $1', [filialeId]);
    res.redirect('/filiali');
  } catch (error) {
    console.error('Errore nella query:', error);
    res.status(500).send('Errore nel server');
  }
});


//// AUTOMEZZI //////

// Visualizza tutti gli automezzi
app.get('/automezzi', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM automezzo');
    res.render('automezzi', { automezzi: rows });
    // res.json({ rows })
  } catch (error) {
    console.error('Errore nella query:', error);
    res.status(500).send('Errore nel server');
  }
});

app.get('/api/automezzi', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM automezzo');
    res.json(rows)
  } catch (error) {
    console.error('Errore nella query:', error);
    res.status(500).send('Errore nel server');
  }
});

// Aggiungi un nuovo automezzo
app.post('/automezzi', async (req, res) => {
  const { targa, marca, modello, filiale_codice } = req.body;
  try {
    await pool.query('INSERT INTO automezzo (targa, marca, modello, filiale_codice) VALUES ($1, $2, $3, $4)', [targa, marca, modello, filiale_codice]);
    res.redirect('/automezzi');
  } catch (error) {
    console.error('Errore nella query:', error);
    res.status(500).send('Errore nel server');
  }
});

// Elimina un automezzo
app.post('/automezzi/delete/:id', async (req, res) => {
  const automezzoId = req.params.id;
  try {
    await pool.query('DELETE FROM automezzo WHERE codice = $1', [automezzoId]);
    res.redirect('/automezzi');
  } catch (error) {
    console.error('Errore nella query:', error);
    res.status(500).send('Errore nel server');
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});