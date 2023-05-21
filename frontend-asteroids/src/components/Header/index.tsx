import { Header, Image } from "semantic-ui-react";

function HeaderAsteroids() {
  return (
    <div>
      <Image centered alt="Nasa" size="small" src="https://api.nasa.gov/assets/footer/img/favicon-192.png" />
      <Header size="huge" textAlign="center" className="mt-10">
        Asteroids
        <Header.Subheader>Check out Asteroids</Header.Subheader>
      </Header>
    </div>
  );
}

export default HeaderAsteroids;
