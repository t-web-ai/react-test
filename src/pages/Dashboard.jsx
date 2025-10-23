import { Link } from "react-router";
function Dashboard() {
  return (
    <>
      <h1 className="m-2">Dashboard</h1>
      <div className="container">
        <div className="row p-2 align-items-stretch">
          <div className="col-6 p-2">
            <Link
              to="/dashboard/users/create"
              className="d-block btn btn-primary h-100 d-flex justify-content-center align-items-center"
            >
              <div
                className="d-flex align-items-center gap-3"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-person-plus"></i>
                <span className="d-none d-sm-block">Create User</span>
              </div>
            </Link>
          </div>
          <div className="col-6 p-2">
            <Link
              to="/dashboard/items/create"
              className="d-block btn btn-primary h-100 d-flex justify-content-center align-items-center"
            >
              <div
                className="d-flex align-items-center gap-3"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-clipboard-plus"></i>
                <span className="d-none d-sm-block">Add Item</span>
              </div>
            </Link>
          </div>
          <div className="col-6 p-2">
            <Link
              to="/dashboard/items/history"
              className="d-block btn btn-primary h-100 d-flex justify-content-center align-items-center"
            >
              <div
                className="d-flex align-items-center gap-3"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-clock-history"></i>
                <span className="d-none d-sm-block">Histroy</span>
              </div>
            </Link>
          </div>
          <div className="col-6 p-2">
            <Link
              to="/dashboard/items/search"
              className="d-block btn btn-primary h-100 d-flex justify-content-center align-items-center"
            >
              <div
                className="d-flex align-items-center gap-3"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-search"></i>
                <span className="d-none d-sm-block">Search</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
