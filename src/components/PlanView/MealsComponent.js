import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import MealCard from './MealCard';


// const styles = {
//   button: {
//     margin: 10,
//   },
//   card: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// };


class Meals extends Component {
  state = {
    plannedMeals: [],
  }

  componentDidMount() {
    this.getAvailableMeals()
  }

  // Get the specific meals saved by that user and display
  getAvailableMeals = async () => {
    try {
      // mealsResponse is what would come back in the .then (if I was not using async await)
      const mealsResponse = await axios({ method: 'GET', url: '/api/meal' });
      console.log('mealsResponse:', mealsResponse)
      this.setState({ plannedMeals: mealsResponse.data });
    } catch (error) {
      console.log('Error in getAvailableMeals:', error)
    }
  }

  // Remove meal from planned meals db table
  removeMeal = (meal_id) => async () => {
    // Alert successfully removed
    const { value } = await swal({
      type: 'warning',
      title: 'Do you want to remove the meal from your current "Meal Plan"?',
      text: 'It will still be available in "My Recipes".',
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

      swal({
        position: 'center',
        type: 'success',
        title: 'The meal has been removed',
        showConfirmButton: false,
        timer: 1500
      })
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
      <div className="scrollmenu componentBody">
      {/* <pre>{JSON.stringify(this.props.reduxState.mealReducer.meals, null, 2)}</pre> */}
        <h3>My Meals</h3>
        <p>Click the picture to see recipe directions!</p>
        {this.state.plannedMeals.map((meal, index) => <MealCard key={index} meal={meal} submitDate={this.submitDate} removeMeal={this.removeMeal}/>)}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return { reduxState };
}

export default connect(mapStateToProps)(Meals);