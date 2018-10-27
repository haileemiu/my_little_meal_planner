import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Plan extends Component {
  state = {
    plannedMeals: []
  }

  // Run on page load
  componentDidMount() {
    this.getPlannedMealsByDate();
  }

  // Get all the meals that have a date assigned
  getPlannedMealsByDate = async () => {
    const response = await axios({ method: 'GET', url: '/api/meal/planned' })
    // this.props.dispatch({ type: 'GET_MEALS_REQUEST' })

    this.setState({ plannedMeals: response.data });
  }

  renderIngredient = (mealId) => (ingredient) => (
    <li key={`${mealId}-${ingredient.name}`}>{ingredient.measure} - {ingredient.name}</li>
  )

  renderRow = (meal) => (
    <TableRow key={meal.id}>
      <TableCell><Typography variant="subtitle2">{meal.planned_day}</Typography></TableCell>

      <TableCell><Typography variant="subtitle1">{meal.recipe.title}</Typography></TableCell>
      <TableCell>
        <Typography variant="body2" component="div">
          <ul >
            {meal.recipe.ingredients.map(this.renderIngredient(meal.id))}
          </ul>
        </Typography>
      </TableCell>
    </TableRow>
  )

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h3>My Plan</h3>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Meal</TableCell>
              <TableCell>Ingredients</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {this.state.plannedMeals.map(this.renderRow)}
          </TableBody>
        </Table>

        {/* <pre>{JSON.stringify(this.props.reduxState.mealReducer.data, null, 2)}</pre> */}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return { reduxState };
}

const styledTable = withStyles(styles)(Plan);

export default connect(mapStateToProps)(styledTable);
