import { Route } from 'react-router-dom';
import { Subject } from '../components/Subject';
import { Mainbar } from '../components/Mainbar';
import useStyles from './useStyles';

const SubjOrder = ( {match} ) => {
    const loginUserInfo = JSON.parse(sessionStorage.getItem("loginUserInfo"));

    return (
        <Route>
            <Mainbar loginUserInfo={loginUserInfo} classes={useStyles()}/>
            <Subject subjectid={match.params.name} userInfo={loginUserInfo} classes={useStyles()}/>
        </Route>
    );
}

export default SubjOrder;