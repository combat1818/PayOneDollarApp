import React, { useRef, useLayoutEffect } from 'react';

import Navbar from '../layout/Navbar';

// Material UI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  map: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
}));

const Analytics = (props) => {
  const classes = useStyles();

  return (
    <div id='root' className={classes.root}>
      <Navbar backIcon={true} />
    </div>
  );
};

export default Analytics;
