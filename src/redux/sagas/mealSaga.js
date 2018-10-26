import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { func } from 'prop-types';

function* fetchRecipes() {
  try {
    const recipes = yield call(axios.get, '/api/mlcb');
    yield put({ type: 'GET_FETCH_RECIPES', payload: recipes });
  } catch (error) {
    console.log(error => ('ERROR in fetchRecipes:', error));
  }
}

function* addMeal(action) {
  console.log('Action.payload in addMeal:',action.payload);
  try {
    yield call(axios.post, `/api/meal`, action.payload);
    
  } catch (error) {
    console.log(error => ('ERROR in addMeal:', error))
  }
}

function* addDate(action){
  try {
    yield call(axios.put, `/api/meal/${action.payload.meal_id}`, action.payload);
    
  } catch (error) {
    console.log(error => ('ERROR in addDate:', error))
  }
}

function* removeMeal(action){
  try {
    yield call(axios.delete, `/api/meal/delete/${action.payload.meal_id}`, action.payload);
  } catch (error) {
    console.log(error => ('ERROR in removeMeal:', error));
  }
}



function* mealSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
  yield takeLatest('ADD_MEAL', addMeal);
  yield takeLatest('ADD_DATE', addDate);
  yield takeLatest('REMOVE_MEAL', removeMeal);
}

export default mealSaga; 