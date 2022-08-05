import React, {useEffect} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {addUserAction, addUserResetAction} from "../redux/action";
import {Link} from "react-router-dom";
import {successAlert} from "./alerts";

const AddUser = () => {
    const dispatch = useDispatch();
    const {addUserLoading, addUserData, addUserError} = useSelector(state => state.addUser);

    useEffect(() => {
        if (addUserData?.status === true) {
            successAlert(addUserData?.msg);
            dispatch(addUserResetAction())
        }
    }, [addUserData]);


    return (
        <>
            <h1 className="h3 mb-3">Users</h1>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Add New User</h5>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    name: 'John Doe',
                                    cnic: '3130145678765',
                                    phone: '03457688547',
                                    designation: 'Developer',
                                    email: 'john@invozone.com',
                                    password: '12345'
                                }}
                                validationSchema={Yup.object({
                                    name: Yup.string().required('This field is required'),
                                    cnic: Yup.number().typeError("Only numbers are allowed").required('This field is required'),
                                    phone: Yup.number().typeError("Only numbers are allowed").required('This field is required'),
                                    designation: Yup.string().required('This field is required'),
                                    email: Yup.string().email('Invalid email address').required('This field is required'),
                                    password: Yup.string().required('This field is required'),
                                })}
                                onSubmit={(values) => {
                                    dispatch(addUserAction({
                                        name: values.name,
                                        cnic: values.cnic,
                                        phone: values.phone,
                                        designation: values.designation,
                                        email: values.email,
                                        password: values.password
                                    }))
                                }}
                            >
                                {formik => (
                                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                        <div className="form-group row mb-3">
                                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" id="name"
                                                       placeholder="Full Name" autoComplete="off"
                                                       disabled={addUserLoading}
                                                       {...formik.getFieldProps('name')}
                                                />
                                                {formik.touched.name && formik.errors.name && (
                                                    <div className="text-danger mt-2">{formik.errors.name}</div>)}
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label htmlFor="cnic" className="col-sm-2 col-form-label">CNIC</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" id="cnic"
                                                       placeholder="CNIC" autoComplete="off"
                                                       disabled={addUserLoading}
                                                       {...formik.getFieldProps('cnic')}
                                                />
                                                {formik.touched.cnic && formik.errors.cnic && (
                                                    <div className="text-danger mt-2">{formik.errors.cnic}</div>)}
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" id="phone"
                                                       placeholder="Phone" autoComplete="off"
                                                       disabled={addUserLoading}
                                                       {...formik.getFieldProps('phone')}
                                                />
                                                {formik.touched.phone && formik.errors.phone && (
                                                    <div className="text-danger mt-2">{formik.errors.phone}</div>)}
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label htmlFor="designation" className="col-sm-2 col-form-label">Designation</label>
                                            <div className="col-sm-6">
                                                <select className="form-control" id="designation" disabled={addUserLoading} {...formik.getFieldProps('designation')}>
                                                    <option value="">---Option---</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Developer">Developer</option>
                                                    <option value="HR Officer">HR Officer</option>
                                                </select>
                                                {formik.touched.designation && formik.errors.designation && (
                                                    <div className="text-danger mt-2">{formik.errors.designation}</div>)}
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                            <div className="col-sm-6">
                                                <input type="email" className="form-control" id="email"
                                                       placeholder="Email" autoComplete="off"
                                                       disabled={addUserLoading}
                                                       {...formik.getFieldProps('email')}
                                                />
                                                {formik.touched.email && formik.errors.email && (
                                                    <div className="text-danger mt-2">{formik.errors.email}</div>)}
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label htmlFor="password"
                                                   className="col-sm-2 col-form-label">Password</label>
                                            <div className="col-sm-6">
                                                <input type="password" className="form-control" id="password"
                                                       placeholder="Password" autoComplete="off"
                                                       disabled={addUserLoading}
                                                       {...formik.getFieldProps('password')}
                                                />
                                                {formik.touched.password && formik.errors.password && (
                                                    <div className="text-danger mt-2">{formik.errors.password}</div>)}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12 text-center">
                                                <button type="submit" className="btn btn-primary me-2" disabled={addUserLoading}>Create Account</button>
                                                <Link to="/admin/all-users" className="btn btn-danger" disabled={addUserLoading}>Cancel</Link>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AddUser;