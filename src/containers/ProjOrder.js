import { Route } from 'react-router-dom';
import { Project } from '../components/Project';
import { MainBar } from '../components';
import useStyles from './useStyles';

const ProjOrder = ({match}) => {
    return (
        <Route>
            <MainBar classes={useStyles()}/>
            <Project params={match.params} classes={useStyles()}/>
        </Route>
    );
}

export default ProjOrder;