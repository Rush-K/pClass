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
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

class MainBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        homeopen: false,
        miopen: false,
        open: false
      }
    }
    memberInvite = () => {
      this.setState({miopen: !this.state.miopen});
    }
    goToMain = () => {
      this.setState({homeopen : !this.state.homeopen});
    }
    handleDrawerClose = () => this.setState({open: !this.state.open})
    homeClose = () => this.setState({homeopen: !this.state.homeopen});
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

              {/* 홈 이동 */}
              {this.state.homeopen === true && 
               <Dialog
               open={this.state.homeopen}
               keepMounted
               onClose={this.homeClose}
               aria-labelledby="alert-dialog-slide-title"
               aria-describedby="alert-dialog-slide-description"
             >
               <DialogTitle id="alert-dialog-slide-title">{"홈 화면으로 이동하시겠습니까?"}</DialogTitle>
               <DialogContent>
                 <DialogContentText id="alert-dialog-slide-description">
                   확인을 누르시면 홈 화면으로 이동합니다.
                 </DialogContentText>
               </DialogContent>
               <DialogActions>
                 <Button onClick={this.homeClose} color="primary">
                   취소
                 </Button>
                 <Button href='/main' color="primary">
                   확인
                 </Button>
               </DialogActions>
             </Dialog>
            }
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
              <Divider />
              <ListItem button key="logout" component={Link} href="/">
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText primary="로그아웃" />
              </ListItem>
            </List> 
          </Drawer>
          </div>
        );
    }
}

export default MainBar;