import { Action, Asteroids, AsteroidsLinks, InitialState, NearEarthObject } from "../types";
import * as actionTypes from "./actionTypes";
import { favoriteList } from "../types";
import { favoritesFromLocalStorage, favoritesToLocalStorage, searchAsteroidByName, sortAsteroidsByName } from "./adapters";

export const initialState = {
  loading: false,
  asteroids: {} as Asteroids,
  sortedByName: {} as Asteroids,
  searchByName: {} as Asteroids,
  favorites: {
    links: {} as AsteroidsLinks,
    element_count: 0,
    near_earth_objects: { [favoriteList]: [] as NearEarthObject[] },
  },
};

export function asteroidReducer(state: InitialState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.LOADING:
      return { ...state, loading: true };

    case actionTypes.SERACH_BY_NAME:
      const result = searchAsteroidByName(state, action.payload);
      return { ...state, searchByName: { ...state.asteroids, near_earth_objects: { "Search by name": result } } };

    case actionTypes.SORT_BY_NAME:
      const asteroidsSortedByName = sortAsteroidsByName(state);
      return { ...state, sortedByName: { ...state.asteroids, near_earth_objects: { "Sorted by name": asteroidsSortedByName } } };

    case actionTypes.GET_ASTEROIDS:
      return {
        ...state,
        loading: false,
        asteroids: action.payload,
        searchByName: action.payload,
      };

    case actionTypes.SET_FAVOURITE:
      return { ...state, favorites: { ...state.asteroids, near_earth_objects: { [favoriteList]: action.payload } } };

    case actionTypes.ADD_TO_FAVOURITE:
      const favoritesAsteroids = favoritesToLocalStorage(state.favorites, action);
      return {
        ...state,
        favorites: {
          ...state.asteroids,
          near_earth_objects: {
            [favoriteList]: favoritesAsteroids,
          },
        },
      };

    case actionTypes.REMOVE_FROM_FAVOURITE:
      const newFavorites = favoritesFromLocalStorage(state.favorites, action);
      return { ...state, favorites: { ...state.asteroids, near_earth_objects: { [favoriteList]: newFavorites } } };

    case actionTypes.FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
}
