const mealReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FETCH_RECIPES':
      console.log('action.payload:', action.payload.data.recipes);
      return action.payload.data.recipes;
    default:
      return state;
  }
};

export default mealReducer;