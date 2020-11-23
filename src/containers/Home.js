import { React } from 'react';
import { Route } from 'react-router-dom';
import { Login } from '../components/Login';
import useStyles from './useStyles';
import { useSelector, useDispatch } from 'react-redux';
import { _createAccount, _loggedin } from '../actions';

const Home = () => {   
    // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
    // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { userInfo, loginUserInfo } = useSelector(state => ({
    userInfo : state.LoginReducer.userInfo,
    loginUserInfo : state.LoginReducer.loginUserInfo
  })); // 유저정보를 가져옴
    
  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  const onCreate = (data) => dispatch(_createAccount(data));
  const onLogin = (data) => dispatch(_loggedin(data));

    return (
        <Route>
            <Login userInfo={userInfo} 
                   loginUserInfo={loginUserInfo}
                   onCreate={onCreate}
                   onLogin={onLogin}
                   classes={useStyles()}/>
        </Route>
    );
}

export default Home;