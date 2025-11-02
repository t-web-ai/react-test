import { Outlet } from "react-router";
import "./Header.css";
import LinkItem from "../components/header/LinkItem";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { theme } from "./Theme";

function Header() {
  const [icon, setIcon] = useState(theme.get_theme_icon());
  const toggle = useRef();
  useEffect(() => {
    setIcon(theme.get_theme_icon());
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top header">
        <div className="container-fluid">
          <div>
            <Link
              className="navbar-brand fs-5 fw-bold text-success"
              to="/dashboard"
            >
              {import.meta.env.VITE_APP_NAME}
            </Link>
            <span
              onClick={() => {
                setIcon(theme.change_theme(this));
              }}
              className="ms-2"
            >
              <i className={icon}></i>
            </span>
          </div>
          <button
            ref={toggle}
            className="navbar-toggler border-0 bg-transparent shadow-none"
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
