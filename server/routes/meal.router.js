const express = require('express');
const router = express.Router();

const mealRepo = require('../repos/meal');
const mlcbRepo = require('../repos/mlcb');

// Get all meals that have been added by user
// View in the top horizontal scroll
router.get('/', async (req, res) => {
  try {
    // Get user's planned meals
    const plannedMeals = await mealRepo.getUserMeals(req.user.id);

    // Get recipe detail and save as a promise for each planned meal
    // recipeDetail function will send the HTTP request immediately
    const promises = plannedMeals.map(plannedMeal => mlcbRepo.recipeDetail(plannedMeal.recipe_id));

    // Wait for all recipe details to come back
    const recipeResponses = await Promise.all(promises);

    // Combine recipe information with planned meal information (to be able to access both user info and recipe info in one object)
    const response = plannedMeals.map(plannedMeal => ({
      ...plannedMeal,
      recipe: recipeResponses.find(recipe => recipe.id == plannedMeal.recipe_id)
    }));

    // Send the response to the MealsComponent
    res.send(response);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get back the user's planned meals that have dates assigned
// View in the plan table component
router.get('/planned', async (req, res) => {
  try {
    // Get meals from db
    const meals = await mealRepo
    .getAssignedPlannedMeals(req.user.id);

    // Store an array of promises
    const detailPromises = meals.map(meal => mlcbRepo.recipeDetail(meal.recipe_id));

    // Run all of the promises and wait before moving on
    const recipeDetails = await Promise.all(detailPromises);

    // Map over the rows from the db, and create an object that has the db info as well as the recipe api info
    const response = meals.map(meal => ({
      ...meal,
      recipe: recipeDetails.find(recipe => recipe.id === meal.recipe_id)
    }));

    res.send(response);
  } catch (error) {
    console.log('Error in get /planned:', error)
    res.sendStatus(500);
  }
})

// Add a meal to the user's list
router.post('/', async (req, res) => {
  try {
    await mealRepo.addMeal(req.body.recipe_id, req.body.user_id);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Update date to plan a meal
router.put('/:id', async (req, res) => {
  try {
    await mealRepo.updateDate(req.body.newDate, req.params.id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
})

// Delete based on meal id
router.delete('/delete/:id', async (req, res) => {
  try {
    // Go to meal Repo with id
    await mealRepo.deleteMeal(req.params.id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
})

module.exports = router;