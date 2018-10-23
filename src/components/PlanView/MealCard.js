import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class MealCard extends Component {

    constructor(props) {

      super(props);
      this.state = {
        planned_meal:0
      }
    }

    getAvailableMeals = () => {
      console.log('data sending in getAvailableMeals:', this.props.user);
      axios({
        method: 'GET',
        url: `/api/meal`,
      }).then(response => {
        // WIP testing with only 1 recipe
        console.log('Response in getAvailableMeals:', response.data[0].recipe_id);
        this.setState({
          planned_meal:response.data[0].recipe_id
        })
        // run function on return
        this.getPlannedRecipe(parseInt(this.state.planned_meal));
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
        console.log('getPlannedRecipe response:', response.data);
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
        {/* Need to get the information from my db table THEN call the api again */}

      </div>
     );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
}
export default connect(mapStateToProps)(MealCard);