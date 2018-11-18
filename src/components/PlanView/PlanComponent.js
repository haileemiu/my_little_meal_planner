import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import './PlanView.css';
import SearchList from './SearchList';
import SearchIcon from '@material-ui/icons/Search';
import {
  AppBar,
  Toolbar,
  InputBase,
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
  inputRoot: {
    color: 'inherit',
    width: '30%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

class Plan extends Component {
  state = {
    searchArray: [],
    searchWord: '', 
    searched: false,
  }
  // Run on page load
  componentDidMount() {
    this.getPlannedMealsByDate();
  }

  // Get all the meals that have a date assigned
  getPlannedMealsByDate = async () => {
    try {
      await this.props.dispatch({ type: 'GET_MEALS_REQUEST' });
      // this.setState({ plannedMeals: mealsResponse.data});
    } catch (error) {
      console.log('ERROR in getPlannedMealsByDate:', error);
    }
  }

  renderIngredient = (mealId) => (ingredient, index) => (
    <li key={`${mealId}-${ingredient.measure}-${ingredient.name}-${index}`}>{ingredient.measure} - {ingredient.name}</li>
  )

  renderRow = (meal) => (
    <TableRow key={meal.id}>
      <TableCell style={{verticalAlign:'top'}}><Typography variant="h5">{moment(meal.planned_day).utc().format('dddd MMM Do')}</Typography></TableCell>

      <TableCell style={{verticalAlign:'top'}}><Typography variant="h6">{meal.recipe.title}</Typography></TableCell>
      <TableCell >
        <Typography variant="body2" component="div">
          <ul style={{marginTop:'-5px'}}>
            {meal.recipe.ingredients.map(this.renderIngredient(meal.id))}
          </ul>
        </Typography>
      </TableCell>
    </TableRow>
  )

  filterList = (event) => {
    if (event.key === 'Enter') {
      const resultArray = this.props.reduxState.mealReducer.meals.filter((meal) => {
        let result = false;
        for (let ingredient of meal.recipe.ingredients) {
          if (ingredient.name.toLowerCase().includes(this.state.searchWord.toLowerCase())) {
            result = true;
          }
        }
        return result;
      })
      this.setState({ searchArray: resultArray, searched: true })
    }
  }

  handleChange = (event) => {
    this.setState({ searchWord: event.target.value })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="componentBody">
        <h3>My Plan</h3>

        <AppBar position="static" className="bar" style={{ backgroundColor: '#6870A2' }}>
          <Toolbar>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Ingredient"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={this.handleChange}
              value={this.state.searchWord}
              onKeyPress={this.filterList}
              style={{ backgroundColor: '#6e75a0' }}
            />
            <SearchList 
              searched={this.state.searched}
              searchArray={this.state.searchArray}
              searchWord={this.state.searchWord}
              />
           
          </Toolbar>
        </AppBar>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Meal</TableCell>
              <TableCell>Ingredients</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>{this.props.reduxState.mealReducer.meals.map(this.renderRow)}</TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return { reduxState };
}

const styledTable = withStyles(styles)(Plan);

export default connect(mapStateToProps)(styledTable);
