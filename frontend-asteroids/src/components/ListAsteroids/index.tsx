import { Grid } from "semantic-ui-react";
import AsteroidCard from "../AsteroidCard";
import { NearEarthObject } from "../../types";

function ListAsteroids({ data }: { data: { [key: string]: NearEarthObject[] } }) {
  return (
    <>
      {Object.entries(data).map(([date, asteroids]) => (
        <Grid key={date} columns={16}>
          <h1>{date}</h1>
          <Grid.Row>
            {asteroids.map((asteroid: NearEarthObject) => (
              <Grid.Column textAlign="center" mobile={16} largeScreen={4} tablet={8} computer={4} key={asteroid.id}>
                <AsteroidCard asteroid={asteroid} />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      ))}
    </>
  );
}

export default ListAsteroids;
