const initialState = {
  meals: [],
  recipes: []
};

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RECIPES_RESPONSE':
      // console.log('action.payload in mealReducer:', action.payload.data.recipes);
      return {...state, recipes: action.payload.data.recipes};
    case 'GET_MEALS_RESPONSE':
      console.log('action.payload in get meals response meal reducer:', action.payload);
      return { ...state, meals: action.payload };
    default:
      return state;
  }
};

export default mealReducer;