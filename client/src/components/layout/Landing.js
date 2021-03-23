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
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  container: {
    flex: 0.5,
    backgroundColor: '#202044',
  },
}));

/*
<Link to='/register' className={classes.link}>
                Sign Up
              </Link>
              */

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}></div>
    </div>
  );
};

export default Landing;
