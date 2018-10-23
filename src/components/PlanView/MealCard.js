import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class MealCard extends Component {

    constructor(props) {

      super(props);
      // this.state = {
      
      // }
    }

    // Get the available_meals data
    getAvailableMeals = () => {
      axios({
        method: 'GET',
        url: '/api/meal',
      }).then(response => {
        console.log('Response in getAvailableMeals:', response.data);

      }).catch(error => {
        console.log('Error in getAvailableMeals:', error);
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