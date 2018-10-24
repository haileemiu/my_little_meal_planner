import React, { Component } from 'react';
import MealCard from './MealCard';

// Likely change to functional component
class Meals extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

  render() { 
    return ( 
      <div>
        <h3>My Meals</h3>
        <MealCard />
      </div>
     );
  }
}
 
export default Meals;