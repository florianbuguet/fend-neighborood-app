import React, { Component } from 'react';
// import logo from './logo.svg';
import GoogleMapApi from './GoogleMapApi';
import './App.css';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// Json data passed to Google Map API for location data 
import * as markerData from './markerData.json';
import HambMenu from './HambMenu';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedMarker: {},
      query:'Paris'
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this); 
  }

  //INIT Foursquare date param and fetch data

  initFourSquare (query) {
    const lat = 48.8655747;
    const lng = 2.3209916;
    const CLIENT_ID = 'VEIX15AQ0VBBHLMJFG2JIF34OMRTXQF2PYWKFMXJ2ZY2TZSV';
    const CLIENT_SECRET = 'F4Q15NFEVSNTCVRO2LU12NGM2SQMQANMCJEZYW2NWUPSR20N';
    const DATE = Date.now();
    return fetch(`https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${DATE}&query=${query}`).then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.code === 429){
       this.setState({markers: []});
      }
      else {const venuesData = res.response["venues"];
      this.setState({markers: venuesData});
      }
    })
  }

  componentDidMount() {
    // API call
    this.initFourSquare();
  }
  
  onMarkerClick = (props) =>
      this.setState({
          selectedMarker: props,
          showingInfoWindow: true,  
  });
  
  onMapClicked = () => {
      if (this.state.showingInfoWindow) {
          this.setState({
          selectedMarker: {},
          showingInfoWindow: false,
          activeMarker: null
          })
      }
  };

  // Pass query from Hambmenu and filter locations in the menu
  filterSearchedLocations = (query) => {
    this.setState({query:query});
    this.initFourSquare(query);
  }
  
  render() {    
    return (    
        <div className="App">
          <AppBar className="appbar">
            <Toolbar className="toolbar">
              <Typography className="appbar-title" variant="title" color="inherit" position="absolute">
                    Paris Places Finder
              </Typography>
            </Toolbar>
            <HambMenu
            className="hambmenu"
            aria-label="Hamburger Menu to search places"
            selectedMarker={this.state.selectedMarker}
            markers={this.state.markers}
            activeMarker={this.state.activeMarker}
            onMarkerClick ={this.onMarkerClick}
            ListMarkerClick ={this.ListMarkerClick}
            filterSearchedLocations ={this.filterSearchedLocations}
            query={this.state.query}
            onMapClicked ={this.onMapClicked}
            onMenuClicked ={this.onMenuClicked}
            />            
            
          </AppBar>  


          <GoogleMapApi
            selectedMarker={this.state.selectedMarker}
            markers={this.state.markers}
            activeMarker={this.state.activeMarker}
            showingInfoWindow={this.state.showingInfoWindow}
            onMarkerClick ={this.onMarkerClick}
            ListMarkerClick ={this.ListMarkerClick}
            onMapClicked ={this.onMapClicked}
            onMenuClicked ={this.onMenuClicked}
          />
          
      </div>
    );
  }
}

export default App;
