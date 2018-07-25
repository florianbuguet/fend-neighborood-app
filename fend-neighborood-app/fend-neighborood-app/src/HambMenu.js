import { slide as Menu } from 'react-burger-menu';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, MenuList } from '../node_modules/@material-ui/core';

class HambMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: false,
    };
  }

  static propTypes = {
    markers: PropTypes.array.isRequired,
  }

  ListMarkerClick = (selectedMarker) => {
    this.props.onMarkerClick(selectedMarker);
  }


  render () {
    const {markers} = this.props;
    
    return (
      <div>
        <Menu
        position="absolute">
          <MenuList>
          {markers.map(data =>   
            <MenuItem 
            tabIndex={this.props.tabIndex}
            name={data.name}
            position={data.position}
            id= {"menu-id "+data.key} 
            onClick ={() => this.ListMarkerClick(data)}
            key={data.key} 
            className="menu-item"> 
              
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