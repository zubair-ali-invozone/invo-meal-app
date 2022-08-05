import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginAction, loginFailReset} from "../redux/action";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const {loginLoading, loginData, loginError} = useSelector((state) => state.login);

  useEffect(() => {
    if (loginData?.status) {
      if (loginData.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [loginData])

  useEffect(() => {
    dispatch(loginFailReset())
  }, [])

  return (
    <div className="login_wrapper">
      <div className="animate form login_form">
        <div className="text-center text-success">
          <h1>
            <i className="fa fa-cutlery"></i> invo-meals!
          </h1>
        </div>
        <section className="login_content">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Email is required."),
              password: Yup.string().required("Password is required."),
            })}
            onSubmit={(values) => {
              dispatch(loginAction({
                email: values.email,
                password: values.password,
              }));
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <h1>Please Login</h1>
                {loginError && (
                    <div className="alert alert-danger" role="alert" style={{textShadow: 'none'}}>
                      {loginError?.response?.data?.msg}
                    </div>
                )}
                <div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger text-left">
                      {formik.errors.email}
                    </div>
                  ) : null}
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    disabled={loginLoading}
                    {...formik.getFieldProps("email")}
                  />
                </div>
                <div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger text-left">
                      {formik.errors.password}
                    </div>
                  ) : null}
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    disabled={loginLoading}
                    {...formik.getFieldProps("password")}
                  />
                </div>
                <div>
                  <button type="submit" className="btn btn-primary btn-block" disabled={loginLoading}>
                    {loginLoading ? (<span><i className="fa fa-spinner fa-spin"></i> Login</span>) :
                        <span><i className="fa fa-sign-in"></i> Login</span>}
                  </button>
                </div>
                <div className="clearfix"></div>
                <div className="separator">
                  <p className="change_link">
                    New to site?
                    <Link to="/register" className="to_register ml-1">
                      <strong>Create Account</strong>
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </section>
      </div>
    </div>
  );
}

export default Login;
