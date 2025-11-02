import { useForm } from "react-hook-form";
import InputBox from "../form/InputBox";
import { create_user } from "../../service/userService";
import { failed, processing, success } from "../toast";
import { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { createUserSchema } from "../../schema/createUserSchema";

function UserBox({ user: data, onShow }) {
  const [user, setUser] = useState(data || {});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.data?.name,
      address: user?.data?.address,
    },
    resolver: joiResolver(createUserSchema),
  });
  const editUser = async ({ name, address }) => {
    processing("Updating", "update-user");
    const { status, message } = await create_user(name, address, user.id);

    if (!status) return failed("Failed to update!", "update-user");

    setUser({ ...user, ...{ data: { ...user.data, ...{ name, address } } } });
    return success(message, "update-user");
  };

  if (!user) return null;

  return (
    <div className="mt-3 rounded-3 border border-1 shadow-sm bg-body w-100">
      {/* Header: Name & Address stacked, Actions */}
      <div className="d-flex justify-content-between align-items-center p-3">
        {/* Name & Address vertically */}
        <div>
          <div className="fs-5 fw-semibold text-body">{user?.data?.name}</div>
          <div className="text-muted fs-6">{user?.data?.address}</div>
        </div>

        {/* Actions */}
        <div className="d-flex gap-1">
          {/* Edit triggers collapse */}
          <button
            className="btn text-success fs-5 btn-sm"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#edit-${user.id}`}
            aria-expanded="false"
            aria-controls={`edit-${user.id}`}
          >
            <i className="bi bi-pencil-square"></i>
          </button>

          {/* Delete */}
          <button
            className="btn text-danger fs-5 btn-sm"
            type="button"
            onClick={() => onShow({ id: user.id, user, setUser })}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>

      {/* Collapse: form only */}
      <div
        className="collapse"
        data-bs-parent="#accordion"
        id={`edit-${user.id}`}
      >
        <div className="p-3 border-top border-1  bg-body-subtle">
          <form onSubmit={handleSubmit(editUser)}>
            <div className="mb-3">
              <InputBox
                label="Name"
                type="text"
                name="name"
                error={errors["name"]}
                register={register}
              />
            </div>
            <div className="mb-3">
              <InputBox
                label="Address"
                type="text"
                name="address"
                error={errors["address"]}
                register={register}
              />
            </div>

            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success px-4 fw-semibold"
                disabled={isSubmitting}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserBox;
