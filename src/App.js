import React, { Component } from 'react';
import './App.css';
// importing the different components used within the app
import Flat from './components/flat';
import GoogleMapReact from 'google-map-react';
import Marker from './components/marker';


class App extends Component {
  
  /*
   * giving a state to flats so we can fill it up with the json data
   * the allFlats state is just here to get all the flats back after a search
   * won't happen when using an API as a new call to the API will be made
   * each time you hit a key
  */

 /*
   * defining a constructor for the App with various states that can be filled with JSON data
   * or with input / event data in order to trigger other behaviors 
  */
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      allFlats: [],
      selectedFlat: null,
      search: ""
    };
    }

// fetching the json file with the flats
// componentDidMount is a method part of the component life cycle in React
// the componentDidMount method is called when an instance of a component is being created and inserted into the DOM

  componentDidMount () {
    // the URL with the JSON object (or the API url)
    const url = 'https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json'
    // the Ajax fetch function : puts the response in a JSON object so it can be used by React components
    fetch (url)
      .then (response => response.json())
      .then((data) => {
        // changing the state of the flats to get the data
        // storing the data from the JSON in 2 different arrays to be used for searching while the user inputs text
        this.setState ({
          flats: data,
          allFlats: data
        });
      })
  }

  // defining the function called by the handleClick event on the Flat component
  // puts the state of selectedFlat as the flat being clicked on
  // using an arrow function to bind the this to the function?

  // setState schedules an update to a component’s state object. When state changes, the component responds by re-rendering.
  
  selectFlat = (flat) => {
      this.setState({
        selectedFlat: flat
      });
  }

  // the handleSearch function is triggered when the search input is modified
  // a state has been created so the component can respond by re-rendering
  // search is set as the value of the input
  // and then we filter the allFlats array using a Regular Expression
  // which is a JS object

  // we call the constructor new RepExp 
  // must use the constructor (even if it is compiled at runtime) because we don't know yet the structure
  // of the pattern as it comes from the user's input
  // the exec method on the RegExp executes a search for a match in a string. It returns an array of information or null

  handleSearch = (event) => {
    this.setState ({
        search: event.target.value,
        flats: this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
        });
  }

  // the main App rendering function
  render() {

    // centering the map by default with a constant
    // should change though...
    let center = {
      lat: 48.8566,
      lng: 2.3522
    }

    // re-centers the map using the selectedFlat coordinates by changing the state of the component so it will re-render

    if (this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng
      }
    }
        
    // returning the actual JSX code

    // declaring a state for the search so component can re-render

    return (
      <div className="app">
        <div className="main">
          
          <div className="search">
          <input
            type="text"
            placeholder="Search appartments"
            value={this.state.search}
            onChange={this.handleSearch}
            />
          </div>
          
          <div className="flats">     {/*looping through the array to display each flat */}
           {this.state.flats.map((flat) => {
              return (
                <Flat 
                  key={flat.name}
                  flat={flat}
                  selectFlat={this.selectFlat}
                />
                )
           })}
          </div>

        </div>
        
        <div className="map">
            <GoogleMapReact
              center={center}
              zoom={13}
              >
              {/*iterates through the flats array and creates the marker components
              flag the selected component just by comparing the Flat component*/}
              {this.state.flats.map((flat) => {
              return <Marker 
                      key={flat.name}
                      lat={flat.lat}
                      lng={flat.lng}
                      text={flat.price}
                      selected={flat === this.state.selectedFlat}
                      />
              })}

            </GoogleMapReact>

        </div>
        
      </div>

      )
  }
}

export default App;
