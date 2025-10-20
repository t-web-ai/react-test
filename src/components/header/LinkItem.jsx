import { NavLink } from "react-router";
function LinkItem({ label, to, danger = false, toggle }) {
  return (
    <li className="nav-item">
      <NavLink
        end
        className={`nav-link fs-5 fw-bold ${danger ? "text-danger" : ""}`}
        aria-current="page"
        to={to}
        onClick={() => {
          if (toggle.current?.getAttribute("aria-expanded") == "true") {
            toggle.current.click();
          }
        }}
      >
        {label}
      </NavLink>
    </li>
  );
}

export default LinkItem;
