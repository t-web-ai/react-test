function CardItem({ icon, value, labelStyle, label }) {
  return (
    <div className="col-12 col-sm-6">
      <div className="border rounded-3 py-3 bg-secondary-subtle h-100 p-3 d-flex flex-sm-column aligin-items-center justify-content-between">
        <div className="p-2 rounded">
          <i className={`${icon} d-block`} style={{ fontSize: "2rem" }}></i>
        </div>
        <div className="w-100 text-end text-sm-center px-3">
          <div className="fw-semibold mt-1">{label}</div>
          <div className={`${labelStyle} fw-bold`}>{value}</div>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
