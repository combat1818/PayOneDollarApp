import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';

import Chart from 'chart.js';

import Image1 from '../../img/charts.png'; // Import using relative path
import Image2 from '../../img/worldMapDashboard.png'; // Import using relative path
import Logo from '../../img/dollarLogo.jpg'; // gives image path

import PrettySidebar from '../dashboard/PrettySidebar';
import Counter from '../dashboard/Counter';
import PrettyTable from '../dashboard/PrettyTable';

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
    flexDirection: 'column',
    flex: 0.67,
    boxShadow: '1px 3px 1px #9E9E9E',
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  chartHeader: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#cccccc',
    padding: 20,
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f2f2f2',
  },
  chartContainer: {
    flex: 8,
    padding: 20,
  },
  secondPanel: {
    display: 'flex',
    flexDirection: 'column',
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
    display: 'flex',
    flexDirection: 'column',
    flex: 0.67,
    boxShadow: '1px 3px 1px #9E9E9E',
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  secondPanel2: {
    display: 'flex',
    flexDirection: 'column',
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
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
        datasets: [
          {
            data: [0, 86, 169, 205, 150, 409, 507, 645, 701, 783, 800],
            label: '',
            borderColor: '#5e72e4',
            fill: false,
          },
        ],
      },
      options: {
        elements: {
          point: {
            radius: 0,
          },
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontFamily: 'Poppins-Light',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontFamily: 'Poppins-Light',
                maxTicksLimit: 6,
              },
            },
          ],
        },
      },
    });

    const ctx1 = document.getElementById('barChart');
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Aug', 'May', 'Jun'],
        datasets: [
          {
            label: 'TeamA Score',
            data: [10, 50, 25, 70, 40, 20],
            backgroundColor: [
              '#fb6340',
              '#fb6340',
              '#fb6340',
              '#fb6340',
              '#fb6340',
              '#fb6340',
            ],
            borderWidth: 1,
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
              offset: 20,
              barThickness: 15,
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontFamily: 'Poppins-Light',
                maxTicksLimit: 6,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontFamily: 'Poppins-Light',
                maxTicksLimit: 6,
              },
            },
          ],
        },
      },
    });

    const ctx2 = document.getElementById('pieChart');
    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [10, 20, 25],
            backgroundColor: ['#35AFF1', '#EA6687', '#842ED0'],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ['One Dollar', 'Two Dollars', 'Three Dollars'],
      },
      options: {
        cutoutPercentage: 30,
        legend: {
          labels: {
            fontFamily: 'Poppins-Light',
            fontSize: 15,
          },
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
            <div style={styles.chartHeader}>
              <span style={{ marginTop: 20 }}>Site's revenue</span>
            </div>
            <div style={styles.seperator}></div>
            <div
              style={{
                flex: 8,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <canvas id='lineChart' style={{ width: '80%', height: '80%' }} />
            </div>
          </div>
          <div style={styles.secondPanel}>
            <div style={styles.chartHeader}>
              <span style={{ marginTop: 20 }}>New Users</span>
            </div>
            <div style={styles.seperator}></div>
            <div style={styles.chartContainer}>
              <canvas id='barChart' style={{ width: '80%', height: '80%' }} />
            </div>
          </div>
        </div>
        <div style={styles.secondRow}>
          <div style={styles.firstPanel2}>
            <div style={styles.chartHeader}>
              <span style={{ marginTop: 20 }}>Most recent users</span>
            </div>
            <div style={styles.seperator}></div>
            <PrettyTable />
          </div>
          <div style={styles.secondPanel2}>
            <div style={styles.chartHeader}>
              <span style={{ marginTop: 20 }}>People who wasted</span>
            </div>
            <div style={styles.seperator}></div>
            <div style={styles.chartContainer}>
              <canvas id='pieChart' style={{ width: '80%', height: '80%' }} />
            </div>
          </div>
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
