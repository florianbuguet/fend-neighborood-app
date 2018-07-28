import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as mapStyles from './styles.json';
// Source : https://www.npmjs.com/package/google-maps-react
import PropTypes from 'prop-types';

export class GoogleMapApi extends Component {

    state = {
        selectedMarker: undefined,
        styles:mapStyles
    }

    static propTypes = {
        markers: PropTypes.array.isRequired,
        selectedMarker: PropTypes.object.isRequired,
        showingInfoWindow: PropTypes.bool.isRequired,
        onMarkerClick: PropTypes.func.isRequired,
    }

    markerClicked = (selectedMarker) => {
        this.props.onMarkerClick(selectedMarker);
        this.setState({selectedMarker: selectedMarker})
    }
    
    mapClicked = () => {
        this.props.onMapClicked();
    }
   
    render() {
        const {selectedMarker, markers, showingInfoWindow} =  this.props
        
        const style = {width: '100%', height: '100%'}

        var displayedMarkers = []
        
        // Load objects and data only if markers is filled
        if (markers != undefined) {
            for (let i=0; i<markers.length; i++){
        // Make data from JSON to table to be accessible
                displayedMarkers.push({
                "name":markers[i].name,
                "location":markers[i].location,
                "address":markers[i].location.address,
                "lat":markers[i].location.lat,
                "lng":markers[i].location.lng,
                "id":markers[i].id,
                "position":{"lat":markers[i].location.lat,"lng":markers[i].location.lng}
                })
            } 
        } 
        
        return (
        <div >
            <Map
                    google={this.props.google}
                    style={style}    
                    styles={mapStyles} 
                    initialCenter={{
                        lat: 48.8655747,
                        lng: 2.3209916
                    }}
                    className={'map'}
                    zoom={13.2}
                    onClick={this.mapClicked}
                >
                
                {displayedMarkers.map(data =>
                    <Marker
                    key={data.id}
                    name={data.name}
                    position={data.location}
                    address={data.address}
                    onClick = {(data) => this.markerClicked(data) } 
                    animation={this.props.google.maps.Animation.DROP}
                    />
                )}
                
                    <InfoWindow
                    position={selectedMarker.position}
                    onOpen={this.windowHasOpened}
                    onClose={this.windowHasClosed}
                    visible={showingInfoWindow}
                    className="infowindow"
                    >
                        <div className="infowindow-name">{selectedMarker.name}</div>
                        <div className="infowindow-address"> {selectedMarker.address}</div>
                        <div className="infowindow-source">Source: foursquare</div>
                        {/* // Check if no possible with Map object */}
                        {/* <div className="infowindow-distance">Distance : {selectedMarker.position.distance}</div> */}
                    </InfoWindow>
                    
            </Map>
        </div>
    );
        
    }
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyDwQK0R7NiLlRqbv__6ylRdtkhJhKAmXyU'),
    
})(GoogleMapApi)
