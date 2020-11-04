import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DGUmark from '../img/dguMarkonly.png';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChattingIcon from '@material-ui/icons/People';

class MainBar extends Component {

    render() {
      const { classes } = this.props;
        return (
          <div className={classes.root}>
          <AppBar style={{backgroundColor: '#F6BB43'}} position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <img className={classes.markSize} src={DGUmark}/>
              <Typography variant="h5" className={classes.title}>DGU pClass</Typography>
              <Button color="inherit"/>
              <Typography variant="h6" className={classes.title}>My Project</Typography>
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                  <CloudDownloadIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 30 new notifications" color="inherit">
                  <Badge badgeContent={30} color="secondary">
                  <ChattingIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        );
    }
}

export default MainBar;