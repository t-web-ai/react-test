import { useForm } from "react-hook-form";
import InputBox from "../../components/form/InputBox";
import SearchBox from "../../components/search/SearchBox";
import { joiResolver } from "@hookform/resolvers/joi";
import { searchSchema } from "../../schema/searchSchema";
import { useState } from "react";
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
  const { register, handleSubmit } = useForm({
    resolver: joiResolver(searchSchema),
  });
  const [show, setShow] = useState({ show: false });

  const search = async ({ search }) => {
    setLoading(true);
    try {
      const response = await get_users_list(search);

      if (response.status == false) throw new Error("Failed");
      setUsers(response);
    } catch (error) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const onShow = ({ id, user, setUser }) => {
    setShow({ show: true, id, user, setUser });
  };
  const onClose = () => {
    setShow({ show: false });
  };
  const onConfirm = async ({ id, user, setUser }) => {
    setShow({ show: false });

    try {
      processing("Deleting", "delete-user");
      const { status, message } = await deleteUserFromServer({
        id,
        user: user.data,
      });
      if (!status) throw new Error(message);
      success(message, "delete-user");
      setUser(null);
    } catch ({ message }) {
      failed(message, "delete-user");
    }
  };

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
        <div className="mt-4">
          <LazyLoader />
        </div>
      ) : users.length > 0 ? (
        <div id="accordion" className="mb-4">
          {users.map((user) => (
            <UserBox key={user.id} user={user} onShow={onShow} />
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
