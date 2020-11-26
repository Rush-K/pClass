import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DGUmark from '../../img/dguMarkonly.png';
import Title from '../../img/title.png';
import axios from 'axios';
import { Dialog, Link } from '@material-ui/core';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        email: null,
        password: null,
      }
    }

    onCreate = () => this.props.onCreate(this.state);

    tryLogin = () => {
      axios.post('http://ec2-15-165-236-0.ap-northeast-2.compute.amazonaws.com:4000/api/users/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response) {
          if (response.data.loginSuccess === true) {
            sessionStorage.setItem(
                "loginUserInfo",
                JSON.stringify({
                  userid: response.data.userId,
                })
            );
            console.log(sessionStorage);
            alert("로그인 성공")
          } else {
            alert("로그인 실패")
          }
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(sessionStorage);
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
          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Box className={classes.markSize}>
            <img src={DGUmark}/>
            </Box>
            <Container>
            <img width="100%" src={Title}/>
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
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="ID 기억하기"
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={this.tryLogin}
              >
                LOGIN
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Button onClick={this.onCreate}>
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
            <Link to='/main'><Button>메인 페이지로 이동</Button></Link>
          </Dialog>
          }
        </Container>
        );
    }
}

export default Login;