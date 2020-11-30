import { React } from 'react';
import { Route } from 'react-router-dom';
import { Login } from '../components/Login';
import useStyles from './useStyles';
import { _createAccount, _loggedin } from '../actions';

const Home = () => {   

  sessionStorage.clear();
  console.log(sessionStorage);
    return (
        <Route>
            <Login classes={useStyles()}/>
        </Route>
    );
}

export default Home;