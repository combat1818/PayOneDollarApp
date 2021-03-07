import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rightPanel: {
    flex: 2,
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 2,
  },
}));

const WelcomeText = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.rightPanel}>
      <h1>Where In The World People can Waste One Dollar?</h1>
      <span>
        Are you curious what kind of people spend money on senseless stuff on
        the internet? Where do they come frome or how old are they?<br></br>
      </span>
      <span>
        You are in the right place! By joining our community are will be able to
        check out all the details of other members.<br></br>
      </span>
      <span>Find out if your friends are already here!</span>

      <h2>How does it Work?</h2>
      <span>
        By paying one dollar you will be given full access to our database,
        which contains information about other people who also paid one dollar
        <br></br>
      </span>
      <span>
        You will be able to directly search for them or use complex analytics to
        chart data about they country of origin, age, and more! <br></br>
      </span>
      <span>
        If you have some excess money to dispose of, you can choose one of the
        premium memberships, which offer even more benfits <br></br>
      </span>
      <span>Join now and see how it develops into the future!</span>
    </div>
  );
};

export default WelcomeText;
