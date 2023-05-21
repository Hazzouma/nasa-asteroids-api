import React from "react";
import { Card, Icon, Modal, Button, Grid } from "semantic-ui-react";
import { NearEarthObject, favoriteList } from "../../types";
import ModalAsteroid from "../ModalAsteroid";
import request from "../../AsteroidsAPI";
import { useAsteroidContext } from "../../context";

function AsteroidCard({ asteroid }: { asteroid: NearEarthObject }) {
  const { dispatch, state } = useAsteroidContext();
  const [open, setOpen] = React.useState(false);
  const isAddedToFavorite = () => Boolean(state.favorites.near_earth_objects[favoriteList].find((el) => el.id === asteroid.id));

  const addtoFavorite = () => request.addToFavorites(dispatch, asteroid);
  const removeFromFavorite = () => request.removeFromFavorites(dispatch, asteroid);

  const handleFavorite = () => (isAddedToFavorite() ? removeFromFavorite() : addtoFavorite());

  return (
    <>
      <Card>
        <Card.Content>
          <Card.Header>{asteroid.name}</Card.Header>
          <Card.Meta>ID: {asteroid.id}</Card.Meta>
          <Card.Description>
            <p>Absolute Magnitude: {asteroid.absolute_magnitude_h}</p>
            <p>Potentially Hazardous: {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
            <p>Estimated Diameter (kilometers): {asteroid.estimated_diameter.kilometers.estimated_diameter_max}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Grid centered verticalAlign="middle">
            <Grid.Row>
              <Grid.Column floated="left" width={13}>
                <Button onClick={() => setOpen(true)} basic color="black">
                  <Icon name="external alternate" />
                  See more details
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={3}>
                <Icon name="like" size="large" color={`${isAddedToFavorite() ? "red" : "grey"}`} onClick={handleFavorite} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
      <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
        <ModalAsteroid asteroid={asteroid} setOpen={setOpen} />
      </Modal>
    </>
  );
}

export default AsteroidCard;
