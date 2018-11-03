const express = require('express');
const router = express.Router();

const mlcbService = require('../services/mlcb');

 // Get all recipes for the 'My Recipes' view
router.get('/', async (req, res) => {
  try {
    // Go to the mlcb service
    const list = await mlcbService.recipeList();
    console.log('list:', list)

    // Send back list of recipes (no details) to meal saga
    res.send(list);
    
  } catch (error) {
    res.sendStatus(500);
  }
})

// Get specific recipe for user 
// Used twice
router.get('/:id', async (req, res) => {
  try {
    const recipe = await mlcbService.recipeDetail(req.params.id);

    res.send(recipe);
  } catch (error) {
    res.sendStatus(500);
  }
})

module.exports = router;
