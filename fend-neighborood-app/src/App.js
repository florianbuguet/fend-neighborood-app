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
      markers: defaultData,
      displayedMarkers:[],
      showingInfoWindow: false,
      activeMarker: {},
      selectedMarker: {},
      query:''
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this); 
  }

  componentDidMount() {
    // API call
    window.gm_authFailure = this.gm_authFailure;
    this.initiDisplayedMarkers();
  }
  
  onMarkerClick = (props) =>
      this.setState({
          selectedMarker: props,
          activeMarker: props,
          showingInfoWindow: true, 
           
  })
  
  onMapClicked = () => {
      if (this.state.showingInfoWindow) {
          this.setState({
          selectedMarker: {},
          showingInfoWindow: false,
          activeMarker: null,
          
          })
      }
  }

  initiDisplayedMarkers = () =>{
    // Load objects and data only if markers is filled
    const markers = this.state.markers
    const markersData = []
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
      this.initiDisplayedMarkers()
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
          />
          
      </div>
    );
  }
}

export default App;
