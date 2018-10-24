import React, { Component } from 'react';
import Meals from './MealsComponent';
import Plan from './PlanComponent';

// Likely change to functional component
class PlanView extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

  render() { 
    return ( 
      <div>
        <Meals />
        <Plan />
        
      </div>
     );
  }
}
 
export default PlanView;