import { Route } from 'react-router-dom';
import { Subject } from '../components/Subject';
import { MainBar } from '../components';
import useStyles from '../pages/useStyles';

const SubjOrder = () => {
    return (
        <Route>
            <MainBar classes={useStyles()}/>
            <Subject classes={useStyles()}/>
        </Route>
    );
}

export default SubjOrder;