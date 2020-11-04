import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
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

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin: false
      }
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
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="ID 기억하기"
              />
              <Link to="/main">
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                LOGIN
              </Button></Link>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"회원가입"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
          </Box>
        </Container>
        );
    }
}

export default Login;