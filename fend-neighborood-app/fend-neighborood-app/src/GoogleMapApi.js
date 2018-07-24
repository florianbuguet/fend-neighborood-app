import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as mapStyles from './styles.json';
// Source : https://www.npmjs.com/package/google-maps-react
import PropTypes from 'prop-types';


export class GoogleMapApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},  
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }
    
    static propTypes = {
        selectedMarker: PropTypes.array.isRequired
    }
    
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
    });
    
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
            selectedPlace: {},
            showingInfoWindow: false,
            activeMarker: null
            })
        }
    };
    
    render() {
        if (!this.props.loaded){
            return <div>The Mac Donald's finder is loading</div>
        }
            const {selectedMarker} =  this.props
            
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
                        onClick={this.onMapClicked}
                    >
                    
                    {selectedMarker.map(data =>
                        <Marker
                        key={data.key}
                        title={data.title}
                        name={data.name}
                        position={data.position}
                        onClick = { this.onMarkerClick } />
                    )}
                        
                        <InfoWindow
                            marker={this.state.activeMarker}
                            onOpen={this.windowHasOpened}
                            onClose={this.windowHasClosed}
                            visible={this.state.showingInfoWindow}>
                                <div>
                                    <div className="infowindow-name">{this.state.selectedPlace.name}</div>
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
