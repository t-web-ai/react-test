import { useForm } from "react-hook-form";
import InputBox from "../../components/form/InputBox";
import SearchBox from "../../components/search/SearchBox";
import { joiResolver } from "@hookform/resolvers/joi";
import { searchSchema } from "../../schema/searchSchema";
import { useEffect, useState } from "react";
import LazyLoader from "../../components/context/LazyLoader";
import {
  deleteUserFromServer,
  get_users_list,
} from "../../service/userService";
import UserBox from "../../components/search/UserBox";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { failed, processing, success } from "../../components/toast";

function Search() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState({ show: false });

  useEffect(() => {
    setLoading(true);
    get_users_list()
      .then((response) => {
        setUsers(response);
      })
      .catch(() => {
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const search = async ({ search }) => {
    setKeyword(search);
  };

  const onShow = ({ id, user }) => {
    setShow({ show: true, id, user });
  };
  const onClose = () => {
    setShow({ show: false });
  };
  const onConfirm = async ({ id, user }) => {
    setShow({ show: false });

    try {
      processing("Deleting", "delete-user");
      const { status, message } = await deleteUserFromServer({
        id,
        user: user,
      });
      if (!status) throw new Error(message);
      success(message, "delete-user");
      const clone = [...users].filter((user) => user.id != id);
      setUsers(clone);
    } catch ({ message }) {
      failed(message, "delete-user");
    }
  };
  const filtered = users.filter((user) => {
    const escape_keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (!escape_keyword) return user;
    const rxp = new RegExp(escape_keyword ?? "", "i");
    return rxp.test(user.name) || rxp.test(user.address);
  });

  return (
    <div className="container">
      <ConfirmModal show={show} onClose={onClose} onConfirm={onConfirm} />
      <form className="mt-4" onSubmit={handleSubmit(search)}>
        <SearchBox
          register={register}
          name="search"
          handleSubmit={handleSubmit()}
        />
      </form>
      {loading ? (
        <div className="mt-3">
          <LazyLoader />
        </div>
      ) : filtered.length > 0 ? (
        <div id="accordion" className="mb-4">
          {filtered.map((user) => (
            <UserBox
              key={user.id}
              user={user}
              onShow={onShow}
              setUsers={setUsers}
              users={users}
            />
          ))}
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

export default Search;
