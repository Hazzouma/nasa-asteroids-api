import { Action, Asteroids, InitialState, NearEarthObject, favoriteList } from "../types";

export const searchAsteroidByName = (state: InitialState, name: string) => {
  let foundAsteroid: NearEarthObject[] = [];
  for (const date in state.asteroids.near_earth_objects) {
    const asteroidList: NearEarthObject[] = state.asteroids.near_earth_objects[date];
    const matchingList: NearEarthObject[] = asteroidList.filter((asteroid: NearEarthObject) =>
      asteroid.name.toLowerCase().includes(name.toLowerCase())
    );
    foundAsteroid.push(...matchingList);
  }
  return foundAsteroid;
};

export const sortAsteroidsByName = (state: InitialState) => {
  let newArr: NearEarthObject[] = [];
  let asteroidsSortedByName: NearEarthObject[] = [];
  for (const date in state.asteroids.near_earth_objects) {
    if (Object.prototype.hasOwnProperty.call(state.asteroids.near_earth_objects, date)) {
      const element = state.asteroids.near_earth_objects[date];
      newArr = [...newArr, ...element];
    }
  }
  asteroidsSortedByName = newArr.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return asteroidsSortedByName;
};

export const favoritesToLocalStorage = (fav: Asteroids, action: Action): NearEarthObject[] => {
  const arr = fav.near_earth_objects[favoriteList];
  arr.push(action.payload);
  localStorage.setItem("favorites", JSON.stringify(arr));
  return arr;
};

export const favoritesFromLocalStorage = (fav: Asteroids, action: Action): NearEarthObject[] => {
  const newArr = fav.near_earth_objects[favoriteList].filter((el) => el.id !== action.payload.id);
  localStorage.setItem("favorites", JSON.stringify(newArr));
  return newArr;
};
