import ListAsteroids from "../ListAsteroids";
import { useAsteroidContext } from "../../context";
import { MenuState } from "../../types";

function AsteroidsContainer({ activeItem }: { activeItem: string }) {
  const { state } = useAsteroidContext();
  const { favorites, asteroids, searchByName, sortedByName } = state;

  switch (activeItem) {
    case MenuState.AllAsteroids:
      return asteroids.near_earth_objects && <ListAsteroids data={asteroids.near_earth_objects} />;

    case MenuState.SortByName:
      return sortedByName.near_earth_objects && <ListAsteroids data={sortedByName.near_earth_objects} />;

    case MenuState.Search:
      return searchByName.near_earth_objects && <ListAsteroids data={searchByName.near_earth_objects} />;

    case MenuState.Favorite:
      return favorites.near_earth_objects && <ListAsteroids data={favorites.near_earth_objects} />;

    default:
      return <></>;
  }
}

export default AsteroidsContainer;
