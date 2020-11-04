import { React } from 'react';
import { Route } from 'react-router-dom';
import { MainBar } from '../components';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
      markSize: {
          width: "50px",
          height: "50px",
      },
      sectionDesktop: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
      }
    }
  }));

const Main = () => {
    return (
        <Route>
            <MainBar classes={useStyles()}/>
        </Route>
    );
}

export default Main;