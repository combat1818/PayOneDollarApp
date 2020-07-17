import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    height: '100vh',
    width: '100vw',
    padding: theme.spacing(8, 0, 6),
  },
  text: {
    color: 'black',
  },
  linkContainer: {
    marginTop: '100px',
  },
  linkDivContainer: {
    display: 'flex',

    backgroundColor: '#0b46b5',
    color: 'white',
    borderRadius: '10px',
    height: '75px',
    width: '150px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: 32,
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container component='main' className={classes.heroContent}>
        <Typography
          component='h1'
          variant='h2'
          align='center'
          color='textPrimary'
          gutterBottom
          className={classes.text}
        >
          Can You Waste One Dollar?
        </Typography>
        <Typography
          variant='h5'
          align='center'
          color='textSecondary'
          component='p'
          className={classes.text}
        >
          Find out where in the World people are able to afford one dollar to
          find out who else paid one dollar <br />
          <br /> Use built in analytics to sort them by name, age, country of
          origin and more! <br /> Check out people who paid for premium features
        </Typography>
        <Grid
          container
          direction='row'
          justify='center'
          spacing={10}
          className={classes.linkContainer}
        >
          <Grid item>
            <div className={classes.linkDivContainer}>
              <Link to='/register' className={classes.link}>
                Sign Up
              </Link>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.linkDivContainer}>
              <Link to='/login' className={classes.link}>
                Sign In
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Landing;
