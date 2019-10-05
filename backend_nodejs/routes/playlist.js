const express = require('express');
const router = express.Router();

const PlaylistController = require('../controllers/playlist');

router.get('/', PlaylistController.getAllPlaylist);
router.get('/:id', PlaylistController.getOnePlaylist);
router.post('/create', PlaylistController.createPlaylist);
router.put('/update/:id', PlaylistController.updatePlaylist);
router.delete('/delete/:id', PlaylistController.deletePlaylist);

// router.post('/', AudioController.createAudio);
/*
router.get('/:id', AudioController.getOneAudio);
router.put('/:id', AudioController.modifyAudio);
router.delete('/:id', AudioController.deleteAudio);*/

module.exports = router;
