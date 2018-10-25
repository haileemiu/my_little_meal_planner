import React, { Component } from 'react';
import axios from 'axios';

class Plan extends Component {

    constructor(props) {

      super(props);
      this.state = {

      }
    }
    // Get all the meals that have a date assigned
    getPlannedMealsByDate = () => {
      axios({
        method: 'GET',
        url: `/api/meal`,
      }).then(response => {
        console.log('Response from db (by date):', response.data);

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
        
      </div>
     );
  }
}
 
export default Plan;