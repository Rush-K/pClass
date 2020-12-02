import React, { Component } from 'react';
import axios from 'axios';
import { Container, Paper, Divider, TextField, Button, Dialog, Typography} from '@material-ui/core';

class Tools extends Component {
    constructor() {
        super();
        this.state = {
            update: false,
            inside: true,
            projectInfo : null,
            newprojectname: "",
            newprojectreadme: "",
            sendmail: "",
        }
    }

    loadProject = async () => {
        let temp = await axios.post('http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/project/main', {                        
                                 projectId: this.props.project.projectid
                              })
                              .then(function (response) {
                                    //console.log(response);
                                    return response.data;
                              }).catch(function (error) {
                                    //console.log(error);
                              });
        this.setState({projectInfo: temp, update: true});
    }
    
    modifyProject = async () => {
        let tf = true;
        if (this.state.newprojectname === "" || this.state.newprojectreadme === "") {
            alert("입력 폼을 정확히 채워주세요.");
        } else {
            await axios.put(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.project.subjectid}/${this.props.project.projectid}/settings/modifyname`, {                        
                beforename: this.state.projectInfo.projectname,
                modifyname: this.state.newprojectname,
                modifyreadme: this.state.newprojectreadme
        })
        .then(function (response) {
            alert("수정이 완료되었습니다. 재접속하십시오.");
            tf = false;
            console.log(response) 
        }) 
        .catch(function (error) {
            console.log(error)
        });
        }
        if (tf === false) this.setState({inside: false})
    }

    inviteProject = async () => {
        await axios.put(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.project.subjectid}/${this.props.project.projectid}/settings/invite`, {                        
            email: this.state.sendmail
         })
         .then(function (response) {
             alert("요청하신 이메일에 초대메일을 발송하였습니다.");
               //console.log(response);
               return response.data;
         }).catch(function (error) {
               console.log(error);
         });
    }

    exitProject = async () => {
        let tf = true;
        if (this.props.loginUserInfo.name === this.state.projectInfo.leader) {
            alert("리더는 프로젝트를 나갈 수 없습니다.");
        } else {
            let temp = await axios.put(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${this.props.project.subjectid}/${this.props.project.projectid}/settings/leaveproject`, {
                useremail: this.props.loginUserInfo.email,
                userId: this.props.loginUserInfo.userid,
                projectname: this.state.projectInfo.projectname
              }).then(function (response) {
                alert("프로젝트 탈퇴에 성공하였습니다.")
                tf = false;
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })
        }
        if (tf === false) this.setState({inside: false});
    }

    nameChange = (event) => {
        this.setState({newprojectname : event.target.value});
    }

    articleChange = (event) => {
        this.setState({newprojectreadme : event.target.value});
    }

    mailChange = (event) => {
        this.setState({sendmail: event.target.value});
    }

    render() {
        if (this.state.update === false) {
            return ( <div onClick={this.loadProject()}> </div>);
        }
        if (this.state.inside === false) {
            return ( <div><Button href={`/subject/${this.props.project.subjectid}`}>페이지 나가기</Button></div>)
        }
        return (
            <div style={{width: '100%', display: "flex", justifyContent: "center", marginTop: "5vh", marginBottom: "5vh"}}>
            <Paper elevation={0}
            style={{
                width: '100%',
                justifyContent: 'center'
            }}>
                <Container style={{marginBottom: "2vh"}}>
                <h1> 프로젝트 정보변경 </h1>
                <Divider />
                <TextField
                id="projectname"
                label="프로젝트 이름"
                style={{ margin: 8, width: "95%"}}
                fullWidth
                defaultValue={this.state.projectInfo.projectname}
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={this.nameChange}
                />
                <Divider />
                <Container style={{marginTop: '1vh', marginBottom: '1vh'}}>
                <Typography variant="h7">팀원 : </Typography>
                {this.state.projectInfo.contributor.map(member => {
                    return (
                        <Typography style={{display: 'block', width: '100%'}} variant="h7">{member}</Typography>
                    )
                })}
                </Container>
                <Divider />
                <TextField
                id="projectreadme"
                label="READ.ME"
                multiline
                rows={6}
                defaultValue={this.state.projectInfo.projectreadme}
                variant="outlined"
                style={{marginTop: "2vh", width: "95%"}}
                onChange={this.articleChange}
                />
                <Button style={{marginTop: "1vh", width: "95%"}}
                onClick={this.showData} 
                variant="contained" color="secondary" onClick={this.modifyProject}>프로젝트 수정하기</Button>
                </Container>
                <Divider />
                <Container style={{marginBottom: "2vh", justifyContent: "center"}}>
                  <h3>팀원 초대</h3>
                  <TextField
                  id="invite"
                  label="이메일 입력"
                  style={{ margin: 8, width: "95%"}}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  onChange={this.mailChange}
                  />
                  <Button style={{marginTop: "1vh", width: "95%"}}
                  variant="contained" color="secondary" onClick={this.inviteProject}>초대하기</Button>

                </Container>
                <Divider />
                <Container style={{marginTop: "2vh"}}>
                  <Button style={{width: "95%"}}
                  variant="contained" color="ordinary" onClick={this.exitProject}>프로젝트 나가기</Button>
                </Container>
            </Paper>
            </div>
        );
    }
}

export default Tools;