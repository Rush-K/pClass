import { React } from 'react';
import { Route } from 'react-router-dom';
import { MainBar } from '../components';
import { Introduction } from '../components/Introduction';
import useStyles from '../pages/useStyles';

const Main = () => {
    return (
      <div>
        <Route>
          <MainBar classes={useStyles()}/>
          <Introduction classes={useStyles()} />
        </Route>
      </div>
    );
}

export default Main;