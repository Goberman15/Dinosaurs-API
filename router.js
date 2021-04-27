const router = require('express').Router();
const DinoController = require('./controllers/dinoController');

router.get('/dinosaurs', DinoController.getAllDinoList);
router.get('/dinosaurs/:name', DinoController.getDinoDataByName);
router.get('/era', DinoController.getDinoEra);
router.get('/found', DinoController.getDinoFoundPlace);
router.get('/type', DinoController.getDinoType);
router.get('/diet', DinoController.getDinoFood);

module.exports = router;
