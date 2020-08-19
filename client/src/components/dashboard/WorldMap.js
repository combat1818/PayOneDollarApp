import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

import Navbar from '../layout/Navbar';

import { COUNTRIES } from '../../utils/Countries';

// Amcharts
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

am4core.useTheme(am4themes_animated);

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

const useStyles = makeStyles((theme) => ({
  root: {},
  map: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  chartdiv: {
    width: '100vw',
    height: '100vh',
    border: 'solid',
    borderRadius: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectContainer: {
    display: 'flex',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heatButton: {
    width: 200,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
  },
}));

function createHeatMap(props, heatValue) {
  let map = am4core.create('chartdiv', am4maps.MapChart);
  map.geodata = am4geodata_worldLow;
  map.projection = new am4maps.projections.Miller();
  let polygonSeries = new am4maps.MapPolygonSeries();
  polygonSeries.useGeodata = true;
  map.series.push(polygonSeries);
  /* Disable Zoom and Drag
    map.maxZoomLevel = 1;
    map.seriesContainer.draggable = false;
    */

  // Configure series
  let polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText =
    '{name} \n Bronze: {valueBronze} \n Silver: {valueSilver} \n Gold: {valueGold}';
  polygonTemplate.fill = am4core.color('#74B266');

  // Create hover state and set alternative fill color
  let hs = polygonTemplate.states.create('hover');
  hs.properties.fill = am4core.color('#d6f0ff');

  polygonSeries.exclude = ['AQ'];
  //console.log(polygonSeries.mapPolygons.template);

  // Add heat rule
  polygonSeries.heatRules.push({
    property: 'fill',
    target: polygonSeries.mapPolygons.template,
    min: am4core.color('#99daff'),
    max: am4core.color('#02476e'),
    dataField: 'value',
  });

  polygonSeries.data = [
    { id: 'AF', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'AL', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'DZ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'AO', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'AR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'AM', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'AU', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'AT', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'AZ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BH', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BD', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BY', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BJ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BT', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BO', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BW', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BN', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BG', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BF', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'BI', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'KH', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CM', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CV', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CF', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TD', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CL', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CN', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CO', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'KM', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CD', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CG', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CI', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'HR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CU', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CY', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CZ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'DK', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GL', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'DJ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'DO', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'EC', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'EG', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SV', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GQ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'ER', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'EE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'ET', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'FJ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'FI', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'FR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GF', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GM', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'DE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GH', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GT', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GN', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GW', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GY', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'HT', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'HN', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'HK', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'HU', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'IS', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'IN', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'ID', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'IR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'IQ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'IE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'IL', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'IT', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'JM', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'JP', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'JO', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'KZ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'KE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'KP', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'KR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'KW', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'KG', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'LA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'LV', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'LB', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'LS', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'LR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'LY', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'LT', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'LU', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MK', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MG', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MW', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MY', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'ML', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MU', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MX', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MD', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MN', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'ME', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'EH', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MZ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'MM', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'NA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'NP', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'NL', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'NZ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'NI', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'NE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'NG', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'NO', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SJ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'OM', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'PK', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'PA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'PG', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'PY', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'PE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'PH', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'PL', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'PT', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'QA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'RO', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'RU', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'RW', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SN', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'RS', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SL', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SG', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SK', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SI', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SB', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SO', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'ZA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SS', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'ES', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'LK', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SD', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SZ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'CH', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'SY', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TW', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TJ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TZ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TH', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TL', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TG', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TT', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TN', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TR', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'TM', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'UG', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'UA', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'AE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'GB', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'US', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'UY', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'UZ', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'VE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'PS', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'VN', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'YE', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'ZM', valueBronze: 0, valueSilver: 0, valueGold: 0 },
    { id: 'ZW', valueBronze: 0, valueSilver: 0, valueGold: 0 },
  ];
  polygonSeries.data.forEach((element) => {
    element.name = findCountry(element.id);
  });
  //console.log(props.location.state.countriesData);

  props.location.state.countriesData.forEach((profile) => {
    let id = findId(profile.country);

    if (id != null) {
      let country = polygonSeries.data.find((country) => {
        return country.id == id;
      });

      if (country !== undefined) {
        if (profile.membership == 1) {
          if (country.valueBronze === undefined) {
            country.valueBronze = 1;
          } else {
            country.valueBronze++;
          }
        } else if (profile.membership == 2) {
          if (country.valueSilver === undefined) {
            country.valueSilver = 1;
          } else {
            country.valueSilver++;
          }
        } else if (profile.membership == 3) {
          if (country.valueGold === undefined) {
            country.valueGold = 1;
          } else {
            country.valueGold++;
          }
        }
      }
    }
  });

  // MEGA WAZNE BO DZIALA
  if (heatValue === 1) {
    map.series.getIndex(0).dataFields.value = 'valueBronze';
  } else if (heatValue === 2) {
    map.series.getIndex(0).dataFields.value = 'valueSilver';
  } else if (heatValue === 3) {
    map.series.getIndex(0).dataFields.value = 'valueGold';
  }
}

const WorldMap = (props) => {
  const classes = useStyles();
  const chart = useRef(null);

  const [heatValue, setHeatValue] = useState(1);

  useEffect(() => {
    createHeatMap(props, heatValue);
  }, [heatValue]);

  /*
  const handleChange = (event) => {
    //setHeatValue(event.target.value);
    console.log('zmieniona waertosc na: ');
    console.log(event);
  };*/

  return (
    <div id='root' className={classes.root}>
      <Navbar backIcon={true} />
      <div className={classes.selectContainer}>
        <Button
          variant='contained'
          color='primary'
          className={classes.heatButton}
          value={1}
          onClick={() => setHeatValue(1)}
        >
          Bronze
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.heatButton}
          value={2}
          onClick={() => setHeatValue(2)}
        >
          Silver
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.heatButton}
          value={3}
          onClick={() => setHeatValue(3)}
        >
          Gold
        </Button>
      </div>
      <div className={classes.map}>
        <div id='chartdiv' className={classes.chartdiv}></div>
      </div>
    </div>
  );
};

export default WorldMap;
