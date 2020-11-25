import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Button, Dialog, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import ProjectIcon from '@material-ui/icons/Note';
import CancelIcon from '@material-ui/icons/Cancel';
import Addprojectform from './Addprojectform';

class Subject extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        numofproject: this.props.projectInfo[this.props.projectInfo.length - 1].projectid,
        projectlist: this.props.projectInfo
      }
    }
 
    addProject = (prev) => {
      const pl = this.state.projectlist;
      this.props.projectCreate(prev);
      this.setState({projectlist: pl.concat(prev), numofproject: this.state.numofproject + 1});
    }

    delProject = (data) => {
      const pl = this.state.projectlist;
      this.props.projectDelete(data);
      pl.splice(pl.indexOf(data), 1);
      this.setState({projectlist: pl, numofproject: this.state.numofproject - 1});
    }

    handleProjectFormClose = () => this.setState({open: !this.state.open})
    render() {
        return(
            <Container style={{display: 'block',justifyContent: 'center',
             alignItems: 'center', textAlign: 'center'}}>

              <h1 style={{color: '#F6BB43'}}>{this.props.subjectname} Project List</h1>
              <Paper style={{display: 'flex',width:'100%', height:'60vh'}} elevation={3}>
                <List style={{width: '85%'}}>
                {this.state.projectlist.map(project => (
                <ListItem button key={project.projectname} component={Link} href={`/subject/${this.props.subjectname}/${project.projectid}`}>
                  <ListItemIcon><ProjectIcon /></ListItemIcon>
                  <ListItemText style={{fontWeight: '2'}} primary={project.projectname} />
                  <Box style={{display: 'inline-flex', justifyContent: 'left'}}>
                    <ListItemText primary={`Leader : ${project.projectleader} 님`} />
                  </Box>
                </ListItem>
              ))}
                </List>
                <List>
                  {this.state.projectlist.map(project => (
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