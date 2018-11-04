import React, { Component } from 'react';
class SearchList extends Component {
  state = {}
  render() {
    if (this.props.searched && this.props.searchArray.length > 0) {
      return (
        <div className="list">
          Planned recipes that include {this.props.searchWord}:
        <ul>{this.props.searchArray.map(meal => <li key={meal.id}>{meal.recipe.title}</li>)}</ul>
        </div>
      )
    } else if (this.props.searched && this.props.searchArray.length === 0)  {
      return (
        <div>None of your planned recipes include {this.props.searchWord}.</div>
      )
    } else {
      return null;
    }
  }
}

export default SearchList;

// {this.state.searchArray.length > 0 ? <ul>{this.state.searchArray.map(meal => <li key={meal.id}>{meal.recipe.title}</li>)}</ul> : null}

// after button is clicked, need conditional