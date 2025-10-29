function TimeBox({ setDate, day, defaultPage }) {
  return (
    <div className="w-50">
      <input
        type="date"
        className="form-control fs-5 h-100"
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
