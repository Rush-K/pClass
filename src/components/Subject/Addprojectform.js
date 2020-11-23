import React, { Component } from 'react';
import { Container, Divider, TextField, Button } from '@material-ui/core';

class Addprojectform extends Component {
    constructor(props) {
        super(props);
        this.numofproject = this.props.numofproject;
        this.addProject = this.props.addProject;
        this.state ={
            subjectid: this.props.subjectindex,
            projectid: this.numofproject + 1,
            projectname: null,
            projectleader: null,
            projectreadme: null
        }
    }

    nameChange = (e) => {
        this.setState({projectname: e.target.value});
    }
    leaderChange = (e) => {
        this.setState({projectleader: e.target.value});
    }
    readmeChange = (e) => {
        this.setState({projectreadme: e.target.value});
    }

    add = () => {
        this.addProject(this.state);
        alert("프로젝트가 추가되었습니다.");
        console.log(this.state);
    }

    render() {
        return  (
            <Container style={{width: "600px", height: "450px"}}>
            <h1> 프로젝트 개설하기 </h1>
            <Divider />
            <TextField
            id="projectname"
            label="프로젝트 이름 입력"
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
            id="projectleader"
            label="담당자 입력"
            style={{ margin: 8, width: "95%"}}
            placeholder="담당자 이름을 입력하세요"
            fullWidth
            margin="normal"
            InputLabelProps={{
            shrink: true,
            }}
            onChange={this.leaderChange}
            />
            <TextField
            id="projectreadme"
            label="프로젝트 정보 입력"
            multiline
            rows={6}
            placeholder="프로젝트 정보를 입력해주세요."
            variant="outlined"
            style={{marginTop: "2vh", width: "95%"}}
            onChange={this.readmeChange}
            />
            <Container style={{display: "flex", justifyContent: "center"}}>
            </Container>
            <Button style={{marginTop: "1vh", width: "95%"}}
            onClick={this.add} 
            variant="contained" color="secondary">추가하기</Button>
            </Container>
        );
    }
}

export default Addprojectform;
