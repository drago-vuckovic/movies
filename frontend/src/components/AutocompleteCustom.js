import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class AutocompleteCustom extends Component {
    static propTypes = {
      suggestions: PropTypes.instanceOf(Array)
    };
  
    static defaultProps = {
      suggestions: []
    };
  
    constructor(props) {
      super(props);
      this.filterApiResponse = this.filterApiResponse.bind(this);
      this.state = {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: "",

        errorMsg: '',
        movies: [],

        test:[],

      };
    }

    clickMe = (s) => {
      this.props.clickMe(s);
    }
    
  
    filterApiResponse (userInput) {
        // console.log('AutocompleteCustom filterApiResponse fired at OnChange');

        if(userInput.indexOf('star') !== -1){
            console.log('star');
        } else if(userInput.indexOf('at least ') !== -1){
            console.log('at least ');
        } else if(userInput.indexOf('after ') !== -1){
            console.log('after ');
        } else if(userInput.indexOf('older than ') !== -1){
            console.log('older than ');
        } else if(userInput.indexOf('year ') !== -1){
            console.log('year ');
        }

        this.state.apiResponse.forEach((element, index, array) => {
            // console.log(index);
            // console.log(element.title); 
            // console.log(element.description); 
            // console.log(element.published);
            // console.log(element.rating);
        });
    }      

    getMovies = async (param) => {

      let response;

      try {
        response  = await axios.get(`http://localhost:8080/api/movies/?page=0&size=1000`);
      } catch(e) {
        console.log(e);
      }

      return await response;
    }

    onlyUnique = (value, index, self) =>{
      return self.indexOf(value) === index;
    }

    onChange = e => {

      const userInput = e.currentTarget.value;
  
      const tempSuggestions = [];
      var unique = [];
    
      // this.filterApiResponse(userInput)

      

      this.getMovies()
        .then( r => {
          r.data.movies.forEach((element, index, array) => {
            
            tempSuggestions.push(element.title)
            tempSuggestions.push(element.description)
            tempSuggestions.push(element.rating.toString())
            tempSuggestions.push(element.cast1)
            tempSuggestions.push(element.cast2)
            tempSuggestions.push(element.releasedate)
          });

          unique = tempSuggestions.filter(this.onlyUnique);
                    
          this.setState(
              {filteredSuggestions: unique.filter(
                suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1)}
            )

          this.clickMe(unique);
        })
        
      this.setState({
        activeSuggestion: 0,
        showSuggestions: (userInput.length>1) ? true : false,
        userInput: e.currentTarget.value
      });
    };
  
    onClick = e => {
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });
    };
  
    onKeyDown = e => {
      const { activeSuggestion, filteredSuggestions } = this.state;
  
      if (e.keyCode === 13) {
        this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: filteredSuggestions[activeSuggestion]
        });
      }

      else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
          return;
        }
  
        this.setState({ activeSuggestion: activeSuggestion - 1 });
        
      }

      else if (e.keyCode === 40) {
        if (activeSuggestion - 1 === filteredSuggestions.length) {
          return;
        }
  
        this.setState({ activeSuggestion: activeSuggestion + 1 });
      }
    };
  

    render() {
      const { onChange, onClick,  onKeyDown,
        state: {
          activeSuggestion,
          filteredSuggestions,
          showSuggestions,
          userInput
        }
      } = this;
  
      let suggestionsListComponent;
  
      if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;
  
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }
  
                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          suggestionsListComponent = (
            <div className="no-suggestions">
              <em>No suggestions avalable yet</em>
            </div>
          );
        }
      }
  
      return (
        <Fragment>
          <input  className="form-control"
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            placeholder="Custom Autocomplete ..."
          />
          {suggestionsListComponent}
        </Fragment>
      );
    }
  }
  
  export default AutocompleteCustom;
  