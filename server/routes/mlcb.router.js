const express = require('express');
const router = express.Router();

const mlcbService = require('../services/mlcb');

// Get all the recipes back for "My Recipes View"
router.get('/', async (req, res) => {
  try {
    const list = await mlcbService.recipeList();

    res.send(list);
  } catch (e) {
    res.sendStatus(500);
  }
})

// Get specific recipe for user 
// Used twice
router.get('/:id', async (req, res) => {
  try {
    const recipe = await mlcbService.recipeDetail(req.params.id);

    res.send(recipe);
  } catch (e) {
    res.sendStatus(500);
  }
})

module.exports = router;
