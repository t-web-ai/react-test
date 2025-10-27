import FilterBox from "./FilterBox";
import TimeBox from "./TimeBox";
import "./TimePick.css";

function TimePick({ setDate, setFilter, day, defaultPage }) {
  return (
    <div className="my-2 gap-2 d-flex sm-column">
      <TimeBox setDate={setDate} day={day} defaultPage={defaultPage} />
      <FilterBox setFilter={setFilter} defaultPage={defaultPage} />
    </div>
  );
}

export default TimePick;
