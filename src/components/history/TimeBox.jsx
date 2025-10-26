function TimeBox({ setDate, day, defaultPage }) {
  return (
    <div className="my-2">
      <input
        type="date"
        className="form-control fs-5"
        onChange={(e) => {
          setDate(e.target.value);
          defaultPage();
        }}
        value={day}
      />
    </div>
  );
}

export default TimeBox;
