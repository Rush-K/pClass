import { React } from 'react';
import { Route } from 'react-router-dom';
import { Login } from '../components/Login';
import useStyles from './useStyles';

const Home = (props) => {
    return (
        <Route>
            <Login {...props} classes={useStyles()}/>
        </Route>
    );
}

export default Home;