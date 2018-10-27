import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { func } from 'prop-types';
import { compose } from 'redux';

function* getRecipes() {
  try {
    const recipes = yield call(axios.get, '/api/mlcb');
    yield put({ type: 'GET_RECIPES_RESPONSE', payload: recipes });
  } catch (error) {
    console.log('ERROR in getRecipes:', error);
  }
}

function* addMeal(action) {
  console.log('Action.payload in addMeal:',action.payload);
  try {
    yield call(axios.post, `/api/meal`, action.payload);
  
  } catch (error) {
    console.log('ERROR in addMeal:', error);
  }
}

function* addDate(action){
  console.log('addDate action:',action);
  try {
    yield call(axios.put, `/api/meal/${action.payload.meal_id}`, action.payload);
    
  } catch (error) {
    console.log('ERROR in addDate:', error);
  }
}

function* removeMeal(action){
  try {
    yield call(axios.delete, `/api/meal/delete/${action.payload.meal_id}`, action.payload);
  } catch (error) {
    console.log('ERROR in removeMeal:', error);
  }
}

function* getMeals() {
  try{
    const response = yield call(axios.get, '/api/meal');
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