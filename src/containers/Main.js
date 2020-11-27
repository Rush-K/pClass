import { Component, React } from 'react';
import { Route } from 'react-router-dom';
import { Mainbar } from '../components/Mainbar';
import { Introduction } from '../components/Introduction';
import useStyles from './useStyles';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


const Main = () => {
  const { mainMenuInfo } = useSelector(state => ({
    mainMenuInfo : state.SubjectReducer.subjectlist
  })); 
  const loginUserInfo = JSON.parse(sessionStorage.getItem("loginUserInfo"));
  
       return (
        <div>
          <Route>
            <Mainbar loginUserInfo={loginUserInfo} mainMenuInfo={mainMenuInfo} classes={useStyles()}/>
            <Introduction classes={useStyles()}/>
          </Route>
        </div>
      );
}

export default Main;