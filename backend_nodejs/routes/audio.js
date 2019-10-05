const express = require('express');
const router = express.Router();
const audioMulter = require('../config/multi-config');

const AudioController = require('../controllers/audio');

router.get('/', AudioController.getAllAudio);
router.get('/:id', AudioController.getOneAudio);
router.post('/create', audioMulter, AudioController.createAudio);
router.put('/update', AudioController.updateAudio);
router.delete('/delete', AudioController.deleteAudio);


module.exports = router;
