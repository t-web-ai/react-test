import FilterBox from "./FilterBox";
import TimeBox from "./TimeBox";

function TimePick({ setDate, setFilter, day, defaultPage }) {
  return (
    <div>
      <TimeBox setDate={setDate} day={day} defaultPage={defaultPage} />
      <FilterBox setFilter={setFilter} defaultPage={defaultPage} />
    </div>
  );
}

export default TimePick;
