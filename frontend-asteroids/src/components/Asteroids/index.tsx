import React, { useEffect } from "react";
import Loader from "../Loader";
import { Divider } from "semantic-ui-react";
import MenuFilters from "../FiltersMenu";
import request from "../../AsteroidsAPI";
import { useAsteroidContext } from "../../context";
import AsteroidsContainer from "../AsteroidsContainer";
import { MenuState } from "../../types";

function Asteroids() {
  const { dispatch, state } = useAsteroidContext();
  const [activeItem, setActiveItem] = React.useState<any>(MenuState.AllAsteroids);

  const handleItemClick = (e: React.MouseEvent<HTMLElement>, data: any): void => {
    setActiveItem(data.name);
    if (data.name === MenuState.SortByName) request.sortAsteroidsByName(dispatch);
  };

  useEffect(() => {
    const getdata = async () => await request.getAsteroids(dispatch);
    getdata();

    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      request.setFavorites(dispatch, JSON.parse(storedFavorites));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="mt-50">
      <MenuFilters activeItem={activeItem} handleItemClick={handleItemClick} />
      <Divider />
      {state.loading ? <Loader /> : <AsteroidsContainer activeItem={activeItem} />}
    </div>
  );
}

export default Asteroids;
