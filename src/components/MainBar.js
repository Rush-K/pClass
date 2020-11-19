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
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import SubjectIcon from '@material-ui/icons/Subject';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CheckIcon from '@material-ui/icons/Check';
import Link from '@material-ui/core/Link';

class MainBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false
      }
    }

    handleDrawerClose = () => this.setState({open: !this.state.open})
    render() {
      console.log(this.props);
      const { classes } = this.props;
        return (
          <div className={classes.root}>
          <AppBar style={{backgroundColor: '#F6BB43'}} position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.handleDrawerClose}>
                <MenuIcon />
              </IconButton>
              <img className={classes.markSize} src={DGUmark}/>
              <Typography variant="h5" className={classes.title}>DGU pClass</Typography>
              <Button color="inherit"/>
              <Typography variant="h6" className={classes.title}></Typography>
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                  <CloudDownloadIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 30 new notifications" color="inherit">
                  <Badge badgeContent={0} color="secondary">
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
          <div className={classes.root}>
          </div>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={this.state.open}
            classes={{
            paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon /> Menu
              </IconButton>
            </div>
            <List>
              <ListItem key="SUBJECT">
                <ListItemIcon>
                  <SubjectIcon />
                </ListItemIcon>
                <ListItemText primary="SUBJECT" />
              </ListItem>
              <Divider />
              {['소프트웨어공학', '공개SW프로젝트', '기업사회맞춤형프로젝트', '컴퓨터공학종합설계2'].map((text, index) => (
                <ListItem button key={text} component={Link} href={`/subject/${text}`}>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <ListItem key="BOOKMARK">
              <ListItemIcon><BookmarkIcon /></ListItemIcon>
              <ListItemText primary="BOOKMARK" />
            </ListItem>
            <Divider />
            {['My Project'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon><CheckIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            ))}
          </Drawer>
          </div>
        );
    }
}

export default MainBar;