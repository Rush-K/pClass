import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Button, Dialog, Paper, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import ProjectIcon from '@material-ui/icons/Note';
import Addprojectform from './Addprojectform';

class Subject extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        numofproject: this.props.projectInfo.length,
        projectlist: this.props.projectInfo
      }
    }
 
    addProject = (prev) => {
      const pl = this.state.projectlist;
      this.props.projectCreate(prev);
      this.setState({projectlist: pl.concat(prev)});
    }

    handleProjectFormClose = () => this.setState({open: !this.state.open})
    render() {
        return(
            <Container style={{display: 'block',justifyContent: 'center',
             alignItems: 'center', textAlign: 'center'}}>

              <h1 style={{color: '#F6BB43'}}>{this.props.subjectname} Project List</h1>
              <Paper style={{display: 'block', justifyContent: 'center', alignItems: 'center', width:'100%', height:'60vh'}} elevation={3}>
                <List>
                {this.state.projectlist.map(project => (
                <ListItem button key={project.projectname} component={Link} href={`/subject/${this.props.projectInfo.subjectname}/${project.projectid}`}>
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
                <Addprojectform subjectindex={this.props.subjectindex} addProject={this.addProject} numofproject={this.state.numofproject}/>
              </Dialog>
              </Box>
            </Container>
        );
    }

}

export default Subject;