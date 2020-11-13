import 'date-fns';
import { Divider, Paper, TextField, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { Container } from 'react-smooth-dnd';

class Addfeedform extends Component {
    constructor(props) {
        super(props);
        this.addChildren = this.props.addChildren;
        this.state = {
            position: 0,
            feedname: null,
            feedmanager: null,
            feedarticle: null,
            feedstart: null,
            feedend: null
        }
    }
    nameChange = (e) => {
        this.setState({feedname: e.target.value});
    }
    managerChange = (e) => {
        this.setState({feedmanager: e.target.value});
    }
    articleChange = (e) => {
        this.setState({feedarticle: e.target.value});
    }
    startChange = (e) => {
        this.setState({feedstart: e.target.value});
    }
    endChange = (e) => {
        this.setState({feedend: e.target.value});
    }
    showData = () => {
        if (this.state.feedname === null ||
            this.state.feedmanager === null ||
            this.state.feedarticle === null ||
            this.state.feedstart === null ||
            this.state.feedend === null) {
            alert("입력 다하세요");
        } else {
                alert(this.state.feedname + "\n"
                +this.state.feedmanager + "\n" 
                +this.state.feedarticle + "\n"
                +this.state.feedstart + "\n"
                +this.state.feedend);
                this.addChildren(this.state);
        }
    }
    render() {
        return (
            <div style={{width: "600px", display: "flex", justifyContent: "center", marginTop: "5vh", marginBottom: "5vh"}}>
            <Paper elevation={0}
            style={{
                width: "500px",
                height: "500px"
            }}>
                <h1> 피드 추가하기 </h1>
                <Divider />
                <TextField
                id="feedname"
                label="피드 이름 입력"
                style={{ margin: 8, width: "95%"}}
                placeholder="피드 이름을 입력하세요"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={this.nameChange}
                />
                <Divider />
                <TextField
                id="feedmanager"
                label="담당자 입력"
                style={{ margin: 8, width: "95%"}}
                placeholder="담당자 이름을 입력하세요"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={this.managerChange}
                />
                <TextField
                id="feedarticle"
                label="피드 내용 입력"
                multiline
                rows={6}
                placeholder="피드 내용을 입력해주세요."
                variant="outlined"
                style={{marginTop: "2vh", width: "95%"}}
                onChange={this.articleChange}
                />
                <Container style={{display: "flex", justifyContent: "center"}}>
                <TextField 
                id="start"
                label="Start Date"
                type="date"
                defaultValue="2017-05-24"
                style={{width: "45%", marginTop: "1vh"}}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={this.startChange}
                />
                <TextField
                id="end"
                label="End Date"
                type="date"
                defaultValue="2017-05-24"
                style={{width: "45%", marginLeft: "2vh", marginTop: "1vh"}}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={this.endChange}
                />
                </Container>
                <Button style={{marginTop: "1vh", width: "95%"}}
                onClick={this.showData} 
                variant="contained" color="secondary">추가하기</Button>
            </Paper>
            </div>
        );
    }
}

export default Addfeedform;