import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as mapStyles from './styles.json';
// Source : https://www.npmjs.com/package/google-maps-react
import PropTypes from 'prop-types';

export class GoogleMapApi extends Component {

    state = {
        selectedMarker: {},
        styles:mapStyles,
    }

    static propTypes = {
        markers: PropTypes.array.isRequired,
        displayedMarkers: PropTypes.array.isRequired,
        selectedMarker: PropTypes.object.isRequired,
        showingInfoWindow: PropTypes.bool.isRequired,
        onMarkerClick: PropTypes.func.isRequired,
    }

    markerClicked = (selectedMarker) => {
        this.props.onMarkerClick(selectedMarker);
        this.setState({
            selectedMarker: selectedMarker,
           })
    }
    
    mapClicked = () => {
        this.props.onMapClicked();
    }
   
    render() {
        const {selectedMarker, displayedMarkers, showingInfoWindow,className} =  this.props
        
        const style = {width: '100%', height: '100%'}
        
        return (
            <div >
                <Map
                        google={this.props.google}
                        style={style}    
                        styles={mapStyles} 
                        initialCenter={{
                            lat: 48.86335864032518,
                            lng: 2.333826370447076
                        }}
                        className={'map'}
                        zoom={13.2}
                        onClick={this.mapClicked}
                    >
                    
                    {displayedMarkers.map(data =>
                        <Marker
                            key={data.id}
                            name={data.name}
                            position={data.position}
                            distance={data.distance}
                            address={data.address}
                            onClick = {(data) => {this.markerClicked(data)}}
                            className={className}
                            animation={this.props.google.maps.Animation.DROP}
                        />
                    )}
                        <Marker
                            position={this.props.selectedMarker.position}
                            address={selectedMarker.name}
                            animation={this.props.google.maps.Animation.DROP}
                        />                
                        <InfoWindow
                            // marker={this.state.activeMarker}
                            position={selectedMarker.position}
                            onOpen={this.windowHasOpened}
                            onClose={this.mapClicked}
                            visible={showingInfoWindow}
                            className="infowindow"
                        >
                            <div className="infowindow-details">
                                <div className="infowindow-name">{selectedMarker.name}</div>
                                <div className="infowindow-address"> Address : {selectedMarker.address}</div>
                                <div className="infowindow-address"> Distance : {selectedMarker.distance}</div>
                                <div className="infowindow-source">Source: foursquare</div>
                            </div>
                        </InfoWindow>
                        
                </Map>
            </div>
        );
        
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDwQK0R7NiLlRqbv__6ylRdtkhJhKAmXyU'),
    
})(GoogleMapApi)
