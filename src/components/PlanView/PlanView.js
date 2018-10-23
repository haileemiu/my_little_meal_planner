import React, { Component } from 'react';
import Meals from './MealsComponent';
import Plan from './PlanComponent';
import MealCard from './MealCard';

class PlanView extends Component {

    constructor(props) {

      super(props);
      this.state = {

      }
    }

  render() { 
    return ( 
      <div>
        <h3>My Meal Plan</h3>
        <Meals />
        <Plan />
        <MealCard />
      </div>
     );
  }
}
 
export default PlanView;