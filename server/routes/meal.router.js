const express = require('express');
const router = express.Router();
const mealService = require('../services/meal');
const mlcbService = require('../services/mlcb');

// Add a meal to the user's list
router.post('/', async (req, res) => {
  try {
    await mealService.addMeal(req.body.recipe_id, req.body.user_id);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get all recipe ids for the user
router.get('/', async (req, res) => {
  try {
    // Gets planned meals from service
    const plannedMeals = await mealService.getUsersMeals(req.user.id);
    console.log('plannedMeals:', plannedMeals);

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

// Get back the planned meals that have dates assigned
router.get('/planned', async (req, res) => {
  try {
    // Gets rows from db
    const meals = await mealService.getAssignedPlannedMeals(req.user.id);
     console.log('meals:', meals)
    // Stores an array of promises
    const detailPromises = meals.map(meal => mlcbService.recipeDetail(meal.recipe_id));
    console.log('detailPromises:', detailPromises);

    // Runs all of the promises and waits before moves on
    const recipeDetails = await Promise.all(detailPromises);
    console.log('recipeDetails:', recipeDetails);

    // Maps over the rows from the db, creates an object that has the db info as well as the recipe api info
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