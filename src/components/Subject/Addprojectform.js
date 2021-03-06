import React, { Component } from 'react';
import { Container, Divider, TextField, Button } from '@material-ui/core';

class Addprojectform extends Component {
    constructor(props) {
        super(props);
        this.numofproject = this.props.numofproject;
        this.addProject = this.props.addProject;
        this.state ={
            projectname: "",
            projectreadme: ""
        }
    }

    nameChange = (e) => {
        this.setState({projectname: e.target.value});
    }
    readmeChange = (e) => {
        this.setState({projectreadme: e.target.value});
    }

    add = () => {
        if (this.state.projectname != "" && this.state.projectreadme != "") {
            this.addProject(this.state);
            console.log(this.state);
        } else {
            alert("모든 입력 조건을 채워주세요.");
        }
    }

    render() {
        console.log(this.state.projectname);

        return  (
            <Container style={{width: "600px", height: "400px"}}>
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
            value={this.state.projectname}
            onChange={this.nameChange}
            />
            <Divider />
            <TextField
            id="projectreadme"
            label="프로젝트 정보 입력"
            multiline
            rows={6}
            placeholder="프로젝트 정보를 입력해주세요."
            variant="outlined"
            value={this.state.projectreadme}
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
