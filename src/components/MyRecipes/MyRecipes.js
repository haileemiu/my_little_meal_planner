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
        <h2>MLCB Meals</h2>
        <table>
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Description</th>
              <th>Photo</th>
            </tr>
          </thead>

          <tbody>
            {this.state.recipes.map(recipe => {
              return <tr key={recipe.id}>
                <td>{recipe.title}</td>
                <td>{recipe.description}</td>
                <td>{recipe.ownerPicture}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
} // END class component

export default MyRecipes;
