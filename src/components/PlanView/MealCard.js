import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class MealCard extends Component {

    constructor(props) {

      super(props);
      this.state = {
        meals: [],
        // WIP getting 1 specific meal
        planned_meal:0
      }
    }

    getAvailableMeals = () => {
      axios({
        method: 'GET',
        url: `/api/meal`,
      }).then(response => {
        // WIP testing with only 1 recipe
        console.log('response.data:', response.data);
        console.log('Response in getAvailableMeals:', response.data[0].recipe_id);
       
        // Create an array of recipe ids
        let recipe_ids = response.data.map(i => i.recipe_id);
        console.log('recipe_ids:', recipe_ids);
        let array = [];
        for (let id of recipe_ids) {
          array.push(axios.get(`/api/mlcb/${id}`))
        }
        Promise.all(array).then(responses => console.log(responses));
        console.log(array);
        

        this.setState({
          planned_meal:response.data[0].recipe_id
        })
        // run function on return
        this.getPlannedRecipe(this.state.planned_meal);
      }).catch(error => {
        console.log('Error in getAvailableMeals:', error);
      })
    }

    // WIP testing with only 1 recipe
    getPlannedRecipe = (id) => {
      axios({
        method: 'GET', 
        // WIP
        url: `/api/mlcb/${id}`,
      }).then(response => {
        // console.log('getPlannedRecipe response:', response.data);
        this.setState({
          meals:response.data
        })
      }).catch(error => {
        console.log('error in getPlannedRecipe:', error);
        alert('ERROR in getPlannedRecipe');
      })
    }

    componentDidMount() {
      this.getAvailableMeals();
    }

  render() { 
    return ( 
      <div>
        <h3>Recipe Card</h3>

        {/* <p>{this.state.meals.recipe.title}</p> */}
        {/* <ul>
          {this.state.meals.data.map(i => (
          <li>{i.title}</li>
        ))}
        </ul>
        <pre>{JSON.stringify(this.state.meals.data, null, 2)}</pre> */}
        

      </div>
     );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
}
export default connect(mapStateToProps)(MealCard);