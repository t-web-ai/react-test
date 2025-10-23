import { useForm } from "react-hook-form";
import InputBox from "../../components/form/InputBox";
import { joiResolver } from "@hookform/resolvers/joi";
import { createUserSchema } from "../../schema/createUserSchema";
import { firestore } from "../../service/firebase";
import { create_user } from "../../service/userService";
import { failed, success } from "../../components/toast";

function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(createUserSchema),
  });

  const createUser = async ({ name, address }) => {
    const { status, message } = await create_user(name, address);
    if (status) {
      return success(message, "create-user");
    }
    return failed(message, "create-user");
  };

  return (
    <div className="container">
      <div className="container bg-secondary-subtle p-4 rounded mt-5">
        <form onSubmit={handleSubmit(createUser)}>
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
            Add user
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
