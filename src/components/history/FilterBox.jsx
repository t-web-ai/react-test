function FilterBox({ setFilter, defaultPage }) {
  return (
    <div className="my-2">
      <select
        defaultValue="daily"
        className="form-select fs-5"
        onChange={(e) => {
          setFilter(e.target.value);
          defaultPage();
        }}
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
}

export default FilterBox;
