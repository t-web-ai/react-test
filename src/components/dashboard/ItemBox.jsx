import { Link } from "react-router";
import "./ItemBox.css";

function ItemBox({ to, icon, label }) {
  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3 p-2 flex-grow-1">
      <Link to={to} className="text-decoration-none">
        <div className="item-box d-flex flex-column justify-content-center align-items-center text-center shadow-sm">
          <div className="icon-wrapper mb-2">
            <i className={`${icon} item-box-icon border-none text-body`}></i>
          </div>
          <span className="item-box-label fw-semibold text-none">{label}</span>
        </div>
      </Link>
    </div>
  );
}

export default ItemBox;
