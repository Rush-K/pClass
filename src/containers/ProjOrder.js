import { Route } from 'react-router-dom';
import { Project } from '../components/Project';
import { Mainbar } from '../components/Mainbar';
import useStyles from './useStyles';
import { useSelector, useDispatch } from 'react-redux';

const ProjOrder = ( {match} ) => {

    const loginUserInfo = JSON.parse(sessionStorage.getItem("loginUserInfo"));

    const projectInfo = {
        subjectid: match.params.name, // 학수번호
        projectid: match.params.pname // Project Object Id
    }

    return (
        <Route>
            <Mainbar loginUserInfo={loginUserInfo} projectInfo={projectInfo} classes={useStyles()}/>
            <Project loginUserInfo={loginUserInfo} projectInfo={projectInfo} classes={useStyles()}/>
        </Route>
    );
}

export default ProjOrder;