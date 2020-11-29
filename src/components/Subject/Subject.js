import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Button, Dialog, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import ProjectIcon from '@material-ui/icons/Note';
import CancelIcon from '@material-ui/icons/Cancel';
import Addprojectform from './Addprojectform';
import axios from 'axios';

class Subject extends Component {
    constructor(props) {
      super(props);
      this.state = {
        subjectInfo: null,
        open: false,
      }
    }
    
    loadProject = async () => {
      let temp = await axios.get(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/subjectmenu/${this.props.subjectid}`)
                              .then(function (response) {
                                  console.log(response);
                                  return response.data;
                              }).catch(function (error) {
                                  console.log(error);
                              });
      this.setState({subjectInfo: temp});
    }

    updateProject = async () => {
      let temp = await axios.get(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/subjectmenu/${this.props.subjectid}`)
                              .then(function (response) {
                                  console.log(response);
                                  return response.data;
                              }).catch(function (error) {
                                  console.log(error);
                              });
      this.setState({update: false});
    }

    addProject = async (prev) => {
      let temp = await axios.post(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.subjectid}/project/register`, {
                              name: this.props.userInfo.name,
                              projectname: prev.projectname,
                              projectreadme: prev.projectreadme,
                              userId: this.props.userInfo.userid,
                              subId: this.props.subjectid
                            })
                            .then(function (response) {
                              alert("프로젝트가 추가되었습니다.");
                              console.log(response);
                            })
                            .catch(function (error) {
                              console.log(error);
                            });
      this.loadProject();
    }

    delProject = async (data) => {
      let temp = await axios.put(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${data._id}/delete`, {
                              projectname: data.projectname,
                              userId: this.props.userInfo._id
                            }).then(function (response) {
                              console.log(response);
                            })
                            .catch(function (error) {
                              console.log(error);
                            })
      this.loadProject();
    }

    handleProjectFormClose = () => this.setState({open: !this.state.open})

    render() {
      if (this.state.subjectInfo === null) {
        return ( <div onClick={this.loadProject()} />);
      }

      console.log(this.state);

        return(
            <Container style={{display: 'block',justifyContent: 'center',
             alignItems: 'center', textAlign: 'center'}}>
              <h1 style={{color: '#F6BB43'}}>{this.props.subjectname} Project List</h1>
              <Paper style={{display: 'flex',width:'100%', height:'60vh', overflow: 'scroll'}} elevation={3}>
                <List style={{width: '85%'}}>
                {this.state.subjectInfo.map(project => (
                <ListItem button key={project._id} component={Link} href={`/subject/${this.props.subjectid}/${project._id}`}>
                  <ListItemIcon><ProjectIcon /></ListItemIcon>
                  <ListItemText style={{fontWeight: '2'}} primary={project.projectname} />
                  <Box style={{display: 'inline-flex', justifyContent: 'left'}}>
                    <ListItemText primary={`Leader : ${project.leader} 님`} />
                  </Box>
                </ListItem>
              ))}
                </List>
                <List>
                  {this.state.subjectInfo.map(project => (
                    <ListItem onClick={() => this.delProject(project)}>
                      <ListItemIcon>
                       <CancelIcon/>
                      </ListItemIcon>
                      <ListItemText>삭제</ListItemText>
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
                <Addprojectform subjectindex={this.props.subjectindex} addProject={this.addProject} numofproject={this.state.numofproject}/>
              </Dialog>
              </Box>
            </Container>
        );
    }

}

export default Subject;