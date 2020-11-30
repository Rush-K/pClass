import React, { Component } from 'react';
import { Container, Paper, Button, TextField } from '@material-ui/core';
import axios from 'axios';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.card = this.props.card;
    }

    nameChange = (e) => {
        this.card.feedname = e.target.value;
    }
    managerChange = (e) => {
        this.card.manager = e.target.value;
    }
    articleChange = (e) => {
        this.card.content = e.target.value;
    }
    startChange = (e) => {
        this.card.start_date = e.target.value;
    }
    endChange = (e) => {
        this.card.end_date = e.target.value;
    }

    modify = () => {
        this.props.modifyFeed(this.card);
    }

    render() {
        return (
            <div style={{width: "600px", display: "flex", justifyContent: "center", marginTop: "5vh", marginBottom: "5vh"}}>
              <Container>
                  <Paper square elevation={0}>
                    <TextField style={{width: "100%"}} id="standard-basic" label="피드 제목" onChange={this.nameChange} defaultValue={this.card.feedname} /> 
                    <TextField style={{width: "100%"}} id="standard-basic" label="피드 담당자" onChange={this.managerChange} defaultValue={this.card.manager} /> 
                    <TextField style={{width: "100%"}} id="standard-basic" label="피드 내용" multiline rows={4} onChange={this.articleChange} defaultValue={this.card.content} /> 
                    <TextField style={{width: "100%"}} id="standard-basic" label="피드 시작일" onChange={this.startChange} defaultValue={this.card.start_date} /> 
                    <TextField style={{width: "100%"}} id="standard-basic" label="피드 종료일" onChange={this.endChange} defaultValue={this.card.end_date} /> 
                    <Button style={{width: "100%", marginTop: "2vh"}} variant="outlined" color="secondary" onClick={this.modify}>
                    피드 수정
                    </Button>
                  </Paper>
              </Container>
            </div>
        );
    }
}

export default Feed;