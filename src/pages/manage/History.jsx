import { useEffect, useState } from "react";
import { history } from "../../service/userService";
import LazyLoader from "../../components/context/LazyLoader";
import TimePick from "../../components/history/TimePick";
import Paginator from "../../components/paginator/Paginator";
import CardBox from "../../components/history/CardBox";

function History() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [action, setAction] = useState(null);
  const [cursorRef, setCursorRef] = useState(null);

  const next = async () => {
    setPage(page + 1);
    setAction("next");
  };
  const prev = async () => {
    if (page > 1) setPage(page - 1);
    setAction("previous");
  };

  const defaultPage = () => {
    setPage(1);
  };

  // date picker
  const [date, setDate] = useState();

  // filter
  const [filter, setFilter] = useState("daily");
  const [selector, setSelector] = useState();

  // format date
  const now = date ? new Date(date) : new Date();
  const year = String(now.getFullYear());
  const month = `${year}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const day = `${month}-${String(now.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    if (!loading) setLoading(true);
    history({ year, month, day, filter, action, cursorRef }).then(
      ({ users, cursor, date, count }) => {
        setUsers(users);
        setLoading(false);
        setSelector(date);
        setCursorRef(cursor);
        setCount(count);
        setAction(null);
      }
    );
  }, [date, filter, page]);
  return (
    <div className="container">
      {/* timer picker  */}
      <TimePick
        setDate={setDate}
        setFilter={setFilter}
        day={day}
        defaultPage={defaultPage}
      />

      {/* show history data  */}
      {loading ? (
        // if loading
        <div className="my-4">
          <LazyLoader />
        </div>
      ) : users.length > 0 ? (
        // if loading finish
        <div>
          {users.map((user) => (
            <CardBox
              key={user.id}
              user={user}
              filter={filter}
              selector={selector}
            />
          ))}
          <Paginator total={count} next={next} prev={prev} page={page} />
        </div>
      ) : (
        // if no data
        <div className="text-center my-5">
          <i className="bi bi-question-lg" style={{ fontSize: "3rem" }}></i>
          <div className="fs-5">No data</div>
        </div>
      )}
    </div>
  );
}

export default History;
