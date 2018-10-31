import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import SearchIcon from '@material-ui/icons/Search';
import {
  AppBar,
  Card,
  Button,
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
    width: '100%',
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
    searchWord: ''
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

  renderIngredient = (mealId, index) => (ingredient) => (
    <li key={`${mealId}-${ingredient.name}-${index}`}>{ingredient.measure} - {ingredient.name}</li>
  )

  renderRow = (meal) => (
    <TableRow key={meal.id}>
      <TableCell><Typography variant="h5">{moment(meal.planned_day).format('dddd MMM Do')}</Typography></TableCell>

      <TableCell><Typography variant="h6">{meal.recipe.title}</Typography></TableCell>
      <TableCell>
        <Typography variant="body2" component="div">
          <ul>
            {meal.recipe.ingredients.map(this.renderIngredient(meal.id))}
          </ul>
        </Typography>
      </TableCell>
    </TableRow>
  )

  // WIP search
  // filterList = () => {
  //   const resultArray = this.props.reduxState.mealReducer.meals.filter((meal) => {
  //     console.log('meal filtering through', meal);
  //     let result = false;
  //     for (let ingredient of meal.recipe.ingredients) {
  //       if(ingredient.name.includes(this.state.searchWord)){
  //         result = true;
  //       }
  //     }
  //     this.setState({searchArray: result});
  //     return result;
  //   })
  //   console.log('resultArray', resultArray);
  // }
  filterList = () => {
    const resultArray = this.props.reduxState.mealReducer.meals.filter((meal) => {
      console.log(meal);
      let result = false;
      for (let ingredient of meal.recipe.ingredients) {
        if (ingredient.name.includes(this.state.searchWord)) {
          result = true;
        }
      }
      return result;
    })
    this.setState({ searchArray: resultArray })
    console.log('resultArray', resultArray)
    console.log('searchArray', this.state.searchArray)
  }

  // WIP search
  handleChange = (event) => {
    this.setState({ searchWord: event.target.value })
  }

  // WIP search
  renderSearchRow = () => {
    // <TableRow>{JSON.stringify(this.state.searchArray)}</TableRow>
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="componentBody">
        <h3>My Plan</h3>

        {/* WIP search */}


        <AppBar position="static">
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
            />
            <Button onClick={this.filterList}>Search</Button>
          </Toolbar>
        </AppBar>

        {/* WORKS!! */}
        {/* <ul>{this.state.searchArray.map(meal => <li>{meal.recipe.title}</li>)}</ul> */}

            {this.state.searchArray.length > 0 ?  <ul>{this.state.searchArray.map(meal => <li>{meal.recipe.title}</li>)}</ul> : null}
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Meal</TableCell>
              <TableCell>Ingredients</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>{this.props.reduxState.mealReducer.meals.map(this.renderRow)}</TableBody>
          {/* WIP search */}
          {/* <TableBody>{this.state.searchArray.map(this.renderRow)}</TableBody> */}
          {/* {this.state.searchArray.length > 0 ? <TableBody>{this.state.searchArray.map(this.renderSearchRow)}</TableBody> : <TableBody>{this.props.reduxState.mealReducer.meals.map(this.renderRow)}</TableBody>} */}
        </Table>

        {/* <pre>{JSON.stringify(this.props.reduxState.mealReducer, null, 2)}</pre> */}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return { reduxState };
}

const styledTable = withStyles(styles)(Plan);

export default connect(mapStateToProps)(styledTable);
