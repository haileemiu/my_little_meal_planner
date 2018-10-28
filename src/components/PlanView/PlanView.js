import React, { Component } from 'react';
import { connect } from 'react-redux';
import Meals from './MealsComponent';
import Plan from './PlanComponent';

class PlanView extends Component {


  render() { 
    return ( 
      <div>
        <Meals />
        <Plan />
        
      </div>
     );
  }
}


const mapStateToProps = (reduxState) => {
  return { reduxState };
}
 
export default connect(mapStateToProps)(PlanView);