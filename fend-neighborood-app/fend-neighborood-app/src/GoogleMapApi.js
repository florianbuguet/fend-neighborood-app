import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as mapStyles from './styles.json';
// Source : https://www.npmjs.com/package/google-maps-react
import PropTypes from 'prop-types';


export class GoogleMapApi extends Component {

    state = {
        selectedMarker: undefined
    }

    static propTypes = {
        markers: PropTypes.array.isRequired,
        selectedMarker: PropTypes.object.isRequired,
        activeMarker: PropTypes.object.isRequired,
        showingInfoWindow: PropTypes.bool.isRequired,
        onMarkerClick: PropTypes.func.isRequired,
    }

    markerClicked = (selectedMarker, markers) => {
        this.props.onMarkerClick(selectedMarker);
        this.setState({selectedMarker: selectedMarker})
    }
    
    mapClicked = () => {
        this.props.onMapClicked();
    }
   
    render() {
        if (!this.props.loaded){
            return <div>The Mac Donald's finder is loading</div>
        }
            const {selectedMarker, markers, showingInfoWindow} =  this.props
            
            const styles = {width: '100%',
            height: '100%'}

            return (
            <div >
                <Map
                        google={this.props.google}
                        style={styles}     
                        initialCenter={{
                            lat: 48.8655747,
                            lng: 2.3209916
                        }}
                        className={'map'}
                        zoom={13.2}
                        onClick={this.mapClicked}
                    >
                    
                    {markers.map(data =>
                        <Marker
                        key={data.key}
                        title={data.title}
                        name={data.name}
                        position={data.position}
                        onClick = {(props, marker) => this.markerClicked(data, marker) } />
                    )}
                    
                        <InfoWindow
                            position={selectedMarker.position}
                            onOpen={this.windowHasOpened}
                            onClose={this.windowHasClosed}
                            visible={showingInfoWindow}>
                                <div>
                                    <div className="infowindow-name">{selectedMarker.name}</div>
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
