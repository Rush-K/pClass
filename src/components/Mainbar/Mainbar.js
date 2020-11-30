import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingIcon from '@material-ui/icons/Settings';
import DGUmark from '../../img/dguMarkonly.png';
import { Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
         Menu, MenuItem, Popper } from '@material-ui/core';
import axios from 'axios';
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
import Tools from './Tools';

class Mainbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        project: this.props.projectInfo,
        subjectlist: null,
        homeopen: false,
        open: false,

        settingopen: false,
      }
    }

    goToMain = () => {
      this.setState({homeopen : !this.state.homeopen});
    }
    settingClose = () => this.setState({settingopen: !this.state.settingopen});
    menuClose = () => this.setState({open: !this.state.open});
    homeClose = () => this.setState({homeopen: !this.state.homeopen});
    
    subjectInfo = async () => {
      let temp = await axios.get('http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/subjectmenu')
    .then(function (response) {
           console.log(response);
           return response.data;
         })
    .catch(function (error) {
           console.log(error);
      });
      console.log(temp);
      this.setState({subjectlist: temp, open: !this.state.open});
    }

    render() {
      const { classes } = this.props;

      console.log(this.state)
        return (
          <div className={classes.root}>
          <AppBar style={{backgroundColor: '#F6BB43'}} position="static">
            <Toolbar style={{display: 'flex', flexDirection: 'row'}}>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.subjectInfo}>
                <MenuIcon />
              </IconButton>
              <div style={{justifyContent: 'center'}}>
                <img onClick={this.goToMain} className={classes.markSize} src={DGUmark}/>
              </div>
              <div style={{display: "flex"}}>
                <div style={{display: "block"}}>
                  <Typography style={{width: '50vh'}} variant="h4">DGU pClass</Typography>
                  <Typography>{this.props.loginUserInfo.name} 님 ({this.props.loginUserInfo.email})</Typography>
                </div>
              </div>

              <Container style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              
              {/* 프로젝트 화면 기능 툴바 */}
              {this.state.project != undefined &&
               <SettingIcon onClick={this.settingClose}/>
              } <Dialog open={this.state.settingopen} onClose={this.settingClose}>
              <Tools loginUserInfo={this.props.loginUserInfo} project={this.state.project}/>
              </Dialog>
              </Container>

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

            {/* 메뉴 사이드 바 */}
          <Drawer
            className={classes.drawer} variant="persistent" anchor="left" open={this.state.open} classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.menuClose}>
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
             {this.state.subjectlist != null && this.state.subjectlist.map(subject => (
               <ListItem button key={subject.sub_id} component={Link} href={`/subject/${subject.sub_id}`}>
                 <ListItemIcon><InboxIcon /></ListItemIcon>
                 <div style={{display: 'block'}}>
                   <ListItemText primary={subject.subjectname}></ListItemText>
                   <ListItemText secondary={subject.sub_id}></ListItemText>
                 </div>
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

export default Mainbar;