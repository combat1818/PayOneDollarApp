import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';

var styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    display: 'flex',
    flex: 1,
    height: 50,
    backgroundColor: '#f6f9fc',
    borderTop: 'solid',
    borderBottom: 'solid',
    borderWidth: 0.0001,
    borderColor: '#f2f2f2',
  },
  headerItem: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    margin: 10,
    color: 'grey',
  },
  row: {
    display: 'flex',

    flex: 2,
  },
  rowItem: {
    flex: 1,
    margin: 10,
    fontFamily: 'Poppins-Light',
  },
};

const PrettyTable = () => {
  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div style={styles.headerItem}>
          <span>Country</span>
        </div>
        <div style={styles.headerItem}>
          <span>Name</span>
        </div>
        <div style={styles.headerItem}>
          <span>Surname</span>
        </div>
        <div style={styles.headerItem}>
          <span>Age</span>
        </div>
        <div style={styles.headerItem}>
          <span>Wasted</span>
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.rowItem}>
          <ReactCountryFlag
            countryCode='US'
            svg
            style={{
              width: '2em',
              height: '2em',
            }}
            title='US'
          />
        </div>
        <div style={styles.rowItem}>r12</div>
        <div style={styles.rowItem}>r13</div>
        <div style={styles.rowItem}>r14</div>
        <div style={styles.rowItem}>r15</div>
      </div>
      <div style={styles.row}>
        <div style={styles.rowItem}>
          <ReactCountryFlag
            countryCode='PL'
            svg
            style={{
              width: '2em',
              height: '2em',
            }}
            title='US'
          />
        </div>
        <div style={styles.rowItem}>r12</div>
        <div style={styles.rowItem}>r13</div>
        <div style={styles.rowItem}>r14</div>
        <div style={styles.rowItem}>r15</div>
      </div>
      <div style={styles.row}>
        <div style={styles.rowItem}>
          <ReactCountryFlag
            countryCode='DE'
            svg
            style={{
              width: '2em',
              height: '2em',
            }}
            title='US'
          />
        </div>
        <div style={styles.rowItem}>r12</div>
        <div style={styles.rowItem}>r13</div>
        <div style={styles.rowItem}>r14</div>
        <div style={styles.rowItem}>r15</div>
      </div>
      <div style={styles.row}>
        <div style={styles.rowItem}>
          <ReactCountryFlag
            countryCode='RU'
            svg
            style={{
              width: '2em',
              height: '2em',
            }}
            title='US'
          />
        </div>
        <div style={styles.rowItem}>r12</div>
        <div style={styles.rowItem}>r13</div>
        <div style={styles.rowItem}>r14</div>
        <div style={styles.rowItem}>r15</div>
      </div>
    </div>
  );
};

export default PrettyTable;
