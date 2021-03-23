import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FaDiceOne } from 'react-icons/fa';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { ImSigma } from 'react-icons/im';
import { GiDiceSixFacesOne } from 'react-icons/gi';
import { GiDiceSixFacesTwo } from 'react-icons/gi';
import { GiDiceSixFacesThree } from 'react-icons/gi';

var flag = 1;

var styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    padding: 15,
  },
  row1: {
    display: 'flex',
    flexDirection: 'row',
    flex: 3,
  },
  row2: {
    flex: 1,
  },
  column1: {
    flex: 1,
  },
  column2: {
    display: 'flex',
    flex: 1,
    fontSize: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  circle: {},
};

const Counter = ({ count, percentage, title, iconType }) => {
  return (
    <div style={styles.root}>
      <div style={styles.row1}>
        <div style={styles.column1}>
          <span
            style={{
              color: 'grey',
              fontSize: 15,
              fontFamily: 'Poppins-Light',
              margin: 10,
            }}
          >
            {title} Dollar
          </span>
          <br></br>
          <span
            style={{
              color: 'black',
              fontSize: 26,
              fontFamily: 'Poppins-Bold',
              margin: 10,
            }}
          >
            {count}
          </span>
        </div>
        <div style={styles.column2}>
          <div
            style={{
              backgroundColor: 'red',
              width: 50,
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              backgroundColor:
                iconType == 1
                  ? '#f5365c'
                  : iconType == 2
                  ? '#fb6340'
                  : iconType == 3
                  ? '#ffd65d'
                  : '#11cdef',
              color: 'white',
            }}
          >
            {iconType == 1 ? (
              <GiDiceSixFacesOne />
            ) : iconType == 2 ? (
              <GiDiceSixFacesTwo />
            ) : iconType == 3 ? (
              <GiDiceSixFacesThree />
            ) : (
              <ImSigma />
            )}
          </div>
        </div>
      </div>
      <div style={styles.row2}>
        <span style={{ color: '#65da5d', fontFamily: 'Poppins-Bold' }}>
          <AiOutlineArrowUp />
          {percentage}$
        </span>
        <span style={{ marginLeft: 10, fontFamily: 'Poppins-Light' }}>
          Since Last Month
        </span>
      </div>
    </div>
  );
};

export default Counter;
