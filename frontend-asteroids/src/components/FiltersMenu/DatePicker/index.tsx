import React from "react";
import { Dropdown, Form, Button } from "semantic-ui-react";
import { useAsteroidContext } from "../../../context";
import request from "../../../AsteroidsAPI";
import { MenuState } from "../../../types";

function DatePicker({ handleItemClick }: { handleItemClick: (e: React.MouseEvent<HTMLElement>, data: any) => void }) {
  const { dispatch } = useAsteroidContext();
  const [dateFilter, setDateFilter] = React.useState({
    start_date: "",
    end_date: "",
  });

  const setMaxDate = (value: string, max: boolean = false): string => {
    let date7d = new Date(value);
    max ? date7d.setDate(new Date(value).getDate() + 7) : date7d.setDate(new Date(value).getDate() - 7); //api requires max 7 days of data
    return date7d.toISOString().split("T")[0];
  };

  function handleChangeDateFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    setDateFilter({ ...dateFilter, [name]: value });
  }

  const searchAsteroids = (e: React.MouseEvent<HTMLElement>) => {
    request.getAsteroids(dispatch, dateFilter);
    handleItemClick(e, { name: MenuState.AllAsteroids });
  };

  const handleText = () =>
    !dateFilter.start_date && !dateFilter.end_date
      ? "Sort by Date"
      : dateFilter.start_date && !dateFilter.end_date
      ? "Select end date"
      : !dateFilter.start_date && dateFilter.end_date
      ? "Select start date"
      : "From " + dateFilter.start_date.toString() + " until " + dateFilter.end_date.toString();

  return (
    <>
      <Dropdown direction="right" icon="calendar" simple text={handleText()}>
        <Dropdown.Menu className="p-15" direction="right">
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label htmlFor="start_date">Start Date:</label>
                <input
                  type="date"
                  name="start_date"
                  onChange={handleChangeDateFilter}
                  min={dateFilter.end_date ? setMaxDate(dateFilter.end_date) : ""}
                  max={dateFilter.end_date ? dateFilter.end_date : ""}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="end_date">End Date:</label>
                <input
                  type="date"
                  name="end_date"
                  disabled={dateFilter.start_date === "" ? true : false}
                  min={dateFilter.start_date ? new Date(dateFilter.start_date).toISOString().split("T")[0] : ""}
                  max={dateFilter.start_date ? setMaxDate(dateFilter.start_date, true) : ""}
                  onChange={handleChangeDateFilter}
                  required
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
      {dateFilter.start_date && dateFilter.end_date && <Button circular icon="search" onClick={searchAsteroids} />}
    </>
  );
}

export default DatePicker;
