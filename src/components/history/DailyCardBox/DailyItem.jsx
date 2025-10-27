function DailyItem({ icon, children, labelStyle = "" }) {
  return (
    <div className="col-12 col-sm-6 d-flex align-items-center">
      <i className={`${icon} me-2`} style={{ fontSize: "1.3rem" }}></i>
      <span className={`${labelStyle} fw-semibold`}>{children}</span>
    </div>
  );
}

export default DailyItem;
