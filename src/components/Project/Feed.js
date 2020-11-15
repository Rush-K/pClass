import React, { Component } from 'react';
import { Container, Paper, Button, TextField } from '@material-ui/core';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.card = this.props.card;
        this.modifyCard = this.props.modifyCard;
    }

    nameChange = (e) => {
        this.card.feedname = e.target.value;
    }
    managerChange = (e) => {
        this.card.feedmanager = e.target.value;
    }
    articleChange = (e) => {
        this.card.feedarticle = e.target.value;
    }
    startChange = (e) => {
        this.card.feedstart = e.target.value;
    }
    endChange = (e) => {
        this.card.feedend = e.target.value;
    }

    modify = () => {
        this.modifyCard(this.card);
    }
    render() {
        return (
            <div style={{width: "600px", display: "flex", justifyContent: "center", marginTop: "5vh", marginBottom: "5vh"}}>
              <Container>
                  <Paper square elevation={0}>
                    <TextField style={{width: "100%"}} id="standard-basic" label="피드 제목" onChange={this.nameChange} defaultValue={this.card.feedname} /> 
                    <TextField style={{width: "100%"}} id="standard-basic" label="피드 담당자" onChange={this.managerChange} defaultValue={this.card.feedmanager} /> 
                    <TextField style={{width: "100%"}} id="standard-basic" label="피드 내용" multiline rows={4} onChange={this.articleChange} defaultValue={this.card.feedarticle} /> 
                    <TextField style={{width: "100%"}} id="standard-basic" label="피드 시작일" onChange={this.startChange} defaultValue={this.card.feedstart} /> 
                    <TextField style={{width: "100%"}} id="standard-basic" label="피드 종료일" onChange={this.endChange} defaultValue={this.card.feedend} /> 
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