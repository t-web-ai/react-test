function CardHeader({ formatted, user: { name, address } }) {
  return (
    <div className="card-header bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <i className="bi bi-calendar-event fs-2"></i>
        <div>
          <h5 className="mb-0">{formatted}</h5>
          <small className="opacity-75" style={{ fontSize: "1rem" }}>
            {name} ( {address} )
          </small>
        </div>
      </div>
    </div>
  );
}

export default CardHeader;
