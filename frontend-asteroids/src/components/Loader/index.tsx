import { Loader as Load, Dimmer } from "semantic-ui-react";

function Loader() {
  return (
    <Dimmer active inverted>
      <Load size="large">Loading</Load>
    </Dimmer>
  );
}

export default Loader;
