import React, { Component } from "react";
import {Tabs, Tab} from 'react-bootstrap-tabs';
import Top10Movies from './movie/Top10Movies.component';
import Stars from "./movie/rating/Stars";
import { Rating } from 'react-simple-star-rating'
import AutocompleteCustom from './AutocompleteCustom'
import axios from "axios";
import MovieListStars from './movie/rating/MovieListStars.component';


export default class Root extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.state = {
      activeTab: props.activeTab || 1,
      rating: 0,
      searchTitle: "",
      movies_suggestions: []
    };
  }
  
  componentDidMount() {
   
  }

  componentDidUpdate(prevProps, prevState) {    
    if (prevState.page !== this.state.page) { 
    }
  }



  handleRating(rate) {
    this.state.rating = rate;
    console.log(this.state.rating)
  }

  handleSelect(selectedTab) {
    // The active tab must be set into the state so that
    // the Tabs component knows about the change and re-renders.
    this.setState({
      activeTab: selectedTab
    });
  }

  onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    this.setState({
        searchTitle: searchTitle
    });
  }
  
  receiveSuggestions = (suggestions) => {
    this.setState({
      movies_suggestions:suggestions
    })
    console.log("receiveSuggestions");
    console.log(this.state.movies_suggestions);
  }

  render() {
    
    // const { searchTitle, currentMovie } = this.state;

    return (
      <div>
        <div style={{margin: 5}} >
          <AutocompleteCustom clickMe={this.receiveSuggestions}/>
        </div>
        <div style={{margin: 5}} ></div>
        
        <div style={{margin: 5}} >
          <Tabs
            onSelect={this.handleSelect}
            activeKey={this.state.activeTab}>
            <Tab label="View More Movies" eventKey={0}>
              <Top10Movies/>
            </Tab>
            <Tab label="Rate Movies" eventKey={1}>
              <MovieListStars>

              </MovieListStars>
              {/* <Stars>
              </Stars> */}
            </Tab>  
          </Tabs>
        </div>
      </div>
    );
  }
}