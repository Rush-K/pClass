import { Route } from 'react-router-dom';
import { Project } from '../components/Project';
import { MainBar } from '../components';
import useStyles from './useStyles';

const ProjOrder = (props) => {
    return (
        <Route>
            <MainBar prjopen={true} {...props} classes={useStyles()}/>
            <Project {...props} params={props.match.params} classes={useStyles()}/>
        </Route>
    );
}

export default ProjOrder;