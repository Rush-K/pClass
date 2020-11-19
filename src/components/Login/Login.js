import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

import * as actions from '../../actions';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: null,
        password: null,
        isLogin: false
      }
    }
    
    onCreate = () => this.props.onCreate(this.state);

    emailChange = (e) => {
      this.setState({email : e.target.value});
    }

    passwordChange = (e) => {
      this.setState({password : e.target.value});
    }

    gotoMain = () => this.setState({isLogin: !this.state.isLogin})
    render() {
      const { classes } = this.props;
      console.log(this.props);
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
                  <Button onClick={this.onCreate}>
                    {"회원가입"}
                  </Button>
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

//액션 생성 함수 준비
const mapToDispatch = (dispatch) =>({
  onCreate: (data)  => dispatch(actions._create(data))
});

function mapStateToProps(state){
  //여기에서 state인자란 리듀서에서의 state이다.
  console.log("mapStateToProps : ",state);
  return state;
}

// 리덕스에 연결시키고 내보냅니다.
export default connect(mapStateToProps, mapToDispatch)(Login);