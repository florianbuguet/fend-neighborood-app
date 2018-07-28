import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';

import './GoogleMap.css';

const GOOGLE_MAPS_JS_API_KEY='key';

const style = {
  "featureType": "administrative.country",
  "elementType": "geometry",
  "stylers": [
      {
          "visibility": "simplified"
      },
      {
          "hue": "#ff0000"
      }
  ]
};


class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      zoom: 13
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleMapMount = this.handleMapMount.bind(this)
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked (props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  handleMapMount(mapProps, map) {
    this.map = map;

    //log map bounds
    setTimeout(() => {
      console.log(this.map.getBounds());
     }, 100)
  }

  render() {
    const {google} = this.props;



    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div onClick={() => this.setState({zoom: ++this.state.zoom})} style={{position: "absolute", zIndex: 100}}>+</div>
        <div onClick={() => this.setState({zoom: --this.state.zoom})} style={{position: "absolute", zIndex: 100, top: '50px'}}>-</div>
      <Map className='google-map'
        google={google}
        onClick={this.onMapClicked}
        zoom={this.state.zoom}
        style={style}
        disableDefaultUI={true}
        clickableIcons={true}
        onReady={this.handleMapMount}>
          {this.props.restList.map((elem, index) => (
            <Marker
            key={index}
            onClick={this.onMarkerClick}
            name={elem.title}
            position={{lat: elem.latitude, lng: elem.longitude}}
            address={elem.address}
            tag_line={elem.tag_line}
            price_rating={elem.price_rating}
            restId={elem.id}
            icon={{
              url: require('../../../../img/marker.svg'),
            }}
            />
          ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div className='google-map_info-window'>
            <div>
                <div className="info-window_name-wrapper restaurant-info-item-non-active">
                    <a className='info-window_name' >{this.state.selectedPlace.name}</a>
                </div>

                <div className='infow-window_rest-address'>{this.state.selectedPlace.address}</div>
                <div className='info-window_rest-info'>
                    <span className='rest-info_rest-tag'>{this.state.selectedPlace.tag_line}</span>
                    <span className='rest-info_rest-price'>{this.state.selectedPlace.price_rating}</span>
                </div>
            </div>
          </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restList : state.fetchRestList.restList
})

export default connect(mapStateToProps, )(GoogleApiWrapper({
  apiKey: (GOOGLE_MAPS_JS_API_KEY)
})(GoogleMap));
