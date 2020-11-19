import { Component, React } from 'react';
import { Route } from 'react-router-dom';
import { MainBar } from '../components';
import { Introduction } from '../components/Introduction';
import useStyles from './useStyles';

const Main = (props) => {
  return (
    <div>
      <Route>
        <MainBar {...props} classes={useStyles()}/>
        <Introduction classes={useStyles()} />
      </Route>
    </div>
  );
}

export default Main;