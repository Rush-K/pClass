import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DGUmark from '../img/dguMarkonly.png';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import SubjectIcon from '@material-ui/icons/Subject';
import Link from '@material-ui/core/Link';

class MainBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        miopen: false,
        open: false
      }
    }
    memberInvite = () => {
      this.setState({miopen: !this.state.miopen});
    }
    goToMain = () => {
      this.props.history.push('/main');
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
              <div onClick={this.goToMain} style={{display: "inline-flex"}}>
              <img className={classes.markSize} src={DGUmark}/>
              <Typography variant="h5" className={classes.title}>DGU pClass</Typography>
              </div>
              <Button color="inherit"/>
              <Typography variant="h6" className={classes.title}></Typography>
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
              {this.props.mainMenuInfo.map(subject => (
                <ListItem button key={subject.subjectname} component={Link} href={`/subject/${subject.subjectname}`}>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary={subject.subjectname} />
                </ListItem>
              ))}
            </List> 
          </Drawer>
          </div>
        );
    }
}

export default MainBar;