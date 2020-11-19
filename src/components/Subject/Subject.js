import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Button, Dialog, Paper, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import ProjectIcon from '@material-ui/icons/Note';
import Addprojectform from './Addprojectform';

import * as actions from '../../actions';
import { connect } from 'react-redux';

class Subject extends Component {
    constructor() {
      super();
      this.state = {
        open: false,
        numofproject: 0,
        projectlist: []
      }
    }

    addProject = (prev) => {
      const pl = this.state;
      const pr = prev;
      pl.projectlist = pl.projectlist.concat(pr);
      this.setState({
        projectlist: pl.projectlist,
        numofproject: prev.projectid
      })
      console.log(this.state.projectlist);
    }

    handleProjectFormClose = () => this.setState({open: !this.state.open})
    render() {
        return(
            <Container style={{display: 'block',justifyContent: 'center',
             alignItems: 'center', textAlign: 'center'}}>
              <h1 style={{color: '#F6BB43'}}>{this.props.params.name} Project List</h1>
              <Paper style={{display: 'block', justifyContent: 'center', alignItems: 'center', width:'100%', height:'60vh'}} elevation={3}>
                <List>
                {this.state.projectlist.map(project => (
                <ListItem button key={project.projectname} component={Link} href={`/subject/${this.props.params.name}/${project.projectid}`}>
                  <ListItemIcon><ProjectIcon /></ListItemIcon>
                  <ListItemText style={{fontWeight: '2'}} primary={project.projectname} />
                  <Box style={{justifyContent: 'left'}}>
                    <ListItemText primary={`Leader : ${project.projectleader}`} />
                  </Box>
                </ListItem>
              ))}
                </List>
              </Paper>
              <Box style={{marginTop: '1vh'}}>
              <Button onClick={this.handleProjectFormClose} style={{width: '100%'}} variant="outlined" color="secondary">
                    프로젝트 개설
              </Button>
              <Dialog 
              open={this.state.open} onClose={this.handleProjectFormClose}>
                <Addprojectform addProject={this.addProject} numofproject={this.state.numofproject}/>
              </Dialog>
              </Box>
            </Container>
        );
    }

}

//액션 생성 함수 준비
const mapToDispatch = (dispatch) =>({
  onCreate: (data)  => dispatch(actions._create(data))
});

function mapStateToProps(state){
  //여기에서 state인자란 리듀서에서의 state이다.
  console.log("mapStateToProps : ",state);
  return state;
}

// 리덕스에 연결시키고 내보냅니다.
export default connect(mapStateToProps, mapToDispatch)(Subject);