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
        {/* <pre>{JSON.stringify(this.props.reduxState.mealReducer.meals, null, 2)}</pre> */}
      </div>
     );
  }
}


const mapStateToProps = (reduxState) => {
  return { reduxState };
}
 
export default connect(mapStateToProps)(PlanView);