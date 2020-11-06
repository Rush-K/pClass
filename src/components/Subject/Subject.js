import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Button, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import ProjectIcon from '@material-ui/icons/Note';

class Subject extends Component {
    render() {
        return(
            <Container style={{display: 'block',justifyContent: 'center',
             alignItems: 'center', textAlign: 'center'}}>
              <h1 style={{color: '#F6BB43'}}>{this.props.params.name} Project List</h1>
              <Paper style={{display: 'block', justifyContent: 'center', alignItems: 'center', width:'100%', height:'60vh'}} elevation={3}>
                <List>
                {['내 프로젝트', '니 프로젝트', '우리 프로젝트', '모두의 프로젝트'].map((text, index) => (
                <ListItem button key={text} component={Link} href={`/subject/${this.props.params.name}/${index}`}>
                  <ListItemIcon><ProjectIcon /></ListItemIcon>
                  <ListItemText style={{fontWeight: '2'}} primary={text} />
                  <Box style={{justifyContent: 'left'}}>
                    <ListItemText primary={`Leader : ${text}`} />
                  </Box>
                </ListItem>
              ))}
                </List>
              </Paper>
              <Box style={{marginTop: '1vh'}}>
              <Button style={{width: '100%'}} variant="outlined" color="secondary">
                    프로젝트 개설
              </Button>
              </Box>
            </Container>
        );
    }

}

export default Subject;