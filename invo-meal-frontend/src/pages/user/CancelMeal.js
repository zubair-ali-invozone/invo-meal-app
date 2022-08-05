import React, {useEffect, useState} from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {cancelMealList, cancelMealRequest, cancelMealRequestReset} from "../../redux/action";

const CancelMeal = () => {
    const dispatch = useDispatch();

    const [resMsg, setResMsg] = useState("");
    const [disableAfterSubmit, setDisableAfterSubmit] = useState(false);

    const {
        mealCancelLoading,
        mealCancelData,
        mealCancelError,
        mealCancelListLoading,
        mealCancelListData,
        mealCancelListError
    } = useSelector((state) => state.usersRedux);

    useEffect(() => {
        if (mealCancelData?.status === true) {
            setResMsg(mealCancelData.msg);
            setDisableAfterSubmit(true);
            dispatch(cancelMealRequestReset())
            dispatch(cancelMealList());
        }
    }, [mealCancelData]);

    useEffect(() => {
        dispatch(cancelMealList());
    }, []);

    const submitCancelRequest = () => {
        window.$('#cancelRequestModal').modal('show');
    }

    const closeRequestModal = () => {
        setResMsg("");
        setDisableAfterSubmit(false);
    }

    return (
        <div className="right_col" role="main">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Cancel Meal</h3>
                    </div>
                    <div className="title_right">
                        <div className=" text-right">
                            <button className="btn btn-primary" onClick={submitCancelRequest}>
                                <i className="fa fa-plus-circle"></i> Submit Cancel Meal Request
                            </button>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="x_panel">
                            <div className="x_content">
                                <table className="table table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Reason</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {mealCancelListLoading ? (
                                        <tr>
                                            <td colSpan="5" className="text-center"><i className="fa fa-spinner fa-spin fa-2x"></i></td>
                                        </tr>
                                    ) : mealCancelListData?.data.length > 0 ? (
                                        mealCancelListData?.data.map((item, index) => (
                                            <tr>
                                                <th scope="row">{++index}</th>
                                                <td>{item.reason}</td>
                                                <td>{item.startDate}</td>
                                                <td>{item.endDate}</td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm">
                                                        <i className="fa fa-trash"></i> Delete Request
                                                    </button>
                                                </td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                Sorry! No request found.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="cancelRequestModal" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Submit Cancel Meal Request</h5>
                        </div>

                        <Formik
                            initialValues={{reason: '', fromDate: '', toDate: ''}}
                            validationSchema={Yup.object({
                                reason: Yup.string().required('Reason is required.'),
                                fromDate: Yup.string().required('From date is required.'),
                                toDate: Yup.string().required('To date is required.'),
                            })}
                            onSubmit={(values) => {
                                dispatch(cancelMealRequest({
                                    reason: values.reason,
                                    startDate: values.fromDate,
                                    endDate: values.toDate
                                }));
                            }}
                        >
                            {formik => (
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="modal-body">
                                        {resMsg && (
                                            <div className="alert alert-success" role="alert">
                                                {resMsg}
                                            </div>
                                        )}
                                        {mealCancelError && (
                                            <div className="alert alert-danger" role="alert">
                                                {mealCancelError?.response?.data?.msg}
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <label htmlFor="reason">Reason</label>
                                            <input type="text" className="form-control" id="reason"
                                                   placeholder="Reason"
                                                   {...formik.getFieldProps('reason')} disabled={mealCancelLoading || disableAfterSubmit}/>
                                            {formik.touched.reason && formik.errors.reason ? (
                                                <div className="text-danger ml-1 mt-1">{formik.errors.reason}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fromDate">From</label>
                                            <input type="date" className="form-control" id="fromDate"
                                                   {...formik.getFieldProps('fromDate')} disabled={mealCancelLoading || disableAfterSubmit}/>
                                            {formik.touched.fromDate && formik.errors.fromDate ? (
                                                <div className="text-danger ml-1 mt-1">{formik.errors.fromDate}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="toDate">To</label>
                                            <input type="date" className="form-control" id="toDate"
                                                   {...formik.getFieldProps('toDate')} disabled={mealCancelLoading || disableAfterSubmit}/>
                                            {formik.touched.toDate && formik.errors.toDate ? (
                                                <div className="text-danger ml-1 mt-1">{formik.errors.toDate}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                formik.handleReset()
                                                closeRequestModal()
                                            }}
                                        >
                                            <i className="fa fa-close"></i> Close
                                        </button>
                                        <button type="submit" className="btn btn-primary btn-sm" disabled={mealCancelLoading || disableAfterSubmit}>
                                            {mealCancelLoading ? (
                                                <span><i className="fa fa-spinner fa-spin"></i> Submit</span>) : (
                                                <span><i className="fa fa-close"></i> Submit</span>)}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CancelMeal;