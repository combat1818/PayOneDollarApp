import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../img/dollarLogo.jpg'; // gives image path

import { BsDisplay } from 'react-icons/bs';
import { AiOutlineBarChart } from 'react-icons/ai';
import { FiMap } from 'react-icons/fi';
import { FaQq } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';

var styles = {
  root: {
    width: 250,
    height: '100%',
  },
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    width: 250,
    boxShadow: '1px 3px 1px #9E9E9E',
    position: 'fixed',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 150,
    height: 100,
    margin: 25,
  },
  navItems: {
    margin: 10,
    marginTop: 50,
  },
  navItem: {
    fontSize: 20,
    fontFamily: 'Poppins-Light',
    marginTop: 50,
  },
  seperatorContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
  },
  seperator: {
    width: '80%',
    height: 0.5,
    backgroundColor: 'grey',
    alignSelf: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'flex-end',
    margin: 10,
    backgroundColor: 'grey',
    width: '100%',
    height: 50,
    borderRadius: 7,
    backgroundColor: '#f6f9fc',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 25,
    alignItems: 'center',
    fontFamily: 'Poppins-Light',
  },
};

// "wrapper" div-root is very important- it allows to place other elements next to the sidebar, otherwise they would overflow

const PrettySidebar = () => {
  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={Logo} style={styles.logo}></img>
        </div>
        <div style={styles.navItems}>
          <div style={styles.navItem}>
            <BsDisplay style={{ color: '#6373E8', marginRight: 20 }} />
            <span> Dashboard</span>
          </div>
          <div style={styles.navItem}>
            <AiOutlineBarChart style={{ color: '#FB6436', marginRight: 20 }} />
            <span> Charts</span>
          </div>
          <div style={styles.navItem}>
            <FiMap style={{ color: '#FFD500', marginRight: 20 }} />
            <span> Maps</span>
          </div>
          <div style={styles.navItem}>
            <FaQq style={{ color: '#11CEEF', marginRight: 20 }} />
            <span> About</span>
          </div>
        </div>
        <div style={styles.seperatorContainer}>
          <div style={styles.seperator}></div>
        </div>
        <div style={styles.buttonContainer}>
          <div style={styles.button}>
            <IoRocketSharp style={{ marginRight: 20 }} />
            <span> Upgrade</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrettySidebar;
