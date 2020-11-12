import 'date-fns';
import { Divider, Paper, TextField, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { Container } from 'react-smooth-dnd';

class Addfeedform extends Component {
    render() {
        return (
            <div style={{display: "flex", justifyContent: "center", height: "100vh", marginTop: "5vh", marginBottom: "5vh"}}>
            <Paper elevation={3}
            style={{
                width: "500px",
                height: "500px"
            }}>
                <h1> 피드 추가하기 </h1>
                <Divider />
                <TextField
                id="standard-full-width"
                label="피드 이름 입력"
                style={{ margin: 8, width: "95%"}}
                placeholder="피드 이름을 입력하세요"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                />
                <Divider />
                <TextField
                id="standard-full-width"
                label="담당자 입력"
                style={{ margin: 8, width: "95%"}}
                placeholder="담당자 이름을 입력하세요"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                />
                <TextField
                id="outlined-multiline-static"
                label="피드 내용 입력"
                multiline
                rows={6}
                placeholder="피드 내용을 입력해주세요."
                variant="outlined"
                style={{marginTop: "2vh", width: "95%"}}
                />
                <Container style={{display: "flex", justifyContent: "center"}}>
                <TextField 
                id="date"
                label="Start Date"
                type="date"
                defaultValue="2017-05-24"
                style={{width: "45%", marginTop: "1vh"}}
                InputLabelProps={{
                shrink: true,
                }}
                />
                <TextField
                id="date"
                label="End Date"
                type="date"
                defaultValue="2017-05-24"
                style={{width: "45%", marginLeft: "2vh", marginTop: "1vh"}}
                InputLabelProps={{
                shrink: true,
                }}
                />
                </Container>
                <Button style={{marginTop: "1vh", width: "95%"}} variant="contained" color="secondary">추가하기</Button>
            </Paper>
            </div>
        );
    }
}

export default Addfeedform;