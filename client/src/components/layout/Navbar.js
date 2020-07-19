import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    marginRight: 10,
  },
  ul: {
    listStyleType: 'none',
  },
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout, backIcon }) => {
  const classes = useStyles();

  const authLinks = (
    <ul className={classes.ul}>
      <li>
        <Link onClick={logout} to='/#!' className={classes.link}>
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className={classes.ul}>
      <li>
        <Link to='/#!' className={classes.link}>
          Developers
        </Link>
      </li>
      <li>
        <Link to='/register' className={classes.link}>
          Register
        </Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav>
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            {backIcon ? (
              <Link to='/dashboard' className={classes.link}>
                <ArrowBackIcon />
              </Link>
            ) : (
              ''
            )}
            <Typography variant='h6' className={classes.title}>
              Can You Waste One Dollar?
            </Typography>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </nav>
  );
};

/*
<h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
*/

/*
<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
=          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
*/

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
