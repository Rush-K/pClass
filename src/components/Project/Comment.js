import React, { Component } from 'react';
import { Container, Paper, TextField, Button, Divider, Typography,
         Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.card = this.props.card;
        this.state = {
            commentlist: [],
            loading: false,

            opendelete: false,

            writer: this.props.loginUserInfo.name,
            content: ""
        }
    }

    loadComment = async () => {
        let temp = await axios.get(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/subject/${this.props.projectInfo.subjectid}/${this.props.projectInfo.projectid}/${this.card._id}/getcomment`)
                              .then(function (response) {
                                  console.log(response);
                                  return response.data;
                              }).catch(function (error) {
                                  console.log(error);
                              })
        this.setState({commentlist: temp, loading: true});
    }

    contentChange = (e) => {
        this.setState({content: e.target.value});
    }

    add = async () => {
        if (this.state.content != "") {
            let temp = await axios.post(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/subject/${this.props.projectInfo.subjectid}/${this.props.projectInfo.projectid}/${this.card._id}/addcomment`, {
                username: this.props.loginUserInfo.name,
                content: this.state.content,
                time: new Date()
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
            this.setState({content: "", loading: false});
        } else {
            alert("정확히 댓글을 입력해주세요.");
        }
    }

    delete = async (comment) => {
        if (this.props.loginUserInfo.name === comment.username) {
            await axios.delete(`http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/${comment._id}/deletecomment`)
                        .then(function (response) {
                            console.log(response);
                            alert("삭제되었습니다.");
                        }).catch(function (error) {
                            console.log(error);
                        })
                        this.setState({loading: false});
        } else {
            alert("삭제할 권한이 없습니다.");
        }
    }

    handledeleteClose = () => this.setState({opendelete: !this.state.opendelete})

    render() {
        if (this.state.loading === false) {
            return ( <div onClick={this.loadComment()}></div> );
        }
        console.log(this.state);
        return (
            <Container style={{width: "600px", height: "460px", display: "block", justifyContent: "center"}}>
                <Paper style={{width: "100%", height: "60%", display: "block", overflow: 'auto',marginTop: "2vh", marginBottom: "1vh"}} elevation={3}>
                {this.state.commentlist.map(comment => {
                    return (
                        <Paper style={{display: "flex", flexDirection: "column",marginTop: "1vh", marginLeft: "2vh", width: "95%", height: "8vh", overflow: 'auto', backgroundColor: "burlywood"}}>
                                <Container style={{display: 'flex', justifyContent: "flex-end"}}>
                                    <Typography variant="h7">작성자 : {comment.username}</Typography>
                                    <CancelIcon onClick={this.handledeleteClose} style={{marginLeft: "2vh"}}/>
                                    {this.state.opendelete === true &&
                                    <Dialog
                                    open={this.state.opendelete}
                                    keepMounted
                                    onClose={this.handledeleteClose}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                    >
                                    <DialogTitle id="alert-dialog-slide-title">{"피드를 삭제하시겠습니까?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                        확인을 누르시면 삭제합니다.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handledeleteClose} color="primary">
                                        취소
                                        </Button>
                                        <Button onClick={() => this.delete(comment)} color="primary">
                                        확인
                                        </Button>
                                    </DialogActions>
                                    </Dialog>
                                    }
                                </Container>
                                <Divider />
                                <Container>
                                    <Typography>내용 : {comment.content}</Typography>
                                </Container>
                        </Paper>
                    )
                })}
                </Paper>                
                <Paper style={{width: "100%", display: "flex", flexDirection: "row",justifyContent: "center", marginTop: "1vh", marginBottom: "1vh"}} elevation={3}>
                    <Container style={{marginTop: "1vh"}}>
                    <Typography>{this.props.loginUserInfo.name} 님</Typography>
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