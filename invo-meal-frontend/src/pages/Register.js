import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { allDesignations, register, registerReset } from "../redux/action";

const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { allDesignationsLoading, allDesignationsData, allDesignationsError } =
    useSelector((state) => state.allDesignations);
  const { registerLoading, registerData, registerError } = useSelector(
    (state) => state.register
  );

  useEffect(() => {
    dispatch(allDesignations());
  }, []);

  useEffect(() => {
    if (registerData?.status === true) {
      dispatch(registerReset());
      navigate("/user/dashboard");
    }
  }, [registerData]);

  return (
    <div className="login_wrapper">
      <div id="register" className="animate form">
        {allDesignationsError && (
          <div className="alert alert-danger" role="alert">
            Server Error! Designations not found.
          </div>
        )}
        {registerError && (
          <div className="alert alert-danger" role="alert">
            {registerError?.response?.data?.msg}
          </div>
        )}
        <div className="text-center text-success">
          <h1>
            <i className="fa fa-cutlery"></i> invo-meals!
          </h1>
        </div>
        <section className="login_content">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phoneNo: "",
              designation: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required("First name is required."),
              lastName: Yup.string().required("Last name is required."),
              phoneNo: Yup.string().required("Phone no is required."),
              designation: Yup.string().required("Designation is required."),
              email: Yup.string()
                .email("Invalid email address")
                .required("Email is required."),
              password: Yup.string()
                .min(8, "Password must be 8 characters.")
                .required("Password is required."),
              confirmPassword: Yup.string()
                .min(8)
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm is required."),
            })}
            onSubmit={(values) => {
              dispatch(
                register({
                  first_name: values.firstName,
                  last_name: values.lastName,
                  phone: values.phoneNo,
                  designation: values.designation,
                  email: values.email,
                  password: values.password,
                  repeat_password: values.confirmPassword,
                })
              );
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <h1>Create Account</h1>
                <div>
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-danger text-left">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    disabled={registerLoading}
                    {...formik.getFieldProps("firstName")}
                  />
                </div>
                <div>
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-danger text-left">
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                    disabled={registerLoading}
                    {...formik.getFieldProps("lastName")}
                  />
                </div>
                <div>
                  {formik.touched.phoneNo && formik.errors.phoneNo ? (
                    <div className="text-danger text-left">
                      {formik.errors.phoneNo}
                    </div>
                  ) : null}
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNo"
                    placeholder="Phone No"
                    disabled={registerLoading}
                    {...formik.getFieldProps("phoneNo")}
                  />
                </div>
                <div>
                  {formik.touched.designation && formik.errors.designation ? (
                    <div className="text-danger text-left">
                      {formik.errors.designation}
                    </div>
                  ) : null}
                  <select
                    className="form-control"
                    id="designation"
                    disabled={allDesignationsLoading || registerLoading}
                    {...formik.getFieldProps("designation")}
                  >
                    <option value="">---Designation---</option>
                    {allDesignationsLoading === false &&
                      allDesignationsData?.data?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.designation}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger text-left">
                      {formik.errors.email}
                    </div>
                  ) : null}
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    disabled={registerLoading}
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
                    disabled={registerLoading}
                    {...formik.getFieldProps("password")}
                  />
                </div>
                <div>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="text-danger text-left">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    disabled={registerLoading}
                    {...formik.getFieldProps("confirmPassword")}
                  />
                </div>
                <div>
                  <button type="submit" className="btn btn-primary btn-block">
                    {registerLoading === true ? (
                      <i className="fa fa-spinner fa-spin"></i>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
                <div className="clearfix"></div>
                <div className="separator">
                  <p className="change_link">
                    Already a member?
                    <Link to="/login" className="ml-1 to_register">
                      <strong>Log in</strong>
                    </Link>
                  </p>
                  <div className="clearfix"></div>
                </div>
              </form>
            )}
          </Formik>
        </section>
      </div>
    </div>
  );
};

export default Register;
