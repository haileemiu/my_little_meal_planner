import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert2';
import MealCard from './MealCard';


const styles = {
  button: {
    margin: 10,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};


class Meals extends Component {
  state = {
    plannedMeals: [],
  }

  componentDidMount() {
    this.getAvailableMeals()
  }

  // Get the specific meals saved by that user
  getAvailableMeals = async () => {
    try {
      // mealsResponse is what would come back in the .then
      const mealsResponse = await axios({ method: 'GET', url: '/api/meal' });

      this.setState({ plannedMeals: mealsResponse.data });
    } catch (err) {
      console.log('Error in getAvaliableMeals:', err)
    }
  }

  // Remove meal from planned meals db table
  removeMeal = (meal_id) => async () => {
    // Alert successfully removed
    const { value } = await swal({
      type: 'warning',
      title: 'Do you want to remove the meal from your current Meal Plan?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })

    if (value) {
      this.props.dispatch({ type: 'REMOVE_MEAL', payload: { meal_id } });

      this.setState(prevState => ({
        plannedMeals: prevState.plannedMeals.filter(meal => meal.planned_id !== meal_id)
      }));

      swal(
        'Removed',
        'The meal as been removed from your Meal Plan',
        'success'
      )
    }
  }


  // update date
  submitDate = (meal_id, startDate) => {
    this.props.dispatch({ type: 'ADD_DATE', payload: { newDate: startDate.toISOString(), meal_id } });

    // Alert success
    swal({
      position: 'top-end',
      type: 'success',
      title: 'Date set',
      showConfirmButton: false,
      timer: 1500
    })
  }

  render() {
    return (
      <div>
        <h3>My Meals</h3>
        {this.state.plannedMeals.map(meal => <MealCard meal={meal} submitDate={this.submitDate} removeMeal={this.removeMeal}/>)}
        {/* {JSON.stringify(this.props.reduxState.mealReducer.recipes, null, 2)} */}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return { reduxState };
}

export default connect(mapStateToProps)(Meals);