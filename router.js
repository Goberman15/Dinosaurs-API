const router = require('express').Router();
const DinoController = require('./controllers/dinoController');


router.get('/dinosaurs', DinoController.getAllDinoList);

module.exports = router;
