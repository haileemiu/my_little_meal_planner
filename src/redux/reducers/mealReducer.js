const initialState = {
  meals: [],
  recipes: []
};

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    // comes from the meal saga
    case 'GET_RECIPES_RESPONSE':
 
      // set redux state with recipe list
      return { ...state, recipes: action.payload.data.recipes };
    case 'GET_MEALS_RESPONSE':
      // console.log('action.payload in get meals response meal reducer:', action.payload.data);
      return { ...state, meals: action.payload };
    case 'REMOVE_MEAL_RESPONSE':
      return { ...state, meals: state.meals.filter(meal => meal.id !== action.payload) }
    default:
      return state;
  }
};

export default mealReducer;
