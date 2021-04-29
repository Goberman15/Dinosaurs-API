const router = require('express').Router();
const DinoController = require('./controllers/dinoController');

router.get('/dinosaurs', DinoController.getAllDinoList);
router.get('/dinosaurs/:name', DinoController.getDinoDataByName);
router.get('/name/:alphabet', DinoController.getDinoListByName);
router.get('/era', DinoController.getDinoEra);
router.get('/era/:era', DinoController.getDinoListByEra);
router.get('/found', DinoController.getDinoFoundPlace);
router.get('/found/:found_place', DinoController.getDinoListByFoundPlace);
router.get('/type', DinoController.getDinoType);
router.get('/type/:body_type', DinoController.getDinoListByBodyType);
router.get('/diet', DinoController.getDinoFood);
router.get('/diet/:diet', DinoController.getDinoListByDietType);

module.exports = router;
