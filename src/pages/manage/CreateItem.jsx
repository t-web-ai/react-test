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
      setUsers(data || []);
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
        sortField: { field: "text", direction: "asc" },
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
      setValue("type", "");
      setValue("quantity", "");
      setValue("price", "");
      return success(message, "add-item");
    }
    return failed(message, "add-item");
  };

  if (!loading && !users.length)
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="my-5 px-4">
          <div className="text-body mb-3 fs-5">
            You must create users before continuing.
          </div>
          <Link
            to="/dashboard"
            className="btn btn-success my-2 px-3 py-1 fs-5 rounded-pill shadow-sm"
            replace
          >
            Go Back
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container">
      {!tomReady && (
        <div
          className="my-3"
          style={{
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <LazyLoader />
        </div>
      )}

      <div
        className="mx-auto my-3 bg-secondary-subtle p-4 rounded-3 shadow-sm "
        style={{
          maxWidth: "500px",
          visibility: tomReady ? "visible" : "hidden",
        }}
      >
        <form onSubmit={handleSubmit(createItem)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fs-5 fw-semibold">
              Username
            </label>
            <select
              {...register("username")}
              ref={selectRef}
              defaultValue=""
              name="username"
              id="username"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.address})
                </option>
              ))}
            </select>
            {errors["username"] && (
              <div className="text-danger fw-semibold mt-1 small">
                {errors["username"].message}
              </div>
            )}
          </div>

          <InputBox
            label="Item Type"
            type="text"
            name="type"
            error={errors["type"]}
            register={register}
          />
          <InputBox
            label="Quantity"
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

          <button
            className="btn btn-success fs-5 px-4 py-2 w-100 rounded-3 shadow-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              ></span>
            ) : (
              "Add Item"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateItem;
