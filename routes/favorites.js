const express = require('express');
const router = express.Router();
const controller = require('../controllers/favorites');

router.post('/', async(req, res)=> {
    res.json(await controller.createFavorites(req.body));
});

router.get('/', async(req, res)=> {
    res.json(await controller.retrieveFavorites());
});

router.get('/:userCode', async(req, res)=> {
    res.json(await controller.retrieveMyFavorites(req.params.userCode));
});

router.delete('/:id', async(req, res)=> {
    res.json(await controller.deleteFavorite(req.params.id));
});

module.exports = router;