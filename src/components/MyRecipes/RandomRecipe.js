// {/* WIP: feature-random-recipe */ }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card,CardContent, Typography } from '@material-ui/core';
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
      <Card>
        <Typography variant="h5">I can't decide!</Typography>
        <Button
          color="primary"
          onClick={this.renderRandom}
        >
        Random Recipe
        </Button>
        <CardContent>
          {this.state.randomRecipe ? <Typography>Why not try the {this.state.randomRecipe}?</Typography> : null}
          {/* {JSON.stringify(this.props.reduxState.mealReducer.recipes, null, 2)} */}
        </CardContent>
      </Card>
    );
  }
}


const mapStateToProps = (reduxState) => {
  return { reduxState };
}

export default connect(mapStateToProps)(RandomRecipe);

