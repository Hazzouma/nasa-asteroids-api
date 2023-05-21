import { useState } from "react";
import { Modal, Dropdown, Button, DropdownProps } from "semantic-ui-react";
import { NearEarthObject } from "../../types";

const options = [
  { key: 1, text: "kilometers", value: "kilometers" },
  { key: 2, text: "meters", value: "meters" },
  { key: 3, text: "miles", value: "miles" },
  { key: 4, text: "feet", value: "feet" },
];
const optionsMissDistance = [
  { key: 1, text: "kilometers", value: "kilometers" },
  { key: 2, text: "astronomical", value: "astronomical" },
  { key: 3, text: "lunar", value: "lunar" },
  { key: 4, text: "miles", value: "miles" },
];
function ModalAsteroid({ asteroid, setOpen }: { asteroid: NearEarthObject; setOpen: (arg0: boolean) => void }) {
  const [unit, setUnit] = useState<string>("kilometers");
  const [unitMissDistance, setUnitMissDistance] = useState<string>("kilometers");
  const handleUnitChangeEstimatedDiameter = (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) =>
    setUnit(data.value as string);
  const handleUnitChangeMissDistance = (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) =>
    setUnitMissDistance(data.value as string);

  const estimatedDiameter = (min: boolean) => {
    const diameterObj = Object.entries(asteroid.estimated_diameter).filter((el, i) => el[0] === unit)[0];
    const minMaxDistance = Object.values(diameterObj[1]);
    return min ? <>{minMaxDistance[0]}</> : <>{minMaxDistance[1]}</>;
  };

  const missDistance = () => {
    return <>{Object.entries(asteroid.close_approach_data[0].miss_distance)?.filter((el) => el[0] === unitMissDistance)[0][1]}</>;
  };
  return (
    <>
      <Modal.Header>Description: {asteroid.name}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div>
            Estimated Diameter (min): <b>{estimatedDiameter(true)}</b>{" "}
            <Dropdown placeholder="Select unit" options={options} onChange={handleUnitChangeEstimatedDiameter} value={unit} />
          </div>
          <p>
            Estimated Diameter (max): <b>{estimatedDiameter(false)} </b>
            {unit}
          </p>
          <p>Potentially Hazardous: {asteroid.is_potentially_hazardous_asteroid ? <b>Yes</b> : <b>No</b>}</p>
          <p>
            Close Approach Date: <b>{asteroid.close_approach_data[0].close_approach_date_full}</b>
          </p>
          <p>
            Relative Velocity (km/h):<b> {asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour}</b>
          </p>
          <div>
            Miss Distance : <b>{missDistance()}</b>{" "}
            <Dropdown
              placeholder="Select unit"
              options={optionsMissDistance}
              onChange={handleUnitChangeMissDistance}
              value={unitMissDistance}
            />
          </div>
          <p>
            Orbiting Body: <b>{asteroid.close_approach_data[0].orbiting_body}</b>
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Close" onClick={() => setOpen(false)} color="black" />
      </Modal.Actions>
    </>
  );
}

export default ModalAsteroid;
