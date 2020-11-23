import { Route } from 'react-router-dom';
import { Project } from '../components/Project';
import { MainBar } from '../components';
import useStyles from './useStyles';
import { useSelector, useDispatch } from 'react-redux';

const ProjOrder = () => {
    const subjectIndex = ["소프트웨어공학", "공개SW프로젝트", "컴퓨터공학종합설계1", "컴퓨터공학종합설계2"];

    const { mainMenuInfo, feedInfo } = useSelector(state => ({
        mainMenuInfo : state.SubjectReducer.subjectlist,
        feedInfo : state.FeedReducer.feedlist
    })); // 유저정보를 가져옴
    return (
        <Route>
            <MainBar mainMenuInfo={mainMenuInfo} classes={useStyles()}/>
            <Project feedInfo={feedInfo} classes={useStyles()}/>
        </Route>
    );
}

export default ProjOrder;