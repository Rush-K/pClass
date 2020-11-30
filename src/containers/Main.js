import { React } from 'react';
import { Route } from 'react-router-dom';
import { Mainbar } from '../components/Mainbar';
import { Introduction } from '../components/Introduction';
import useStyles from './useStyles';
import { useSelector } from 'react-redux';


const Main = () => {
  const loginUserInfo = JSON.parse(sessionStorage.getItem("loginUserInfo"));

  console.log(loginUserInfo);
  
       return (
        <div>
          <Route>
            <Mainbar loginUserInfo={loginUserInfo} classes={useStyles()}/>
            <Introduction classes={useStyles()}/>
          </Route>
        </div>
      );
}

export default Main;