import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../img/worldMap.jpg'; // Import using relative path
import Copyright from '../layout/Copyright';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import logo from '../../img/anim.gif';
import Alert from '../layout/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:
      'linear-gradient(45deg, rgba(67,88,208,1) 0%, rgba(199,79,191,1) 100%)',
  },
  container: {
    display: 'flex',
    width: '50%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '80%',
    },
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loginFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  form: {
    flex: 1,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: '#666666',
    backgroundColor: '#e6e6e6',
    height: 45,
    borderRadius: 25,
    padding: '0 30px 0 68px',
    border: 'none',
    //width: 300,
    '&:focus': {
      outline: 'none',
    },
  },
  inputContainer: {
    margin: 10,
  },
  loginButton: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  button: {
    color: 'white',
    width: '70%',
    fontFamily: 'Poppins-Bold',
    backgroundColor: '#57B846',
    border: 'none',
    borderRadius: 25,
    height: 45,
    fontSize: 17,
    '&:hover': {
      backgroundColor: '#333',
    },
    margin: 10,
    '&:focus': {
      outline: 'none',
    },
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
    fontFamily: 'Poppins-Bold',
    lineHeight: 1,
    color: '#515151',
  },
  icon: {
    position: 'absolute',
    padding: '10px 10px 10px 10px',
  },
  forgot: {
    fontFamily: 'Poppins-Light',
    color: 'grey',
    fontSize: 14,
  },
  userPass: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    '&:hover': {
      color: '#57B846',
      cursor: 'pointer',
    },
  },
  register: {
    display: 'flex',
    width: '100%',
    fontSize: 13,

    marginBottom: 40,
    justifyContent: 'center',
    '&:hover': {
      color: '#57B846',
      cursor: 'pointer',
    },
  },
  link: {
    textDecoration: 'none',
    fontFamily: 'Poppins-Light',
    color: 'black',
    '&:hover': {
      color: '#57B846',
      cursor: 'pointer',
    },
  },
}));

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    console.log('haha');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img src={logo} alt='loading...' />
        </div>
        <div className={classes.loginFormContainer}>
          <div className={classes.form}>
            <div className={classes.title}>
              <span>Member Login</span>
            </div>
            <Alert className={classes.alert} />
            <form onSubmit={(e) => onSubmit(e)}>
              <div className={classes.inputContainer}>
                <EmailIcon className={classes.icon} />
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  className={classes.textInput}
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div className={classes.inputContainer}>
                <LockIcon className={classes.icon} />
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  className={classes.textInput}
                  onChange={(e) => onChange(e)}
                ></input>
              </div>

              <div className={classes.loginButton}>
                <button className={classes.button}>Login</button>
              </div>
            </form>
            <div>
              <span className={classes.forgot}>Forgot </span>
              <span className={classes.userPass}>Username / Password?</span>
            </div>
          </div>
          <Link to='/register' className={classes.link}>
            <div className={classes.register}>
              <span>Create your Account{'   '}</span>

              <TrendingFlatIcon className={classes.icon} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
