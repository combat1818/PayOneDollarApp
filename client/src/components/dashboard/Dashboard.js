import React, { useEffect } from 'react';
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
import Image1 from '../../img/charts.png'; // Import using relative path
import Image2 from '../../img/worldMapDashboard.png'; // Import using relative path

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {},
  counters: { flexGrow: 0 },
  card: {
    height: 200,
    width: 200,
    margin: 10,
    textAlign: 'center',
  },
  counterHeader: {
    height: 40,
    backgroundColor: '#3f51b5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    color: 'white',
  },
  counterContent: {
    display: 'flex',
    flexGrow: 1,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 80,
  },
  counterLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    fontSize: 20,
    backgroundColor: '#586fed',
    borderRadius: 20,
    margin: 15,
    color: 'white',
  },
  sections: {
    flexGrow: 2,
    display: 'flex',
  },
  section1: {
    flex: 1,
    minHeight: 300,
    margin: 10,
    backgroundImage: `url(${Image1})`,
    backgroundSize: 'cover',
  },
  section2: {
    flex: 1,
    minHeight: 300,
    margin: 10,
    backgroundImage: `url(${Image2})`,
    backgroundSize: 'cover',
  },
  tfContainer: {
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  table: { margin: 10 },
  footer: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  link: {
    textDecoration: 'none',
  },
}));

const Dashboard = ({ profile, profiles }) => {
  const classes = useStyles();
  let bronzeMembership = 0;
  let silverMembership = 0;
  let goldMembership = 0;
  if (profiles != null) {
    profiles.forEach((profile) => {
      if (profile.membership == '1') bronzeMembership++;
      else if (profile.membership == '2') silverMembership++;
      else if (profile.membership == '3') goldMembership++;
    });
  }
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <Navbar />
      </div>

      <Grid
        container
        direction='row'
        justify='center'
        className={classes.counters}
      >
        <Grid item>
          <Paper className={classes.card} elevation={5}>
            <div className={classes.counterHeader}>Bronze Members:</div>
            <div className={classes.counterContent}>
              {profile != null && parseInt(profile.membership) >= 1
                ? bronzeMembership
                : '?'}
            </div>
            {profile != null && parseInt(profile.membership) < 1 ? (
              <Link to='/pricing' className={classes.link}>
                <div className={classes.counterLink}>Upgrade</div>
              </Link>
            ) : (
              ''
            )}
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.card} elevation={5}>
            <div className={classes.counterHeader}>Silver Members:</div>
            <div className={classes.counterContent}>
              {profile != null && parseInt(profile.membership) >= 2
                ? silverMembership
                : '?'}
            </div>
            {profile != null && parseInt(profile.membership) < 2 ? (
              <Link to='/pricing' className={classes.link}>
                <div className={classes.counterLink}>Upgrade</div>
              </Link>
            ) : (
              ''
            )}
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.card} elevation={5}>
            <div className={classes.counterHeader}>Gold Members:</div>
            <div className={classes.counterContent}>
              {profile != null && parseInt(profile.membership) >= 3
                ? goldMembership
                : '?'}
            </div>
            {profile != null && parseInt(profile.membership) < 3 ? (
              <Link to='/pricing' className={classes.link}>
                <div className={classes.counterLink}>Upgrade</div>
              </Link>
            ) : (
              ''
            )}
          </Paper>
        </Grid>
      </Grid>

      <Grid container className={classes.sections} alignItems='center'>
        <Grid item md={6} xs={12}>
          <Paper elevation={5} className={classes.section1}></Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper elevation={5} className={classes.section2}></Paper>
        </Grid>
      </Grid>

      <div className={classes.tfContainer}>
        <div className={classes.table}>
          <Table data={profiles} />
        </div>
        <div className={classes.footer}>
          <footer>
            <Container maxWidth='sm'>
              <Typography variant='body1'>
                My sticky footer can be found here.
              </Typography>
              <Copyright />
            </Container>
          </footer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.auth.user,
  profiles: state.auth.users,
});

export default connect(mapStateToProps)(Dashboard);
