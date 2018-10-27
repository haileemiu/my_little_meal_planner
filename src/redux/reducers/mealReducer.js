const mealReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_RECIPES_RESPONSE':
      // console.log('action.payload in mealReducer:', action.payload.data.recipes);
      return action.payload.data.recipes;
    // case 'GET_MEALS_RESPONSE':
    // console.log('action.payload in get meals response meal reducer:', action.payload);
    //   return action.payload;
    default:
      return state;
  }
};

export default mealReducer;