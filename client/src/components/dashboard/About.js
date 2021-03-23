import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';

import { COUNTRIES } from '../../utils/Countries';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

//amCharts
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import WelcomeText from './WelcomeText';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  leftPanel: {
    display: 'flex',
    flex: 1,
    margin: 10,
    padding: 10,
    boxShadow: '0 1px 3px 0px ',
    borderRadius: 10,
    flexDirection: 'column',
    //alignItems: 'flex-end',
  },
  rightPanel: {
    display: 'flex',
    flex: 2,
    margin: 10,
    boxShadow: '0 1px 3px 0px ',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 2,
  },
  joinButtonContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'flex-end',
    width: '100%',
  },
  joinButton: {
    width: '100%',
    height: 50,
    fontSize: 20,
  },
  link: {
    textDecoration: 'none',
    width: '100%',
  },
  counters: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  counter: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    height: 200,
    boxShadow: '0 1px 3px 0px ',
    borderRadius: 10,
    margin: 5,
  },
  counterTitle: {
    display: 'flex',
    fontSize: 30,
    justifyContent: 'center',
    textAlign: 'center',
    margin: 5,
  },
  counterDisplay: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    fontSize: 25,
    alignItems: 'center',
  },
}));

const About = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.leftPanel}>
        <div className={classes.counters}>
          <div className={classes.counter}>
            <div className={classes.counterTitle}>People who paid 1$:</div>
            <div className={classes.counterDisplay}>count:</div>
          </div>
          <div className={classes.counter}>
            <div className={classes.counterTitle}>People who paid 10$:</div>
            <div className={classes.counterDisplay}>count:</div>
          </div>
          <div className={classes.counter}>
            <div className={classes.counterTitle}>People who paid 100$:</div>
            <div className={classes.counterDisplay}>count:</div>
          </div>
        </div>
        <div className={classes.joinButtonContainer}>
          <Link to='/pricing' className={classes.link}>
            <Button
              variant='contained'
              color='primary'
              className={classes.joinButton}
            >
              {props.profile != null && props.profile.membership == '0'
                ? 'Join'
                : 'Upgrade'}
            </Button>
          </Link>
        </div>
      </div>
      <div className={classes.rightPanel}>
        <WelcomeText />
      </div>
    </div>
  );
};

export default About;
