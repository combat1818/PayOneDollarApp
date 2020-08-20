import React, { useRef, useLayoutEffect, useEffect } from 'react';

import Navbar from '../layout/Navbar';

import { COUNTRIES } from '../../utils/Countries';

//AmCharts
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

// Material UI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  chartOptions: {
    height: 150,
  },
  chartdiv: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  charts: {
    display: 'flex',
    height: '90vh',
    justifyContent: 'center',
    padding: 10,
  },
}));

function findId(country) {
  let returnCode = null;
  COUNTRIES.forEach((c) => {
    //console.log(c);
    if (c.name == country) {
      returnCode = c.code;
    }
  });
  return returnCode;
}

function findCountry(id) {
  let returnCountryName = null;
  COUNTRIES.forEach((c) => {
    if (c.id == id) {
      returnCountryName = c.name;
    }
  });
  return returnCountryName;
}

const Analytics = (props) => {
  const classes = useStyles();

  //console.log(props.location.state.countriesData);

  useEffect(() => {
    // Create chart instance
    let chart = am4core.create('chartdiv', am4charts.PieChart, 100);
    console.log('XD');
    let chartData = [
      { ageInterval: '0-10', count: 0 },
      { ageInterval: '11-20', count: 0 },
      { ageInterval: '21-30', count: 0 },
      { ageInterval: '31-40', count: 0 },
      { ageInterval: '41-50', count: 0 },
      { ageInterval: '51-60', count: 0 },
      { ageInterval: '70+', count: 0 },
    ];
    if (props.location.state.countriesData != null) {
      props.location.state.countriesData.forEach((data) => {
        console.log(data);
        let age = Number(data.age);
        //console.log(findId(data.country));

        if (findId(data.country) !== null) {
          if (age <= 10) data[0].count++;
          else if (age > 10 && age <= 20) chartData[1].count++;
          else if (age > 20 && age <= 30) chartData[2].count++;
          else if (age > 30 && age <= 40) chartData[3].count++;
          else if (age > 40 && age <= 50) chartData[4].count++;
          else if (age > 50 && age <= 60) chartData[5].count++;
          else if (age > 60) chartData[6].count++;
        }
      });
    }

    chart.data = chartData;

    /*
    // Add data
    chart.data = [
      {
        country: 'Lithuania',
        litres: 501.9,
      },
      {
        country: 'Czech Republic',
        litres: 301.9,
      },
      {
        country: 'Ireland',
        litres: 201.1,
      },
      {
        country: 'Germany',
        litres: 165.8,
      },
      {
        country: 'Australia',
        litres: 139.9,
      },
      {
        country: 'Austria',
        litres: 128.3,
      },
      {
        country: 'UK',
        litres: 99,
      },
      {
        country: 'Belgium',
        litres: 60,
      },
      {
        country: 'The Netherlands',
        litres: 50,
      },
    ];
    */

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'count';
    pieSeries.dataFields.category = 'ageInterval';

    chart.legend = new am4charts.Legend();
  });
  return (
    <div id='root' className={classes.root}>
      <Navbar backIcon={true} />
      <div className={classes.chartOptions}></div>
      <div className={classes.charts}>
        <div id='chartdiv' className={classes.chartdiv}></div>
      </div>
    </div>
  );
};

export default Analytics;
