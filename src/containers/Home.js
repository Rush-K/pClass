import { React } from 'react';
import { Route } from 'react-router-dom';
import { Login } from '../components/Login';
import useStyles from './useStyles';
import { useDispatch } from 'react-redux';
import { _createAccount, _loggedin } from '../actions';

const Home = ( {history} ) => {   
    
  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  const onCreate = (data) => dispatch(_createAccount(data));

    return (
        <Route>
            <Login onCreate={onCreate}
                   classes={useStyles()}/>
        </Route>
    );
}

export default Home;