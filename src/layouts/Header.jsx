import { Outlet } from "react-router";
import "../css/Header.css";
import LinkItem from "../components/header/LinkItem";
import { Link } from "react-router";
import { useRef } from "react";

function Header() {
  const toggle = useRef();
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top header">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-5 fw-bold text-primary"
            to="/dashboard"
          >
            {import.meta.env.VITE_APP_NAME}
          </Link>
          <button
            ref={toggle}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#content"
            aria-controls="content"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
            <span className="btn-close btn p-2"></span>
          </button>
          <div className="collapse navbar-collapse" id="content">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <LinkItem label="Home" to="/dashboard" toggle={toggle} />
              <LinkItem
                label="History"
                to="/dashboard/history"
                toggle={toggle}
              />
              <LinkItem
                label="Logout"
                to="/dashboard/logout"
                danger={true}
                toggle={toggle}
              />
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Header;
