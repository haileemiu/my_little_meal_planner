import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card,CardContent, Typography } from '@material-ui/core';
import './MyRecipes.css';

class RandomRecipe extends Component {
  state = {
    randomRecipe: ''
  }

  renderRandom = () => {
    // write a random number generator to pick 1 recipe id
    // start with hard code number of recipes available
    let randomNumber = Math.floor(Math.random() * 8) + 1;
    let randomRecipe = this.props.reduxState.mealReducer.recipes.filter(r => r.id === randomNumber) ;
    // console.log('RandomRecipe:', randomRecipe);
    // console.log('title:', randomRecipe[0].title);
    this.setState({
      randomRecipe: randomRecipe[0].title
    })
  }
  
  render() {
    return (
      <div className="container">
        
        <Button
          color="primary"
          variant="outlined"
          onClick={this.renderRandom}
        >
        Random Recipe
        </Button>
        <div>
          {this.state.randomRecipe ? <Typography variant="title">Try the <span style={{fontStyle: 'italic'}}>{this.state.randomRecipe}</span></Typography> : null}
          {/* {JSON.stringify(this.props.reduxState.mealReducer.recipes, null, 2)} */}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (reduxState) => {
  return { reduxState };
}

export default connect(mapStateToProps)(RandomRecipe);

