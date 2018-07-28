import { slide as Menu } from 'react-burger-menu';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, MenuList } from '../node_modules/@material-ui/core';

class HambMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: false,
      filterKey:[],
      
    };
  }

  static propTypes = {
    // markers: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
  }
  
  // Update selected marker when clicked
  ListMarkerClick = (selectedMarker) => {
    this.props.onMarkerClick(selectedMarker);
  }

  handleQuery = (query) => {
    this.props.filterSearchedLocations(query);
	}
  
  render () {
    const {markers, query} = this.props;

    const displayedMarkers = []
    
    // Load objects and data only if markers is filled
    if (markers !== undefined) {
      for (let i=0; i<markers.length; i++){
      // Make data from JSON to table to be accessible
      displayedMarkers.push({
        "name":markers[i].name,
        "location":markers[i].location,
        "address":markers[i].location.address,
        "distance":markers[i].location.distance,
        "lat":markers[i].location.lat,
        "lng":markers[i].location.lng,
        "id":markers[i].id,
        "position":{"lat":markers[i].location.lat,"lng":markers[i].location.lng}
      })
    } 
   
  }
    
    return (
      <div>
        <Menu
        position="absolute"
        >
          <MenuList>
            <div>
              <input 
              className="filter-input"
              type="text"
              placeholder="Search for a place in Paris..."
              value={query}
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