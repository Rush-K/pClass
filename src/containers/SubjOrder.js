import { Route } from 'react-router-dom';
import { Subject } from '../components/Subject';
import { MainBar } from '../components';
import useStyles from './useStyles';

const SubjOrder = ({match}) => {
    return (
        <Route>
            <MainBar classes={useStyles()}/>
            <Subject params={match.params} classes={useStyles()}/>
        </Route>
    );
}

export default SubjOrder;