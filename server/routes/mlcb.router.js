const express = require('express');
const router = express.Router();

const mlcbRepo = require('../repos/mlcb');

 // Get all recipes for the 'My Recipes' view
router.get('/', async (req, res) => {
  try {
    // Go to the mlcb Repo
    const list = await mlcbRepo.recipeList();
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
    const recipe = await mlcbRepo.recipeDetail(req.params.id);

    res.send(recipe);
  } catch (error) {
    res.sendStatus(500);
  }
})

module.exports = router;
