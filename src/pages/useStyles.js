import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    markSize: {
      width: '100px',
      height: '100px',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
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
      },
    hide: {
        display: 'none',
      },
    drawer: {
        width: 250,
        flexShrink: 0,
      },
    drawerPaper: {
        width: 250,
      },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -250,
      },
    contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    paperRoot: {
        display: "flex",
        flexWrap: "wrap",
        height: "100vh",
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
      },
    },
  }
}));

export default useStyles;