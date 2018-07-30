import React, { Component } from 'react';
// import logo from './logo.svg';
import GoogleMapApi from './GoogleMapApi';
import './App.css';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// Json data loaded from Foursquare passed to Google Map API for location data 
import * as defaultData from './defaultData.json';
import HambMenu from './HambMenu';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      venues: [],
      displayedMarkers:[],
      showingInfoWindow: false,
      activeMarker: {},
      selectedMarker: {},
      animateMarker: {},
      query:'',
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this); 
  }

  initFourSquare() {
    const lat= 48.86;
    const lng= 2.33;
    const CLIENT_ID = 'VEIX15AQ0VBBHLMJFG2JIF34OMRTXQF2PYWKFMXJ2ZY2TZSV';
    const CLIENT_SECRET = 'F4Q15NFEVSNTCVRO2LU12NGM2SQMQANMCJEZYW2NWUPSR20N';
    const DATE = Date.now();
    return fetch(`https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${DATE}&query=Mc Donald's`)
    .then((res) => {
      if(!res.ok){
        throw res && window.alert("Foursquare API could not load please try again later")
      }
      else return res.json();
    })
    .then((res) => {
      const venues = res.response["venues"];
      this.setState({venues: venues});
      this.initiDisplayedMarkers(venues);
    })
  }

  componentDidMount() {
    // API call
    window.gm_authFailure = this.gm_authFailure;
    this.initFourSquare();
  }
  
  onMarkerClick = (props) => {
    this.setState({
        selectedMarker: props,
        activeMarker: props,
        showingInfoWindow: true,
    })
    this.animateMarker(props);
  }

  animateMarker = (props) => {
    this.setState({
      selectedMarker:props,
    })
  }
  
  onMapClicked = () => {
      if (this.state.showingInfoWindow) {
          this.setState({
          selectedMarker: {},
          showingInfoWindow: false,
          activeMarker: null,
          })
      }
  }

  initiDisplayedMarkers = (venues) =>{
    // Load objects and data only if markers is filled
    const markersData = []
    const markers = venues
    if (markers !== undefined) {
      for (let i=0; i<markers.length; i++){
        // Make data from JSON to table to be accessible
       markersData.push({
          "name":markers[i].name,
          "location":markers[i].location,
          "address":markers[i].location.address,
          "distance":markers[i].location.distance,
          "lat":markers[i].location.lat,
          "lng":markers[i].location.lng,
          "id":markers[i].id,
          "position":{"lat":markers[i].location.lat,"lng":markers[i].location.lng},
          "distance":markers[i].location.distance,
        })
      }
    } 
    this.setState({displayedMarkers: markersData})
  }

  filterSearch = (query) =>{
    if(query.length>0){
      this.setState({query:query})
      const searchedMarkers =  this.state.displayedMarkers.filter((marker) => {
        return marker.address.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      })
      this.setState({displayedMarkers:searchedMarkers})
    }
    else {
      this.initiDisplayedMarkers(this.state.venues)
      this.setState({query:''})}
  }

  // Check for Google Maps Authentification first
  gm_authFailure(){
    window.alert("Google Map cannot load please retry later or update your Google API Key")
  }
    
  render() {    
    return (    
        <div className="App">
          <AppBar className="appbar">
            <Toolbar className="toolbar">
              <Typography className="appbar-title" variant="title" color="inherit" position="absolute">
                    Paris McDonald's Finder
              </Typography>
            </Toolbar>
            <HambMenu
              className="hambmenu"
              aria-label="Hamburger Menu to search places"
              tabIndex={this.props.tabIndex}
              selectedMarker={this.state.selectedMarker}
              markers={this.state.markers}
              displayedMarkers={this.state.displayedMarkers}
              activeMarker={this.state.activeMarker}
              onMarkerClick ={this.onMarkerClick}
              ListMarkerClick ={this.ListMarkerClick}
              initiDisplayedMarkers ={this.initiDisplayedMarkers}
              filterSearch ={this.filterSearch}
              query={this.state.query}
              onMapClicked ={this.onMapClicked}
              onMenuClicked ={this.onMenuClicked}
            />            
          </AppBar>  

          <GoogleMapApi
            selectedMarker={this.state.selectedMarker}
            markers={this.state.markers}
            displayedMarkers={this.state.displayedMarkers}
            activeMarker={this.state.activeMarker}
            showingInfoWindow={this.state.showingInfoWindow}
            onMarkerClick ={this.onMarkerClick}
            ListMarkerClick ={this.ListMarkerClick}
            onMapClicked ={this.onMapClicked}
            onMenuClicked ={this.onMenuClicked}
            animateMarker={this.state.animateMarker}
          />
          
      </div>
    );
  }
}

export default App;
