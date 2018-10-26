const mealReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_RECIPES':
      console.log('action.payload in mealReducer:', action.payload.data.recipes);
      return action.payload.data.recipes;
    
    default:
      return state;
  }
};

export default mealReducer;