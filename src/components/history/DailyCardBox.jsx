import DailyItem from "./DailyCardBox/DailyItem";

function DailyCardBox({ id, dailyItem, onDelete }) {
  return (
    <div className="card rounded mb-3">
      {/* Card Header: ID */}
      <div className="text-primary d-flex justify-content-between align-items-center mt-2 mx-3">
        <span className="fw-semibold d-flex align-items-center gap-1">
          <i className="bi bi-tag" style={{ fontSize: "1.5rem" }}></i>
          ID: {id.split("-")[0] + "*****"}
        </span>
        <button
          className="btn text-danger fw-bold btn-sm d-flex align-items-center"
          onClick={() => onDelete(id)}
        >
          <i className="bi bi-trash fs-5 "></i>
        </button>
      </div>

      {/* Card Body: Daily Info */}
      <div className="card-body d-flex flex-column flex-md-row gap-3 flex-wrap">
        <DailyItem icon="bi bi-diagram-3 text-secondary">
          Type: {dailyItem.type}
        </DailyItem>
        <DailyItem icon="bi bi-box-seam text-warning">
          Quantity: {dailyItem.quantity}
        </DailyItem>
        <DailyItem icon="bi bi-cash text-success">
          Price: {dailyItem.price.toLocaleString("en-US")} MMK
        </DailyItem>
        <DailyItem icon="bi bi-calculator text-body">
          Total: {dailyItem.total.toLocaleString("en-US")} MMK
        </DailyItem>
      </div>
    </div>
  );
}

export default DailyCardBox;
