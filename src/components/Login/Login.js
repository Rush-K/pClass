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
import { Link } from 'react-router-dom';
import { Dialog } from '@material-ui/core';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: null,
        password: null,
      }
    }

    onCreate = () => this.props.onCreate(this.state);

    tryLogin = () => this.props.onLogin(this.state);

    emailChange = (e) => {
      this.setState({email : e.target.value});
    }

    passwordChange = (e) => {
      this.setState({password : e.target.value});
    }

    gotoMain = () => this.setState({isLogin: !this.state.isLogin})
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
          {this.props.loginUserInfo.email != null && 
          <Dialog open={true}>
            <Link to='/main'><Button>메인 페이지로 이동</Button></Link>
          </Dialog>
          }
        </Container>
        );
    }
}

export default Login;