import { Link } from "react-router";
function Dashboard() {
  return (
    <>
      <h1 className="m-2">Dashboard</h1>
      <div className="container">
        <div className="row p-2">
          <div className="col-6 p-2">
            <Link to="/users/create" className="d-block btn btn-primary fs-5">
              Create New User
            </Link>
          </div>
          <div className="col-6 p-2">
            <Link to="/items/create" className="d-block btn btn-primary fs-5">
              Add Item
            </Link>
          </div>
          <div className="col-6 p-2">
            <Link to="/items/history" className="d-block btn btn-primary fs-5">
              Histroy
            </Link>
          </div>
          <div className="col-6 p-2">
            <Link to="/items/search" className="d-block btn btn-primary fs-5">
              Search
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
