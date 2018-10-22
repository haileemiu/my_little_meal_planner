import React, { Component } from 'react';
import axios from 'axios';

class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      recipes: [],
     }
  }
  // Get all recipes from MLCB
  getRecipesFromMLCB = () => {
    axios({
      method: 'GET',
      url: '/api/mlcb'
    }).then(response => {
      console.log('response from server:', response.data.recipes);
      this.setState({
        recipes: response.data.recipes,
      })
      // console.log('state:', this.state.recipes)
    }).catch(error => {
      console.log('ERROR:', error);
      alert('Error in getting recipes from MLCB');
    })
  }

  // Get on page load
  componentDidMount() {
    this.getRecipesFromMLCB();
  }
  // Render
  render() { 
    return ( 
      <div>
        <h2>My Recipes</h2>
      </div>
     );
  }
} // END class component
 
export default MyRecipes;
