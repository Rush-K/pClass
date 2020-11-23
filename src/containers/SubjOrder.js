import { Route } from 'react-router-dom';
import { Subject } from '../components/Subject';
import { MainBar } from '../components';
import useStyles from './useStyles';
import { useSelector, useDispatch } from 'react-redux';
import { _createProject } from '../actions';

const SubjOrder = ( {match} ) => {
    const subjectIndex = ["소프트웨어공학", "공개SW프로젝트", "컴퓨터공학종합설계1", "컴퓨터공학종합설계2"];

    const { mainMenuInfo, projectInfo } = useSelector(state => ({
        mainMenuInfo : state.SubjectReducer.subjectlist,
        projectInfo : state.ProjectReducer.projectlist
    })); // 유저정보를 가져옴

     // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
     const dispatch = useDispatch();
     // 각 액션들을 디스패치하는 함수들을 만드세요
     const projectCreate = (index, data) => dispatch(_createProject(index, data));

    console.log(projectInfo);
    
    let arr = new Array();
    for (let project of projectInfo) {
        if (project.subjectid === subjectIndex.indexOf(match.params.name)) {
            arr = arr.concat(project);
        }
    }

    return (
        <Route>
            <MainBar mainMenuInfo={mainMenuInfo} classes={useStyles()}/>
            <Subject subjectname={match.params.name} subjectindex={subjectIndex.indexOf(match.params.name)} 
            projectInfo={arr} projectCreate={projectCreate} classes={useStyles()}/>
        </Route>
    );
}

export default SubjOrder;