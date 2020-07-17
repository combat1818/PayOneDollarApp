import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  AUTH_ERROR,
  GET_ALL_PROFILES,
} from './types';
import { setAlert } from './alert';

//Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/all');
    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    /*
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    */
    console.log('Could not get all users profiles');
  }
};
