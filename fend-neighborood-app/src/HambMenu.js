import { slide as Menu } from 'react-burger-menu';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, MenuList } from '../node_modules/@material-ui/core';

class HambMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: false,
      filterSearchedLocations:[]
    };
  }

  static propTypes = {
    markers: PropTypes.array.isRequired,
    displayedMarkers: PropTypes.array.isRequired,

  }
  
  // Update selected marker when clicked
  ListMarkerClick = (selectedMarker) => {
    this.props.onMarkerClick(selectedMarker);
  }

  handleQuery = (query) => {
    this.props.filterSearch(query);
  }

  render () {
    const {displayedMarkers} = this.props;
  
    return (
      <div>
        <Menu
        position="absolute"
        
        >
          <MenuList
          tabIndex={this.state.currentTabIndex}>
            <div>
              <input 
              className="filter-input"
              type="text"
              placeholder="Search for a place in Paris..."
              value={this.state.query}
              onChange={(event)=>this.handleQuery(event.target.value)}
              aria-label="text filter"
              />

                {displayedMarkers.map(data => {
                  return (
                    <MenuItem
                    name={data.name}
                    position={data.position}
                    distance={data.disance}
                    onClick ={() => this.ListMarkerClick(data)}
                    key={data.id} 
                    tabIndex={this.props.tabIndex}
                    className="bm-item mc-name"> 
                      
                        {data.name} {data.location.address}
                      
                    </MenuItem>
                  )
                })}
            </div>
          </MenuList>
        </Menu>
       </div>
    );
  }
  
}

export default HambMenu;