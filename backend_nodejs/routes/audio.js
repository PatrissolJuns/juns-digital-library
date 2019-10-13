const express = require('express');
const router = express.Router();
const audioMulter = require('../config/multi-config');

const AudioController = require('../controllers/audio');

router.get('/', AudioController.getAllAudio);
router.get('/:id', AudioController.getOneAudio);
router.post('/create', audioMulter, AudioController.createAudio);
router.put('/rename/:id', AudioController.renameAudio);
// router.put('/update/:id', AudioController.updateAudio);
router.delete('/delete/:id', AudioController.deleteAudio);
router.put('/toggle-bookmark/:id', AudioController.toggleBookmark);

module.exports = router;
