import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DGUmark from '../../img/dguMarkonly.png';
import Title from '../../img/title.png';
import axios from 'axios';
import { Dialog } from '@material-ui/core';
import { Register } from '.';
import Intro from '../../img/intro.png';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        registeropen: false,
        open: false,
        email: null,
        password: null,
      }
    }

    openRegister = () => {
      this.setState({registeropen: !this.state.registeropen});
    }

    tryLogin = async () => {
      let dat= await axios.post('http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/users/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response) {
          if (response.data.loginSuccess === true) {
            sessionStorage.setItem(
                "loginUserInfo",
                JSON.stringify({
                  userid: response.data.userId,
                  email: response.data.email,
                  name: response.data.name,
                  status: response.data.status
                })
            );
            alert("로그인이 성공적으로 완료되었습니다.")
          } else {
            alert(response.data.message)
            return 1;
          }
      })
      .catch(function (error) {
        console.log(error);
      });

      if (dat != 1) {
        this.setState({open: !this.state.open}, () => console.log(this.state.open));
      }
    }

    emailChange = (e) => {
      this.setState({email : e.target.value});
    }

    passwordChange = (e) => {
      this.setState({password : e.target.value});
    }

    render() {

      const { classes } = this.props;

        return (
          <Container style={{display: 'grid', width: '100%', height: '100vh', gridTemplateColumns: '1fr 1fr'}}>
          <Container style={{marginTop: '15vh', alignItems: 'center',gridColumn: '1 / 2'}}>
            {/* 회원 가입 창*/}
            {this.state.registeropen === true && <Register />}
            {this.state.registeropen === false && <Container style={{display:'block'}}>
              <img width="100%" src={Title}/>
              <img width="100%" src={Intro}/>
              </Container>}
          </Container>
          <Container style={{marginTop: '12vh', alignItems: 'center',gridColumn: '2 / 3'}} component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Box className={classes.markSize}>
            <img src={DGUmark}/>
            </Box>
            <Container>
            </Container>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                color="secondary"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.emailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                color="secondary"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.passwordChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={this.tryLogin}
                style={{marginTop: "2vh"}}
              >
                LOGIN
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Button onClick={this.openRegister}>
                    {"회원가입"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
          </Box>
          {this.state.open === true && 
          <Dialog open={true}>
            <Button href='/main'>메인 페이지로 이동</Button>
          </Dialog>
          }
        </Container>
          </Container>
        );
    }
}

export default Login;