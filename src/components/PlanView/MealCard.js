import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PlanView.css';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, CardActionArea } from '@material-ui/core';

const placeholderImage = 'data:image/jpeg;base64,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';


const styles = {
  button: {
    margin: 10,
  },
  card: {
    maxWidth: 300,
    minWidth: 250,
    display: 'inline-block',
    height: 340,
    margin: 5,
  },
  media: {
    height: 140,
  },
  cardActionArea: {
    display: 'inline-block',
    width: '100%',
  },
};

class MealCard extends Component {
  state = {
    startDate: '',
    showPicture: true
  }

  // Date box
  handleDateChange = (event) => {
    // console.log('event',event);
    this.setState({
      startDate: event
    });
  }

  // Handle Assigning a date to a meal
  handleSubmitDate = () => {
    this.props.submitDate(this.props.meal.planned_id, this.state.startDate);
  }

  // Toggle between picture and direction
  togglePicture = () => {
    this.setState(state => ({ showPicture: !state.showPicture }))
  }

  // Render 
  render() {
    const { recipe, ...meal } = this.props.meal;

    return (
      <Card style={styles.card}>

        <CardActionArea onClick={this.togglePicture} className={this.state.cardActionArea}>
          {this.state.showPicture ? (<CardMedia
            style={styles.media}
            image={recipe.images && recipe.images.length ? `https://mlcb.tyvoid.net/api/v1/images/${recipe.images[0].id}` : placeholderImage}
            title="Meal Image"
          />) : (<Typography variant="subheading" className="wrapText">
            <ol>
              {recipe.directions.map(direction => <li>{direction.body}</li>)}
            </ol>
          </Typography>)}
        </CardActionArea>

        <CardContent>
          <Typography variant="h5" className="wrapText">
            <div>{recipe.title}</div>
          </Typography>

          {/* WIP */}
          {/* TODO: rerender */}
          {/* Show check mark if the meal has an assigned day */}
          <Typography variant="h6">
            {meal.planned_day ? <i className="fas fa-check"><span> Meal has been planned</span></i> : null}
          </Typography>

          {/* WIP display date */}
          {/* <Typography variant="subheading">
            {meal.planned_day ? <div>{moment(meal.planned_day).startOf('day').fromNow()}</div> : null}
          </Typography> */}
        </CardContent>

        <CardActions>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            placeholderText="Click to assign date"
          />
        </CardActions>
        <CardActions>
          <Button
            variant="contained" color="primary"
            styles={styles.button}
            onClick={this.handleSubmitDate}
          >
            Plan
          </Button>
          <Button
            variant="contained"
            color="secondary"
            styles={styles.button}
            onClick={this.props.removeMeal(meal.planned_id)}
          >
            Remove
          </Button>
        </CardActions>
      </Card>

    );
  }
}


export default MealCard;

