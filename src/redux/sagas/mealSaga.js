import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRecipes() {
  try {
    const recipes = yield call(axios.get, '/api/mlcb');
    yield put({ type: 'GET_FETCH_RECIPES', payload: recipes });
  } catch (error) {
    console.log(error => ('ERROR in fetchRecipes:', error));
  }
}

function* addMeal(action) {
  console.log('TEST:',action.payload);
  try {
    yield call(axios.post, `/api/meal`, action.payload);
    
  } catch (error) {
    console.log(error => ('ERROR in addMeal:', error))
  }
}

function* mealSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
  yield takeLatest('ADD_MEAL', addMeal);
}

export default mealSaga;