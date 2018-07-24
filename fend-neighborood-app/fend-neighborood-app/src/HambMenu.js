import { slide as Menu } from 'react-burger-menu';
import React, { Component } from 'react';
import * as markerData from './markerData.json';
import PropTypes from 'prop-types';

import { MenuItem, MenuList, List } from '../node_modules/@material-ui/core';

import { InfoWindow } from '../node_modules/google-maps-react/dist/components/InfoWindow';






class HambMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  static propTypes = {
    selectedMarker: PropTypes.array.isRequired,
  }
  
  

  render () {
    const {selectedMarker} = this.props;
    return (
      <div>
      
        

        <Menu
        position="absolute">
          <MenuList>
          {selectedMarker.map(data =>   
            <MenuItem id= {"menu-id "+data.key} onClick = { this.handleToggle } key={data.key} className="menu-item"> 
              
                {data.name}
              
            </MenuItem>
          )}
          </MenuList>
        </Menu>
          
        
        
      
      </div>
    );
  }
}

export default HambMenu;