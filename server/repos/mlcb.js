const axios = require('axios');

// Get recipe details
const recipeDetail = async recipeId => {
  const response = await axios({
    method: 'GET',
    url: `https://mlcb-stage.tyvoid.net/api/v1/recipes/${recipeId}`
  });

  return response.data.recipe;
};

// Get all recipes for the 'My Recipes' view
const recipeList = async () => {
  const response = await axios({ method: 'GET', url: 'https://mlcb-stage.tyvoid.net/api/v1/recipes' });
  // Send back the recipe data
  // console.log('recipeList:', response.data);
  return response.data;
};

module.exports = {
  recipeList,
  recipeDetail
};
