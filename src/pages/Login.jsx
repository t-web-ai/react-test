import InputBox from "../components/form/InputBox";
import "../css/Login.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../schema/loginSchema";
import { login } from "../service/auth";
import { useLocation, useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const submit = async ({ email, password }) => {
    const response = await login(email, password);
    const previous = location.state?.from ?? { pathname: "/dashboard" };
    if (response) {
      navigate(previous, { replace: true });
    }
  };

  return (
    <div className="container  px-4">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-10 col-lg-8">
          <div className="row auth-card rounded overflow-hidden">
            {/* Left Side Image */}
            <div className="col-md-5 d-none d-md-block auth-image bg-white"></div>

            {/* Right Side Form  */}
            <div className="col-md-7 bg-secondary-subtle  p-5">
              <p className="text-muted mb-4 fs-3">Login to your account</p>
              <form onSubmit={handleSubmit(submit)}>
                <InputBox
                  label="Email address"
                  type="email"
                  name="email"
                  register={register}
                  placeholder="example@domain.com"
                  error={errors["email"]}
                />
                <InputBox
                  label="Password"
                  type="password"
                  name="password"
                  register={register}
                  placeholder="*********"
                  error={errors["password"]}
                />
                <button
                  type="submit"
                  className="btn btn-warning w-100 rounde fs-5 fw-bold"
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
