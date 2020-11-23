import { Component, React } from 'react';
import { Route } from 'react-router-dom';
import { MainBar } from '../components';
import { Introduction } from '../components/Introduction';
import useStyles from './useStyles';
import { useSelector, useDispatch } from 'react-redux';

const Main = () => {

      // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
    // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
    const { loginUserInfo, mainMenuInfo } = useSelector(state => ({
      loginUserInfo : state.LoginReducer.loginUserInfo,
      mainMenuInfo : state.SubjectReducer.subjectlist
    })); // 유저정보를 가져옴

  return (
    <div>
      <Route>
        <MainBar loginUserInfo={loginUserInfo} mainMenuInfo={mainMenuInfo} classes={useStyles()}/>
        <Introduction classes={useStyles()} />
      </Route>
    </div>
  );
}

export default Main;