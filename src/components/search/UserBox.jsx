import { useForm } from "react-hook-form";
import InputBox from "../form/InputBox";
import { create_user } from "../../service/userService";
import { failed, processing, success } from "../toast";
import { useState } from "react";

function UserBox({ user }) {
  const [info, setInfo] = useState({
    name: user.data.name,
    address: user.data.address,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user.data.name,
      address: user.data.address,
    },
  });
  const editUser = async ({ name, address }) => {
    processing("Updating", "update-user");
    const { status, message } = await create_user(name, address, user.id);

    if (!status) return failed("Failed to update!", "update-user");

    setInfo({ name, address });
    return success(message, "update-user");
  };

  return (
    <div className="mt-3 bg-secondary-subtle rounded container py-4 px-3">
      <div className="d-flex justify-content-between fs-5  align-items-center">
        <div>
          {info?.name} ({info?.address})
        </div>
        <div className="d-flex gap-3 mx-2">
          <i
            className="bi bi-pencil-square fs-3 text-success"
            data-bs-toggle="collapse"
            data-bs-target={`#${user.id}`}
          ></i>

          <i className="bi bi-trash fs-3 text-danger"></i>
        </div>
      </div>

      <div id={`${user.id}`} className="collapse" data-bs-parent="#accordion">
        <div className="">
          <form onSubmit={handleSubmit(editUser)}>
            <InputBox
              label="Name"
              type="text"
              name="name"
              error={errors["name"]}
              register={register}
            />
            <InputBox
              label="Address"
              type="text"
              name="address"
              error={errors["address"]}
              register={register}
            />
            <button className="btn btn-success fs-5" disabled={isSubmitting}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserBox;
