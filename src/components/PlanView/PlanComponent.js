import React, { Component } from 'react';
import axios from 'axios';

class Plan extends Component {

    constructor(props) {

      super(props);
      this.state = {
        plannedMeals: [],
      }
    }
    // Get all the meals that have a date assigned
    getPlannedMealsByDate = () => {
      axios({
        method: 'GET',
        url: `/api/meal`,
      }).then(response => {
        console.log('Response from db (by date):', response.data);

        // exact same as meal card
        let meals = response.data.map(meal => ({ id: meal.id, recipe_id: meal.recipe_id, planned_day: meal.planned_day}));
        this.setState({
          meals: meals
        })
        console.log('this.state.meals', this.state.meals);
  
        // Create an array promises
        let promiseArray = [];
        for (let promise of meals) {
          promiseArray.push(axios.get(`/api/mlcb/${promise.recipe_id}`))
        }
  
        // Send multiple axios get requests for all the recipe data
        Promise.all(promiseArray).then(responses => {
          // console.log('Response from promise.all:', responses)
          // Create an array of recipes
          let plannedMeals = [];
          for (let meal of responses) {
            plannedMeals.push(meal.data.data.recipe);
          }
          // console.log('plannedMeals:', plannedMeals);
  
          // Keep the recipe ids and meal ids
          for (let i = 0; i < plannedMeals.length; i++) {
            plannedMeals[i] = {
              ...plannedMeals[i],
              meal_id: meals[i].id,
              planned_day: meals[i].planned_day
            }
          }
          this.setState({
            plannedMeals: plannedMeals
          })
          console.log('this.state.plannedMeals:', this.state.plannedMeals);
        });
        // ^^^

      }).catch(error => {
        console.log('Error in getPlannedMealsByDate:', error);
        alert('Error in getPlannedMealsByDate');
      })
    }
    // Run on page load
    componentDidMount(){
      this.getPlannedMealsByDate();
    }

  render() { 
    return ( 
      <div>
        <h3>My Plan</h3>
        <table>
          <thead>
            <tr>
            <th>Day</th>
            <th>Meal</th>
            <th>Description</th>
            <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.state.plannedMeals.map(meal => {
              return <tr key={meal.id}>
                <td>{meal.planned_day}</td>
                <td>{meal.title}</td>
                <td>{meal.description}</td>
              </tr>
            })}
            {/* <pre>{JSON.stringify(this.state.plannedMeals, null, 2)}</pre> */}
          </tbody>
        </table>
        
      </div>
     );
  }
}
 
export default Plan;