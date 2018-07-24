import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import HambMenu from './HambMenu'
import Filter from './Filter'




const NavBar = () => {
    
    return(
        
        <div>
        <AppBar 
            title="Test"
            onLeftIconButtonTouchTap={this.handleToggle} 
            position="absolute">
                <Toolbar>
                    <Typography variant="title" color="inherit" position="center">
                    Paris Mac Donald's Finder
                        
                            
                            {/* <HambMenu/> */}
                        
                    </Typography>
                </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;