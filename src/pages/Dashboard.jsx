import ItemBox from "../components/dashboard/ItemBox";

function Dashboard() {
  return (
    <div className="container py-3">
      <div className="row justify-content-center p-2">
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
  );
}

export default Dashboard;
