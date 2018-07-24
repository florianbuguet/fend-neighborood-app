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
      selectedMarker: markerData,
      
    }
   
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  // onMarkerClick = (props, marker, e) =>
  //     this.setState({
  //         selectedPlace: props,
  //         activeMarker: marker,
  //         showingInfoWindow: true
  // });

  

  flowData = (markerData) =>
        this.setState({
          selectedMarker: markerData,            
    });
  
  

  render() {
    return (    
      <div className="App">
          <AppBar>
            <Toolbar>
              <Typography variant="title" color="inherit" position="absolute">
                    Paris Mac Donald's Finder
                    </Typography>
                </Toolbar>
                    <HambMenu
                    selectedMarker={this.state.selectedMarker}
                    flowData={this.state.flowData}
                    />            
          </AppBar>  

          <GoogleMapApi
            selectedMarker={this.state.selectedMarker}
            // selectedPlace={this.state.selectedPlace}
            // activeMarker={this.state.activeMarker}
            // showingInfoWindow={this.state.showingInfoWindow}
            // onMarkerClick ={this.onMarkerClick}
            // onMapClicked ={this.onMapClicked}
          />
          
      </div>
    );
  }
}

export default App;
