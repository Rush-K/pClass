import { Route } from 'react-router-dom';
import { Project } from '../components/Project';
import { Mainbar } from '../components/Mainbar';
import useStyles from './useStyles';
import { useSelector, useDispatch } from 'react-redux';

const ProjOrder = ( {match} ) => {
    const subjectIndex = ["소프트웨어공학", "공개SW프로젝트", "컴퓨터공학종합설계1", "컴퓨터공학종합설계2"];

    const { mainMenuInfo, feedInfo } = useSelector(state => ({
        mainMenuInfo : state.SubjectReducer.subjectlist,
        feedInfo : state.FeedReducer.feedlist
    })); // 유저정보를 가져옴

    const loginUserInfo = JSON.parse(sessionStorage.getItem("loginUserInfo"));

    const projectInfo = {
        subjectid: match.params.name, // 학수번호
        projectid: match.params.pname // Project Object Id
    }

    let temp = [
        {
            feedList: []
        },
        {
            feedList: []
        },
        {
            feedList: []
        }
    ]

    for (let t of feedInfo) {
      console.log(t);
      if (subjectIndex.indexOf(match.params.name) == t.index.subjectid
          && match.params.pname == t.index.projectid) {
            console.log(temp);
            temp[t.feedcolumn].feedList = temp[t.feedcolumn].feedList.concat(t);
      }
    }

    return (
        <Route>
            <Mainbar loginUserInfo={loginUserInfo} projectInfo={projectInfo} mainMenuInfo={mainMenuInfo} classes={useStyles()}/>
            <Project loginUserInfo={loginUserInfo} projectInfo={projectInfo} classes={useStyles()}/>
        </Route>
    );
}

export default ProjOrder;