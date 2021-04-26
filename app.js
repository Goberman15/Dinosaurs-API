const express = require('express');
const app = express();
const port = 6434;
const router = require('./router.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/nhm_dino/api', router);

app.listen(port, () => console.log(`NHM Dino Scraping is ON, Dudes!`));
