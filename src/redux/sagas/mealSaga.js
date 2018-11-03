import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


 // Get all recipes for the 'My Recipes' view
function* getRecipes() {
  try {
    // Go to mlcb.router
    // recipes = recipe list (no details)
    const recipes = yield call(axios.get, '/api/mlcb');

    // dispatch another action that goes to the meal reducer and sends the recipes list
    yield put({ type: 'GET_RECIPES_RESPONSE', payload: recipes });
  } catch (error) {
    console.log('ERROR in getRecipes:', error);
  }
}

// Add meal from recipe view
function* addMeal(action) {
  // console.log('Action.payload in addMeal:',action.payload);
  try {
    yield call(axios.post, `/api/meal`, action.payload);
    
  } catch (error) {
    console.log('ERROR in addMeal:', error);
  }
}

// Update to have a date
function* addDate(action){
  console.log('addDate action:',action);
  try {
    yield call(axios.put, `/api/meal/${action.payload.meal_id}`, action.payload);
    yield put({type: 'GET_MEALS_REQUEST'});
  } catch (error) {
    console.log('ERROR in addDate:', error);
  }
}

// Delete meal from db
function* removeMeal(action){
  try {
    yield call(axios.delete, `/api/meal/delete/${action.payload.meal_id}`, action.payload);
    yield put({type: 'REMOVE_MEAL_RESPONSE', payload: action.payload.meal_id});
 
  } catch (error) {
    console.log('ERROR in removeMeal:', error);
  }
}



// Get meals that have a planned day assigned 
function* getMeals() {
  try{
    const response = yield call(axios.get, '/api/meal/planned');
    console.log('meals in getMeals:', response.data);
    yield put({type: 'GET_MEALS_RESPONSE', payload: response.data});
  } catch (error) {
    console.log('ERROR in getMeals:', error);
  }
}


function* mealSaga() {
  yield takeLatest('GET_RECIPES_REQUEST', getRecipes);
  yield takeLatest('GET_MEALS_REQUEST', getMeals);
  yield takeLatest('ADD_MEAL', addMeal);
  yield takeLatest('ADD_DATE', addDate);
  yield takeLatest('REMOVE_MEAL', removeMeal);
}

export default mealSaga; 