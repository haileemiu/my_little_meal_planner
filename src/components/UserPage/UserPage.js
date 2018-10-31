import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

class UserPage extends Component {
  logout = () => {
    this.props.dispatch({ type: 'LOGOUT' });
  }

  render() {
    return (
      <div className="componentBody">
        <h1 id="welcome">
          Welcome, {this.props.user.username}!
        </h1>
        <p>Your ID is: {this.props.user.id}</p>
        <p>Head over to the "My Recipes" tab to choose the recipes that you think you will want to make in the near future.<br />
          When you have added all you want, then head over to the "Meal Plan" tab to organize your week! </p><br />
        <hr />

        Features in the "Meal Plan":
        <ul>
          <li>Assign a day to meal.</li>
          <li>See your planned meals in order.</li>
          <li>Remove meals (But they will still be available in "My Recipes"</li>
          <li>See all the ingredients that you will need for a meal</li>
        </ul>


        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

