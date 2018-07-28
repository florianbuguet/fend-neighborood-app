import React, { Component } from 'react';
import PropTypes from 'prop-types'
// Source : https://github.com/negomi/react-burger-menu
import { slide as Menu } from 'react-burger-menu'
import { MenuItem } from '../node_modules/@material-ui/core';
import * as markerData from './markerData.json';



class Filter extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedMarker : markerData,
            menuOpen: false,        
        }
      }
    
      // This keeps your state in sync with the opening/closing of the menu
      // via the default means, e.g. clicking the X, pressing the ESC key etc.
      handleStateChange (state) {
        this.setState({
            menuOpen: state.isOpen,
            selectedMarker : markerData
        })  
      }
      
      // This can be used to close the menu, e.g. when a user clicks a menu item
      closeMenu () {
        this.setState({menuOpen: false})
      }
    
      // This can be used to toggle the menu, e.g. when using a custom icon
      // Tip: You probably want to hide either/both default icons if using a custom icon
      // See https://github.com/negomi/react-burger-menu#custom-icons
      toggleMenu () {
        this.setState({menuOpen: !this.state.menuOpen})
      }

      onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
    });


    render() {
        
        const {selectedMarker} =  this.props;
        

        return (
          
            <div>
                 
                <Menu className ="menu-item"
                     isOpen={this.state.menuOpen}
                     onStateChange={(state) => this.handleStateChange(state)}
                >
                    {selectedMarker.map(data =>
                        <MenuItem
                        key={data.key}
                        title={data.title}
                        name={data.name}
                        position={data.position}
                        onClick = { this.onMarkerClick } 
                        onStateChange={(state) => this.handleStateChange(state)}/>
                    )}
                </Menu>
                
            </div>   
        );
    }
}

export default Filter;
