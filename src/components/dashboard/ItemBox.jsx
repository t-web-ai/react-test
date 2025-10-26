import { Link } from "react-router";
import "./ItemBox.css";

function ItemBox({ to, icon, label }) {
  return (
    <div className="col-6 p-2">
      <Link
        to={to}
        className="d-block btn btn-primary h-100 d-flex justify-content-center align-items-center"
      >
        <div className="d-flex flex-column align-items-center gap-1 p-2">
          <i className={icon} style={{ fontSize: "2.2rem" }}></i>
          <span className="fs-5 text-none">{label}</span>
        </div>
      </Link>
    </div>
  );
}

export default ItemBox;
