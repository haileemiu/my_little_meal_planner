const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const mealService = require('../services/meal');
const mlcbService = require('../services/mlcb');

// Add a meal to the user's list
router.post('/', async (req, res) => {
  try {
    await mealService.addMeal(req.body.recipe_id, req.body.user_id);

    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Get all recipe ids for the user
router.get('/', async (req, res) => {
  try {
    // Gets planned meals from service
    const plannedMeals = await mealService.getPlannedMeals(req.user.id);

    // Gets recipe details promises for each planned meal
    // recipeDetails sends the HTTP request immediately
    const promises = plannedMeals.map(plannedMeal => mlcbService.recipeDetail(plannedMeal.recipe_id));

    // Wait for all recipe details to come back
    const recipeResponses = await Promise.all(promises);

    // Adds recipe to the planned meals
    const response = plannedMeals.map(plannedMeal => ({
      ...plannedMeal,
      recipe: recipeResponses.find(recipe => recipe.id == plannedMeal.recipe_id)
    }));

    // Sends the response data
    res.send(response);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Update date
router.put('/:id', async (req, res) => {
  try {
    await mealService.updateDate(req.body.newDate, req.params.id);

    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
})

// Get back the planned meals that have dates assigned
router.get('/planned', async (req, res) => {
  try {
    const meals = await mealService.getAssignedPlannedMeals(req.user.id);

    const detailPromises = meals.map(meal => mlcbService.recipeDetail(meal.recipe_id));

    const recipeDetails = await Promise.all(detailPromises);

    const response = meals.map(meal => ({
      ...meal,
      recipe: recipeDetails.find(recipe => recipe.id === meal.recipe_id)
    }));

    res.send(response);
  } catch (e) {
    res.sendStatus(500);
  }
})

// Delete row
router.delete('/delete/:id', async (req, res) => {
  try {
    await mealService.deleteMeal(req.params.id);

    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
})

module.exports = router;