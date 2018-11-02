const express = require('express');
const router = express.Router();
// my service with with queries
const mealService = require('../services/meal');
const mlcbService = require('../services/mlcb');

// Get all meals that have been added by user 
router.get('/', async (req, res) => {
  try {
    // Get user's planned meals
    const plannedMeals = await mealService.getUsersMeals(req.user.id);

    // Get recipe detail promises for each planned meal
    // recipeDetail function will send the HTTP request immediately
    const promises = plannedMeals.map(plannedMeal => mlcbService.recipeDetail(plannedMeal.recipe_id));

    // Wait for all recipe details to come back
    const recipeResponses = await Promise.all(promises);

    // Combine recipe information with planned meal information (to be able to access both user info and recipe info in one object)
    const response = plannedMeals.map(plannedMeal => ({
      ...plannedMeal,
      recipe: recipeResponses.find(recipe => recipe.id == plannedMeal.recipe_id)
    }));
    console.log('RESPONSE',response);

    // Send the response to the MealsComponent
    res.send(response);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get back the user's planned meals that have dates assigned
router.get('/planned', async (req, res) => {
  try {
    // Get rows from db
    const meals = await mealService.getAssignedPlannedMeals(req.user.id);

    // Store an array of promises
    const detailPromises = meals.map(meal => mlcbService.recipeDetail(meal.recipe_id));

    // Run all of the promises and wait before moving on
    const recipeDetails = await Promise.all(detailPromises);

    // Map over the rows from the db, and create an object that has the db info as well as the recipe api info
    const response = meals.map(meal => ({
      ...meal,
      recipe: recipeDetails.find(recipe => recipe.id === meal.recipe_id)
    }));
    console.log('Response:', response);

    res.send(response);
  } catch (error) {
    console.log('Error in get /planned:', error)
    res.sendStatus(500);
  }
})

// Add a meal to the user's list
router.post('/', async (req, res) => {
  try {
    await mealService.addMeal(req.body.recipe_id, req.body.user_id);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});



// Update date
router.put('/:id', async (req, res) => {
  try {
    await mealService.updateDate(req.body.newDate, req.params.id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
})


// Delete row
router.delete('/delete/:id', async (req, res) => {
  try {
    await mealService.deleteMeal(req.params.id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
})

module.exports = router;