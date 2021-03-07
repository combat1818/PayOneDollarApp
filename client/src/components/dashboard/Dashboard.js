import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Copyright from '../layout/Copyright';

import Navbar from '../layout/Navbar';
import Table from './Table';
import WorldMap from './WorldMap';
import Analytics from './Analytics';
import About from './About';
import Users from './Users';

import Image1 from '../../img/charts.png'; // Import using relative path
import Image2 from '../../img/worldMapDashboard.png'; // Import using relative path

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
  nav: {},
  mainBoard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: 10,
    boxShadow: '0 1px 3px 0px ',
    borderRadius: 10,
  },
  switches: {
    display: 'flex',
    marginLeft: 10,
    height: 40,
    marginRight: 10,
  },
  switch: {
    color: 'white',
    //borderTop: '80px solid white',
    borderLeft: '15px solid transparent',
  },
  panels: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  leftPanel: {
    display: 'flex',
    flex: 2,
    boxShadow: '0 1px 3px 0px ',
    borderRadius: 10,
    margin: 10,
    marginTop: 0,
  },
  rightPanel: {
    display: 'flex',
    flex: 3,
    boxShadow: '0 1px 3px 0px ',
    borderRadius: 10,
    margin: 10,
    marginTop: 0,
  },
}));

const Dashboard = ({ profile, profiles }) => {
  const classes = useStyles();

  const [currentView, setCurrentView] = useState(1);

  const handleViewChange = (e) => {
    setCurrentView(e);
  };

  console.log(currentView);
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <Navbar />
      </div>
      <div className={classes.mainBoard}>
        <div className={classes.switches}>
          <div className={classes.switch}>
            <Button
              variant='contained'
              color='primary'
              className={classes.heatButton}
              value={1}
              onClick={(e) => handleViewChange(1)}
            >
              About
            </Button>
          </div>
          <div className={classes.switch}>
            <Button
              variant='contained'
              color='primary'
              className={classes.heatButton}
              value={1}
              onClick={(e) => handleViewChange(2)}
            >
              Users
            </Button>
          </div>
          <div className={classes.switch}>
            <Button
              variant='contained'
              color='primary'
              className={classes.heatButton}
              value={2}
              onClick={(e) => handleViewChange(3)}
            >
              Pie charts
            </Button>
          </div>
          <div className={classes.switch}>
            <Button
              variant='contained'
              color='primary'
              className={classes.heatButton}
              value={3}
              onClick={(e) => handleViewChange(4)}
            >
              Map
            </Button>
          </div>
        </div>
        <div className={classes.panels}>
          {currentView == 1 ? (
            <About profile={profile} />
          ) : currentView == 2 ? (
            <Users />
          ) : currentView == 3 ? (
            <Analytics countriesData={profiles} />
          ) : (
            <WorldMap countriesData={profiles} />
          )}
        </div>
      </div>
    </div>
  );
};
/*<WorldMap countriesData={profiles} />*/
const mapStateToProps = (state) => ({
  profile: state.auth.user,
  profiles: state.auth.users,
});

export default connect(mapStateToProps)(Dashboard);
