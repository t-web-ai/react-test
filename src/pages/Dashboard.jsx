import ItemBox from "../components/dashboard/ItemBox";

function Dashboard() {
  return (
    <>
      <h1 className="mx-2 mt-3">Dashboard</h1>
      <div className="container">
        <div className="row p-1 align-items-stretch">
          <ItemBox
            to="/dashboard/users/create"
            icon="bi bi-person-plus"
            label="New User"
          />
          <ItemBox
            to="/dashboard/items/create"
            icon="bi bi-clipboard-plus"
            label="New Item"
          />
          <ItemBox
            to="/dashboard/history"
            icon="bi bi-clock-history"
            label="History"
          />
          <ItemBox to="/dashboard/search" icon="bi bi-search" label="Search" />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
