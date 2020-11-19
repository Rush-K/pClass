import { Route } from 'react-router-dom';
import { Subject } from '../components/Subject';
import { MainBar } from '../components';
import useStyles from './useStyles';

const SubjOrder = (props) => {
    return (
        <Route>
            <MainBar {...props} classes={useStyles()}/>
            <Subject {...props} params={props.match.params} classes={useStyles()}/>
        </Route>
    );
}

export default SubjOrder;