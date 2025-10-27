import { useEffect, useState } from "react";
import { history } from "../../service/userService";
import LazyLoader from "../../components/context/LazyLoader";
import TimePick from "../../components/history/TimePick";
import Paginator from "../../components/paginator/Paginator";
import CardBox from "../../components/history/CardBox";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { HistoryContextProvider } from "../../components/context/HistoryContext";
import { DeleteFromServer, DeleteItemFromUI } from "../../service/itemService";
import { processing, failed, success } from "../../components/toast";

function History() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [action, setAction] = useState(null);
  const [cursorRef, setCursorRef] = useState(null);
  const [show, setShow] = useState({ show: false });

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

  // modal box
  const onShow = ({ id, user, setUser, selector }) => {
    setShow({ show: true, id, user, setUser, selector });
  };
  const onClose = () => {
    setShow({ show: false });
  };
  const onConfirm = async ({ id, user, setUser, selector }) => {
    setShow({ show: false });
    processing("Deleting the item", "delete-item");
    try {
      const { status, message } = await DeleteFromServer({
        id,
        selector,
        user,
      });
      if (!status) throw new Error("Failed to delete");
      DeleteItemFromUI({ id, user, setUser, selector });
      return success("Deleted the item", "delete-item");
    } catch ({ message }) {
      failed(message, "delete-item");
    }
  };

  return (
    <HistoryContextProvider value={{ onShow, onConfirm }}>
      <div className="container">
        {/* modal box for confirm deletion */}
        <ConfirmModal show={show} onClose={onClose} onConfirm={onConfirm} />

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
    </HistoryContextProvider>
  );
}

export default History;
