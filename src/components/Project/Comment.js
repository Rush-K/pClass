import React, { Component } from 'react';
import { Container, Paper, TextField, Button, Divider } from '@material-ui/core';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.card = this.props.card;
        this.modifyCard = this.props.modifyCard;
        this.state = {
            feedindex: this.card.id,
            writer: null,
            content: null
        }
    }
    
    writerChange = (e) => {
        this.setState({writer: e.target.value});
    }
    contentChange = (e) => {
        this.setState({content: e.target.value});
    }
    add = () => {
        this.card.commentlist = this.card.commentlist.concat(this.state);
        alert("성공");
        this.modifyCard(this.card);
    }
    render() {
        return (
            <Container style={{width: "600px", height: "500px", justifyContent: "center"}}>
                <Paper style={{width: "100%", height: "60%", display: "flex", flexDirection: "column",justifyContent: "center", marginTop: "2vh", marginBottom: "1vh"}} elevation={3}>
                {this.card.commentlist.map(cm => {
                    return (
                        <Container>
                            <Paper style={{width: "100%", backgroundColor: "burlywood"}}>
                                <h3>작성자 : {cm.writer}</h3>
                                <Divider />
                                <text>내용 : {cm.content}</text>
                            </Paper>
                        </Container>
                    );
                })}
                </Paper>                
                <Paper style={{width: "100%", display: "flex", flexDirection: "column",justifyContent: "center", marginTop: "1vh", marginBottom: "1vh"}} elevation={3}>
                    <Container>
                    <TextField style={{width: "100%"}} id="standard-basic" label="작성자 입력" onChange={this.writerChange} />
                    <TextField style={{width: "100%"}} id="standard-basic" label="Comment 입력" onChange={this.contentChange} />
                    <Button style={{marginBottom: "1vh", width: "100%", marginTop: "2vh"}} onClick={this.add} variant="outlined" color="secondary">
                    Comment 입력
                    </Button> 
                    </Container>
                </Paper>
            </Container>
        );
    }
}

export default Comment;