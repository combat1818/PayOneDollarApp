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

import Table from './Table';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  leftPanel: {
    flex: 1,
    margin: 10,
    padding: 10,
    boxShadow: '0 1px 3px 0px ',
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  rightPanel: {
    display: 'flex',
    flex: 2,
    margin: 10,
    boxShadow: '0 1px 3px 0px ',
    borderRadius: 10,
    alignItems: 'center',
  },
}));

const Users = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.leftPanel}>HOILA USERS</div>
      <div className={classes.rightPanel}>
        <div className={classes.table}>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Users;
