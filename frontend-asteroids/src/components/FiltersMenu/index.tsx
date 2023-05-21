import React from "react";
import { Icon, Input, Menu } from "semantic-ui-react";
import DatePicker from "./DatePicker";
import request from "../../AsteroidsAPI";
import { useAsteroidContext } from "../../context";

function MenuFilters({
  handleItemClick,
  activeItem,
}: {
  activeItem: string;
  handleItemClick: (e: React.MouseEvent<HTMLElement>, data: any) => void;
}) {
  const { dispatch } = useAsteroidContext();
  const handleSearchAsteroidByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    request.searchAsteroidByName(dispatch, e.target.value);
  };
  return (
    <Menu secondary stackable>
      <Menu.Item name="search" onClick={handleItemClick}>
        <Input icon="search" placeholder="Search Asteroid..." onChange={handleSearchAsteroidByName} />
      </Menu.Item>
      <Menu.Item name="All Asteroids" active={activeItem === "All Asteroids"} onClick={handleItemClick} />
      <Menu.Item
        name="favorite"
        children={
          <>
            <Icon name="like" color={`${activeItem === "favorite" ? "red" : "grey"}`} />
            Favourites
          </>
        }
        active={activeItem === "favorite"}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="sortByName"
          children={
            <>
              <Icon name="filter" />
              Sort by name
            </>
          }
          active={activeItem === "sortByName"}
          onClick={handleItemClick}
        />
        <Menu.Item children={<DatePicker handleItemClick={handleItemClick} />} />
      </Menu.Menu>
    </Menu>
  );
}

export default MenuFilters;
