import React, { Component } from 'react';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel,
         Paper, Divider, TextField, Container, Button } from '@material-ui/core';
import axios from 'axios';

class Register extends Component {
    constructor() {
        super();
        this.state ={
            username: "",
            useremail: "",
            userpassword: "",
            userstatus: ""
        };
    }
    nameChange = (event) => {this.setState({username: event.target.value})}
    emailChange = (event) => {this.setState({useremail: event.target.value})}
    passwordChange = (event) => {this.setState({userpassword: event.target.value})}
    statusChange = (event) => {this.setState({userstatus: event.target.value})}

    create = () => {
        if (this.state.username != "" &&
            this.state.useremail != "" &&
            this.state.userpassword != "" &
            this.state.userstatus != "") {
            
            axios.post('http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/users/register', {
                name: this.state.username,
                email: this.state.useremail,
                password: this.state.userpassword,
                role: this.state.userstatus
            }).then(function (response) {
                alert(`회원 가입이 ${this.state.useremail}로 성공적으로 완료되었습니다.`);
            }).catch(function (error) {
                console.log(error);
                alert("회원 가입에 실패햐였습니다.");
            });    // api Call
        } else {
            alert("회원 가입 폼을 빠짐없이 정확히 입력해주세요.");
        }
    }

    render() {
        console.log(this.state);
        return (
            <div style={{width: "90%", display: "flex", flexDirection: 'column', justifyContent: "center", marginTop: "5vh", marginBottom: "5vh"}}>
            <Paper elevation={3}
            style={{
                width: "100%",
                height: "60vh"
            }}>
                <Container style={{display: 'flex', justifyContent: 'center'}}>
                    <h1> 회원 가입 </h1>
                </Container>
                <Divider />
                <TextField
                id="username"
                label="이름 입력"
                style={{ margin: 8, width: "95%"}}
                placeholder="이름을 입력하세요"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={this.nameChange}
                />
                <Divider />
                <TextField
                id="useremail"
                label="이메일 입력"
                style={{ margin: 8, width: "95%"}}
                placeholder="ID로 사용할 이메일을 입력하세요"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={this.emailChange}
                />
                <Divider />
                <TextField
                id="userpassword"
                label="비밀번호 입력"
                style={{ margin: 8, width: "95%"}}
                placeholder="비밀번호를 입력하세요"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={this.passwordChange}
                />
                <Divider />
                <Container style={{marginTop: '1vh'}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">학생, 강의자 선택</FormLabel>
                        <RadioGroup aria-label="status" name="status" onChange={this.statusChange}>
                            <FormControlLabel value="0" control={<Radio />} label="학생" />
                            <FormControlLabel value="1" control={<Radio />} label="강의자" />
                        </RadioGroup>
                    </FormControl>
                </Container>
                <Divider />
                <Container style={{display: 'flex', justifyContent: 'center'}}>
                    <Button style={{marginTop: "1vh", width: "100%"}}
                            onClick={this.create} 
                            variant="contained" color="secondary">회원 가입하기</Button>
                </Container>
            </Paper>
            </div>
        );
    }
}

export default Register;