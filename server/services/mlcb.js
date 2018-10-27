const axios = require('axios');

const recipeList = async () => {
  const response = await axios({ method: 'GET', url: 'https://mlcb.tyvoid.net/api/v1/recipes' });

  return response.data;
};

const recipeDetail = async recipeId => {
  const response = await axios({
    method: 'GET',
    url: `https://mlcb.tyvoid.net/api/v1/recipes/${recipeId}`
  });

  return response.data.recipe;
};

module.exports = {
  recipeList,
  recipeDetail
};
