import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';

import Table from './Table';
import WorldMap from './WorldMap';
import Analytics from './Analytics';
import About from './About';
import Users from './Users';

import Chart from 'chart.js';

import Image1 from '../../img/charts.png'; // Import using relative path
import Image2 from '../../img/worldMapDashboard.png'; // Import using relative path
import Logo from '../../img/dollarLogo.jpg'; // gives image path

import PrettySidebar from '../dashboard/PrettySidebar';
import Counter from '../dashboard/Counter';

var styles = {
  root: {
    display: 'flex',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F5FA',
    zIndex: -2,
  },
  background: {
    backgroundColor: '#212429',
    width: '100%',
    height: 380,
    position: 'absolute',
    zIndex: -1,
  },
  topBar: {
    width: '100%',
    margin: 10,
    marginLeft: 20,
    marginTop: 20,
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  countersContainer: {
    marginTop: 50,
    display: 'flex',
    flex: 1,
    height: 120,
    padding: 20,
    justifyContent: 'space-between',
  },
  firstRow: {
    display: 'flex',
    flex: 1,
    height: 490,
    marginTop: 5,
    padding: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  firstPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.67,
    boxShadow: '1px 3px 1px #9E9E9E',
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  secondPanel: {
    flex: 0.32,
    boxShadow: '1px 3px 1px #9E9E9E',
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 5,
  },
  secondRow: {
    display: 'flex',
    flex: 1,
    height: 370,
    marginTop: 30,
    padding: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  firstPanel2: {
    flex: 0.67,
    boxShadow: '1px 3px 1px #9E9E9E',
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  secondPanel2: {
    flex: 0.32,
    boxShadow: '1px 3px 1px #9E9E9E',
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 5,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 40,
    height: 100,
    justifyContent: 'center',
    fontSize: 17,
    fontFamily: 'Poppins-Light',
    color: 'grey',
  },
};

// background div needs a wrapper with position: relative to scroll as desired

const PrettyDashboard = ({ profile, profiles }) => {
  useEffect(() => {
    const ctx = document.getElementById('lineChart');
    console.log(ctx);
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [
          {
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: '',
            borderColor: '#3e95cd',
            fill: false,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  });

  return (
    <div style={styles.root}>
      <PrettySidebar />
      <div style={styles.container}>
        <div style={{ position: 'relative' }}>
          <div style={styles.background}></div>
        </div>
        <div style={styles.topBar}>
          <span>Dashboard</span>
        </div>
        <div style={styles.countersContainer}>
          <Counter count={321} percentage={31.8} title='One' iconType={1} />
          <Counter count={211} percentage={16.8} title='Two' iconType={2} />
          <Counter count={189} percentage={22.9} title='Three' iconType={3} />
          <Counter count={321} percentage={56.7} title='Sum' iconType={4} />
        </div>
        <div style={styles.firstRow}>
          <div style={styles.firstPanel}>
            <canvas id='lineChart' style={{ width: '80%', height: '80%' }} />
          </div>
          <div style={styles.secondPanel}>asd</div>
        </div>
        <div style={styles.secondRow}>
          <div style={styles.firstPanel2}>asd</div>
          <div style={styles.secondPanel2}>asd</div>
        </div>
        <div style={styles.footer}>
          <span>
            © 2021 <span style={{ color: '#8090e9' }}>Aleksander Lorenc</span>
          </span>
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

export default connect(mapStateToProps)(PrettyDashboard);
