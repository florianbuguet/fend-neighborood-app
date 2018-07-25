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
      markers: markerData,
      showingInfoWindow: false,
      activeMarker: {},
      selectedMarker: {}, 
      
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);   
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

  flowData = (markerData) =>
        this.setState({
          markers: markerData,            
    });
  
  render() {
    return (    
      <div className="App">
          <AppBar className="appbar">
            <Toolbar className="toolbar">
              <Typography className="appbar-title" variant="title" color="inherit" position="absolute">
                    Paris Mac Donald's Finder
                    </Typography>
                </Toolbar>
                    <HambMenu
                    className="hambmenu"
                    selectedMarker={this.state.selectedMarker}
                    markers={this.state.markers}
                    activeMarker={this.state.activeMarker}
                    onMarkerClick ={this.onMarkerClick}
                    ListMarkerClick ={this.ListMarkerClick}
                    onMapClicked ={this.onMapClicked}
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
          />
          
      </div>
    );
  }
}

export default App;
