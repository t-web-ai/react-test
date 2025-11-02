import { useForm } from "react-hook-form";
import InputBox from "../../components/form/InputBox";
import { joiResolver } from "@hookform/resolvers/joi";
import { createUserSchema } from "../../schema/createUserSchema";
import { create_user } from "../../service/userService";
import { failed, success } from "../../components/toast";

function CreateUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(createUserSchema),
  });

  const createUser = async ({ name, address }) => {
    const { status, message } = await create_user(name, address);
    reset({ name: "", address: "" });
    if (status) return success(message, "create-user");
    return failed(message, "create-user");
  };

  return (
    <div className="container d-flex justify-content-center my-3">
      <div
        className="card shadow-sm border-0 rounded-3  bg-secondary-subtle"
        style={{ maxWidth: "480px", width: "100%" }}
      >
        <div className="card-body p-4">
          <form
            onSubmit={handleSubmit(createUser)}
            className="needs-validation"
          >
            <div>
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

            <div className="d-grid">
              <button
                className="btn btn-success btn-lg  shadow-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                ) : (
                  "Add User"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
