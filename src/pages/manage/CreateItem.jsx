import { useEffect, useRef, useState } from "react";
import TomSelect from "tom-select";
import { add_item, get_users_list } from "../../service/userService";
import "./CreateItem.css";
import InputBox from "../../components/form/InputBox";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { joiResolver } from "@hookform/resolvers/joi";
import { createItemSchema } from "../../schema/createItemSchema";
import { success, failed } from "../../components/toast";
import LazyLoader from "../../components/context/LazyLoader";

function CreateItem() {
  const selectRef = useRef(null);
  const tomSelectRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [tomReady, setTomReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(createItemSchema),
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await get_users_list();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0 && selectRef.current) {
      if (tomSelectRef.current) {
        tomSelectRef.current.destroy();
      }
      tomSelectRef.current = new TomSelect(selectRef.current, {
        allowEmptyOption: false,
        sortField: {
          field: "text",
          direction: "asc",
        },
        onInitialize: () => {
          setTomReady(true);
          register("username").ref(selectRef.current);
        },
      });
    }
    return () => {
      if (tomSelectRef.current) {
        tomSelectRef.current.destroy();
      }
    };
  }, [users]);

  const createItem = async (data) => {
    const { username: id, type, quantity, price } = data;
    const { message, status } = await add_item({ id, type, quantity, price });
    if (status) {
      setValue("type", null);
      setValue("quantity", null);
      setValue("price", null);
      return success(message, "add-item");
    }
    return failed(message, "add-item");
  };

  if (!loading && !users.length)
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="container">
          <div className="fs-4">You must create users before continuing.</div>
          <div className="rounded my-4">
            <Link
              to="/dashboard"
              className="small text-decoration-none btn btn-primary fs-5"
              replace={true}
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container">
      {!tomReady && (
        <div className="mt-5">
          <LazyLoader />
        </div>
      )}
      <div
        className="bg-secondary-subtle p-3 rounded my-5"
        style={{ visibility: tomReady ? "visible" : "hidden" }}
      >
        <form onSubmit={handleSubmit(createItem)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fs-5 fw-bold">
              Username
            </label>
            <select
              {...register("username")}
              ref={selectRef}
              defaultValue=""
              placeholder="Select a user..."
              name="username"
              id="username"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.data.name} ({user.data.address})
                </option>
              ))}
            </select>
            {errors["username"] && (
              <div className="text-danger fw-bold mt-1">
                {errors["username"].message}
              </div>
            )}
          </div>
          <InputBox
            label="Item type"
            type="text"
            name="type"
            error={errors["type"]}
            register={register}
          />
          <InputBox
            label="Item quantity"
            type="number"
            name="quantity"
            error={errors["quantity"]}
            register={register}
          />
          <InputBox
            label="Price (MMK)"
            type="number"
            name="price"
            error={errors["price"]}
            register={register}
          />
          <button className="btn btn-success fs-5" disabled={isSubmitting}>
            Add item
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateItem;
