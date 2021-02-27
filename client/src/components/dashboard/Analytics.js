import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

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

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
  bodyContainer: {
    display: 'flex',
    flex: 1,
  },
  controlsPanel: {
    flex: 1,
    margin: 10,
    padding: 10,
    boxShadow: '0 1px 3px 0px ',
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  chartPanel: {
    flex: 2,
    margin: 10,
    boxShadow: '0 1px 3px 0px ',
    borderRadius: 10,
  },
  propertySelect: {
    width: 200,
    margin: 50,
  },
  chartOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  slider: {
    width: 200,
  },
  button: {
    marginTop: 40,
  },
  chartHeaderContainer: {
    textAlign: 'center',
  },
  chartContainerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  chartContainer: {
    flex: 1,
    height: 400,
    padding: 40,
  },
}));

const Analytics = (props) => {
  const classes = useStyles();

  // Property to chart
  const [selectedProperty, setSelectedProperty] = useState('Membership');
  const handleSelectedPropertyChange = (event) => {
    setSelectedProperty(event.target.value);
  };

  // Selected Countries
  const [selectedCountries, setSelectedCountries] = useState(['All']);
  const handleSelectedCountriesChange = (event) => {
    console.log(event.target.value);
    setSelectedCountries(event.target.value);
  };

  // Selected Membership
  const [selectedMembership, setSelectedMembership] = useState(['All']);
  const handleSelectedMembershipChange = (event) => {
    console.log(event.target.value);
    setSelectedMembership(event.target.value);
  };

  // Selected Flag
  // Property to chart
  const [selectedFlag, setSelectedFlag] = useState('Both');
  const handleSelectedFlagChange = (event) => {
    setSelectedFlag(event.target.value);
  };

  // Age Slider
  const [ageInterval, setAgeInterval] = useState([0, 100]);
  const handleSetAgeInterval = (event, newValue) => {
    //console.log(event.target.value);
    setAgeInterval(newValue);
  };
  function valuetext(value) {
    return `${value}°C`;
  }

  //Generate chart
  const handleClick = (event) => {
    console.log('XD');
    // Create chart instance
    let chart = am4core.create('chartdiv', am4charts.PieChart);
    //console.log(props.location.state.countriesData);
    // We want to filter out state array of users, so that it is adjusted to requirements- java script filer method

    //console.log(copiedArray);

    //NEED TO UPDATE REGISTER FORM TO INCLUDE FLAG- BOTH FRONT AND BACKEND

    if (selectedProperty == 'Membership') {
      let copiedArray = props.location.state.countriesData.filter(
        (entry) =>
          Number(entry.age) >= ageInterval[0] &&
          Number(entry.age) <= ageInterval[1]
      );
      //console.log(copiedArray);
      /*
      FLAG NOT YET AVAILABLE
      if (selectedFlag != 'Both') {
        copiedArray.filter((entry)=>)
      }*/
      if (!selectedCountries.includes('All')) {
        console.log('There is a filer on countries');
        //TODO
        copiedArray = copiedArray.filter((entry) => {
          return selectedCountries.includes(entry.country);
        });
      }

      if (selectedFlag != 'Both') {
        console.log('There is a filter on flag');
        copiedArray = copiedArray.filter((entry) => {
          return (
            (selectedFlag == 'M' && entry.flag == 'Male') ||
            (selectedFlag == 'F' && entry.flag == 'Female')
          );
        });
      }
      console.log(copiedArray);
      let membershipBronzeCount = 0;
      let membershipSilverCount = 0;
      let membershipGoldCount = 0;
      copiedArray.forEach((element) => {
        element.membership == '1'
          ? membershipBronzeCount++
          : element.membership == '2'
          ? membershipSilverCount++
          : membershipGoldCount++;
      });
      console.log(
        membershipBronzeCount +
          ' ' +
          membershipSilverCount +
          ' ' +
          membershipGoldCount
      );
      chart.data = [
        {
          membership: 'Bronze members',
          count: membershipBronzeCount,
        },
        {
          membership: 'Silver members',
          count: membershipSilverCount,
        },
        {
          membership: 'Gold members',
          count: membershipGoldCount,
        },
      ];
      chart.innerRadius = am4core.percent(40);
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.category = 'membership';
      pieSeries.dataFields.value = 'count';
      pieSeries.slices.template.stroke = am4core.color('#4a2abb');
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      //pieSeries.slices.template.tooltipText = '';

      // Kreseczki i wskazania obok
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      chart.legend = new am4charts.Legend();
    } else if (selectedProperty == 'Country') {
      console.log('con');

      let copiedArray = props.location.state.countriesData.filter(
        (entry) =>
          Number(entry.age) >= ageInterval[0] &&
          Number(entry.age) <= ageInterval[1]
      );

      if (!selectedMembership.includes('All')) {
        console.log('There is a filer on countries');
        copiedArray = copiedArray.filter((entry) => {
          return selectedMembership.includes(entry.membership);
        });
      }

      if (selectedFlag != 'Both') {
        console.log('There is a filter on flag');
        copiedArray = copiedArray.filter((entry) => {
          return (
            (selectedFlag == 'M' && entry.flag == 'Male') ||
            (selectedFlag == 'F' && entry.flag == 'Female')
          );
        });
      }

      let map = {};
      copiedArray.forEach((element) => {
        if (map[element.country] == undefined) {
          map[element.country] = 1;
        } else {
          map[element.country]++;
        }
      });

      let data = [];
      COUNTRIES.forEach((element) => {
        if (map[element.name] != undefined) {
          data.push({
            country: element.name,
            count: map[element.name],
          });
        }
      });
      data.forEach((element) => {
        console.log(element);
      });
      chart.data = data;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.category = 'country';
      pieSeries.dataFields.value = 'count';
      //pieSeries.slices.template.stroke = am4core.color('#4a2abb');
      //pieSeries.slices.template.strokeWidth = 0.01;
      //pieSeries.slices.template.strokeOpacity = 1;
      //pieSeries.slices.template.tooltipText = '';

      // Kreseczki i wskazania obok
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      //chart.legend = new am4charts.Legend();
    } else if (selectedProperty == 'Flag') {
      console.log('flag');

      let copiedArray = props.location.state.countriesData.filter(
        (entry) =>
          Number(entry.age) >= ageInterval[0] &&
          Number(entry.age) <= ageInterval[1]
      );

      if (!selectedCountries.includes('All')) {
        console.log('There is a filer on countries');
        //TODO
        copiedArray = copiedArray.filter((entry) => {
          return selectedCountries.includes(entry.country);
        });
      }

      if (!selectedMembership.includes('All')) {
        console.log('There is a filer on countries');
        copiedArray = copiedArray.filter((entry) => {
          return selectedMembership.includes(entry.membership);
        });
      }

      let mCount = 0;
      let fCount = 0;
      copiedArray.forEach((element) => {
        element.flag == 'Male' ? mCount++ : fCount++;
      });

      chart.data = [
        {
          flag: 'Male',
          count: mCount,
        },
        {
          flag: 'Female',
          count: fCount,
        },
      ];
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.category = 'flag';
      pieSeries.dataFields.value = 'count';
      pieSeries.slices.template.stroke = am4core.color('#4a2abb');
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      //pieSeries.slices.template.tooltipText = '';

      // Kreseczki i wskazania obok
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      chart.legend = new am4charts.Legend();
    } else if (selectedProperty == 'Age') {
      console.log('tutej');
      let copiedArray = props.location.state.countriesData;

      if (!selectedCountries.includes('All')) {
        console.log('There is a filer on countries');
        //TODO
        copiedArray = copiedArray.filter((entry) => {
          return selectedCountries.includes(entry.country);
        });
      }

      if (!selectedMembership.includes('All')) {
        console.log('There is a filer on countries');
        copiedArray = copiedArray.filter((entry) => {
          return selectedMembership.includes(entry.membership);
        });
      }

      if (selectedFlag != 'Both') {
        console.log('There is a filter on flag');
        copiedArray = copiedArray.filter((entry) => {
          return (
            (selectedFlag == 'M' && entry.flag == 'Male') ||
            (selectedFlag == 'F' && entry.flag == 'Female')
          );
        });
      }

      let data = [];
      let ageCount = new Array(101).fill(0);
      copiedArray.forEach((element) => {
        ageCount[Number(element.age)]++;
      });
      for (let i = 0; i < 101; i++) {
        console.log(i + '- ' + ageCount[i]);
      }
      let i = 0;
      ageCount.forEach((element) => {
        if (element != 0) {
          data.push({
            age: i,
            count: element,
          });
        }
        i++;
      });
      data.forEach((element) => {
        console.log(element);
      });

      chart.data = data;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.category = 'age';
      pieSeries.dataFields.value = 'count';
      pieSeries.slices.template.stroke = am4core.color('#4a2abb');
      pieSeries.slices.template.strokeWidth = 0.3;
      pieSeries.slices.template.strokeOpacity = 1;
      //pieSeries.slices.template.tooltipText = '';

      // Kreseczki i wskazania obok
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      //chart.legend = new am4charts.Legend();
    }

    // Add data

    /*chart.data = [
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

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'litres';
    pieSeries.dataFields.category = 'country';
    */
  };

  return (
    <div id='root' className={classes.container}>
      <Navbar backIcon={true} />
      <div className={classes.bodyContainer}>
        <div className={classes.controlsPanel}>
          <div className={classes.chartOptionsContainer}>
            <Typography variant='h4' component='h4' gutterBottom>
              Pie Chart Options
            </Typography>
            <FormControl>
              <InputLabel id='propertySelect'>Property to chart</InputLabel>
              <Select
                labelId='propertySelect'
                id='demo-mutiple-name'
                //value={personName}
                onChange={handleSelectedPropertyChange}
                variant='outlined'
                defaultValue={'Membership'}
                input={<Input />}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                      width: 250,
                    },
                  },
                }}
                className={classes.propertySelect}
              >
                <MenuItem value={'Membership'}>Membership</MenuItem>
                <MenuItem value={'Country'}>Country</MenuItem>
                <MenuItem value={'Age'}>Age</MenuItem>
                <MenuItem value={'Flag'}>Flag</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id='countrySelect'>Select Countries</InputLabel>
              <Select
                labelId='countrySelect'
                id='demo-mutiple-name'
                value={selectedCountries}
                onChange={handleSelectedCountriesChange}
                defaultValue={selectedCountries}
                multiple
                variant='outlined'
                input={<Input />}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                      width: 250,
                    },
                  },
                }}
                className={classes.propertySelect}
              >
                <MenuItem key={'All'} value={'All'}>
                  All
                </MenuItem>
                {COUNTRIES.map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id='membershipSelect'>Membership</InputLabel>
              <Select
                labelId='membershipSelect'
                id='demo-mutiple-name'
                value={selectedMembership}
                onChange={handleSelectedMembershipChange}
                variant='outlined'
                defaultValue={'All'}
                multiple
                input={<Input />}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                      width: 250,
                    },
                  },
                }}
                className={classes.propertySelect}
              >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'1'}>Bronze</MenuItem>
                <MenuItem value={'2'}>Silver</MenuItem>
                <MenuItem value={'3'}>Gold</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id='propertySelect'>Flag</InputLabel>
              <Select
                labelId='flagSelect'
                id='demo-mutiple-name'
                //value={personName}
                onChange={handleSelectedFlagChange}
                variant='outlined'
                defaultValue={'Both'}
                input={<Input />}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                      width: 250,
                    },
                  },
                }}
                className={classes.propertySelect}
              >
                <MenuItem value={'Both'}>Both</MenuItem>
                <MenuItem value={'M'}>M</MenuItem>
                <MenuItem value={'F'}>F</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.slider}>
              <FormControl>
                <InputLabel id='ageSelect'>Age Interval</InputLabel>
                <Slider
                  value={ageInterval}
                  onChange={handleSetAgeInterval}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  getAriaValueText={valuetext}
                  defaultValue={[0, 100]}
                  className={classes.slider}
                  //labelId='ageSelect'
                />
              </FormControl>
            </div>
            <div className={classes.button}>
              <Button variant='contained' color='primary' onClick={handleClick}>
                Create Chart
              </Button>
            </div>
          </div>
        </div>
        <div className={classes.chartPanel}>
          <div className={classes.chartHeaderContainer}>
            <Typography variant='h4' component='h4' gutterBottom>
              {selectedProperty} Chart
            </Typography>
            <div className={classes.chartContainerWrapper}>
              <div id='chartdiv' className={classes.chartContainer}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
