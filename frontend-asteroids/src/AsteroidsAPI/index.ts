import axios from "axios";
import errorHandler from "./errorHandler";
import { API_BASE_URL } from "../config";
import * as actionTypes from "../context/actionTypes";
import { Action, Asteroids, NearEarthObject } from "../types";

const request = {
  getAsteroids: async (dispatch: React.Dispatch<Action>, dateFilter?: { start_date: string; end_date: string }) => {
    dispatch({ type: actionTypes.LOADING });
    try {
      let query = "";
      if (dateFilter?.end_date && dateFilter?.start_date) {
        query = `?start_date=${dateFilter.start_date}&end_date=${dateFilter.end_date}`;
      }
      const result = await axios.get(API_BASE_URL + "/asteroids" + query);
      dispatch({ type: actionTypes.GET_ASTEROIDS, payload: result.data });
    } catch (error) {
      dispatch({ type: actionTypes.FAIL });
      errorHandler(error);
    }
  },

  sortAsteroidsByName: (dispatch: React.Dispatch<Action>) => dispatch({ type: actionTypes.SORT_BY_NAME }),

  searchAsteroidByName: (dispatch: React.Dispatch<Action>, name: string) =>
    dispatch({ type: actionTypes.SERACH_BY_NAME, payload: name }),

  setFavorites: (dispatch: React.Dispatch<Action>, asteroids: Asteroids) =>
    dispatch({ type: actionTypes.SET_FAVOURITE, payload: asteroids }),

  addToFavorites: (dispatch: React.Dispatch<Action>, asteroid: NearEarthObject) => {
    dispatch({ type: actionTypes.ADD_TO_FAVOURITE, payload: asteroid });
  },

  removeFromFavorites: (dispatch: React.Dispatch<Action>, asteroid: NearEarthObject) => {
    dispatch({ type: actionTypes.REMOVE_FROM_FAVOURITE, payload: asteroid });
  },
};
export default request;
