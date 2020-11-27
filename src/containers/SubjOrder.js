import { Route } from 'react-router-dom';
import { Subject } from '../components/Subject';
import { Mainbar } from '../components/Mainbar';
import useStyles from './useStyles';
import { useSelector, useDispatch } from 'react-redux';
import { _createProject, _deleteProject } from '../actions';

const SubjOrder = ( {match} ) => {
    const subjectIndex = ["소프트웨어공학", "공개SW프로젝트", "컴퓨터공학종합설계1", "컴퓨터공학종합설계2"];

    const { mainMenuInfo, projectInfo } = useSelector(state => ({
        mainMenuInfo : state.SubjectReducer.subjectlist,
        projectInfo : state.ProjectReducer.projectlist
    })); // 유저정보를 가져옴
     const dispatch = useDispatch();
     // 각 액션들을 디스패치하는 함수들을 만드세요
     const projectCreate = (data) => dispatch(_createProject(data));
     const projectDelete = (data) => dispatch(_deleteProject(data));

    console.log(projectInfo);
    
    let arr = new Array();
    for (let project of projectInfo) {
        if (project.subjectid === subjectIndex.indexOf(match.params.name)) {
            arr = arr.concat(project);
        }
    }
    const loginUserInfo = JSON.parse(sessionStorage.getItem("loginUserInfo"));

    return (
        <Route>
            <Mainbar loginUserInfo={loginUserInfo} mainMenuInfo={mainMenuInfo} classes={useStyles()}/>
            <Subject subjectid={match.params.name} 
            projectCreate={projectCreate} projectDelete={projectDelete} 
            userInfo={loginUserInfo} classes={useStyles()}/>
        </Route>
    );
}

export default SubjOrder;