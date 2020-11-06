import { React } from 'react';
import { Route } from 'react-router-dom';
import { Login } from '../components/Login';
import useStyles from '../pages/useStyles';

const Home = () => {
    return (
        <Route>
            <Login classes={useStyles()}/>
        </Route>
    );
}

export default Home;