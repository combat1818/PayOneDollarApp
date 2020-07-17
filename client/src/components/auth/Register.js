import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../layout/Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
  },
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    country: '',
    city: '',
    age: '',
  });

  const {
    firstname,
    lastname,
    email,
    password,
    password2,
    country,
    city,
    age,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ email, password, firstname, lastname, country, city, age });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='firstname'
                value={firstname}
                onChange={(e) => onChange(e)}
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='lastname'
                value={lastname}
                onChange={(e) => onChange(e)}
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='Last Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
                label='Repeat Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='country'
                value={country}
                onChange={(e) => onChange(e)}
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='Country'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='city'
                value={city}
                onChange={(e) => onChange(e)}
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='City'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='age'
                value={age}
                onChange={(e) => onChange(e)}
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='Age'
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              {'Already have an account?  '}
              <Link to='/login' className={classes.link}>
                Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
