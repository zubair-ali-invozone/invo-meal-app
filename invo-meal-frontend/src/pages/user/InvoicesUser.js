import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {invoices, invoiceUpload, invoiceUploadReset} from "../../redux/action";
import {Formik} from "formik";
import * as Yup from 'yup';

const InvoicesUser = () => {
    const dispatch = useDispatch();
    const FILE_SIZE = 3 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/png"
    ];

    const [invoiceId, setInvoiceId] = useState(0);
    const [resMsg, setResMsg] = useState("");
    const [disableAfterSubmit, setDisableAfterSubmit] = useState(false);
    const [invoiceImageURL, setInvoiceImageURL] = useState("");

    const {
        invoiceLoading,
        invoiceData,
        invoiceError,
        invoiceUploadLoading,
        invoiceUploadData,
        invoiceUploadError,
    } = useSelector((state) => state.usersRedux);

    useEffect(() => {
        if (invoiceUploadData?.status === true) {
            setResMsg(invoiceUploadData.msg);
            dispatch(invoiceUploadReset());
            dispatch(invoices());
        }
    }, [invoiceUploadData]);

    useEffect(() => {
        dispatch(invoices());
    }, []);

    const handleStatus = (status) => {
        if (status === 1) {
            return <span class="badge badge-warning">Pending</span>
        } else if (status === 2) {
            return <span class="badge badge-success">Approved</span>
        } else if (status === 3) {
            return <span class="badge badge-danger">Disapproved</span>
        } else if (status === 4) {
            return <span class="badge badge-primary">Resubmit</span>
        }
    }

    const payInvoice = (id) => {
        setInvoiceId(id);
        window.$('#payInvoiceModal').modal('show');
    }

    const closeModal = () => {
        setInvoiceId(0);
        setResMsg("")
        setDisableAfterSubmit(false);
    }

    const viewInvoice = (image) => {
        setInvoiceImageURL(image);
        window.$('#invoiceImageModal').modal('show');
    }

    const closeViewInvoiceModal = () => {
        setInvoiceImageURL("");
    }

    return (
        <div className="right_col" role="main">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Invoices</h3>
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
                                        <th>Email</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Subscription</th>
                                        <th>Amount</th>
                                        <th>View Invoice</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {invoiceLoading ? (
                                        <tr>
                                            <td colSpan="9" className="text-center"><i className="fa fa-spinner fa-spin fa-2x"></i></td>
                                        </tr>
                                    ) : invoiceData?.data ? (
                                        invoiceData?.data.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{++index}</th>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.planTitle}</td>
                                                <td>Rs. {item.amount}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm"
                                                            disabled={item.isPaid === 0}
                                                            onClick={() => viewInvoice(item.proofImage)}
                                                    >
                                                        View Invoice
                                                    </button>
                                                </td>
                                                <td>{handleStatus(item.status)}</td>
                                                <td>
                                                    {item.isPaid === 0 && item.status === 1 && (
                                                        <button className="btn btn-success btn-sm" onClick={() => payInvoice(item.id)}>
                                                            Pay Invoice
                                                        </button>
                                                    )}
                                                    {item.status === 4 && (
                                                        <button className="btn btn-warning btn-sm" onClick={() => payInvoice(item.id)}>
                                                            Upload Invoice
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">Sorry! No invoice found.</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="payInvoiceModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Pay Invoice</h5>
                        </div>
                        <Formik
                            initialValues={{invoiceFile: null}}
                            validationSchema={Yup.object({
                                invoiceFile: Yup.mixed().required("Invoice image is required.")
                                    .test(
                                        "fileSize",
                                        "File too large, Max Size 3MB.",
                                        value => value && value.size <= FILE_SIZE
                                    )
                                    .test(
                                        "fileFormat",
                                        "Unsupported Format, Accepted only .JPG, .JPEG, .PNG",
                                        value => value && SUPPORTED_FORMATS.includes(value.type)
                                    )
                            })}
                            onSubmit={(values) => {
                                const formData = new FormData();
                                formData.append("invoiceId", invoiceId);
                                formData.append("proofImage", values.invoiceFile);
                                dispatch(invoiceUpload(formData));
                                setDisableAfterSubmit(true);
                            }}
                        >
                            {({
                                  handleSubmit,
                                  setFieldValue,
                                  touched,
                                  errors,
                                  handleBlur
                              }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        {resMsg && (
                                            <div className="alert alert-success" role="alert" style={{textShadow: 'none'}}>
                                                {resMsg}
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <input type="file" className="btn btn-light w-100" id="invoice" name="invoiceFile"
                                                   onChange={(e) => setFieldValue('invoiceFile', e.target.files[0])}
                                                   onBlur={handleBlur}
                                                   disabled={invoiceUploadLoading || disableAfterSubmit}
                                            />
                                            {touched.invoiceFile && errors.invoiceFile ? (
                                                <div className="text-danger ml-1 mt-1">{errors.invoiceFile}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary btn-sm"
                                                data-dismiss="modal"
                                                onClick={closeModal}
                                        >
                                            <i className="fa fa-close"></i> Close
                                        </button>
                                        <button type="submit" className="btn btn-primary btn-sm" disabled={invoiceUploadLoading || disableAfterSubmit}>
                                            {invoiceUploadLoading ? (
                                                    <span><i className="fa fa-spinner fa-spin"></i> Upload</span>) :
                                                <span><i className="fa fa-upload"></i> Upload</span>}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="invoiceImageModal" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">View Invoice</h5>
                        </div>
                        <div className="modal-body">
                            <img src={invoiceImageURL} alt="Invoice Image" className="img-fluid"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={closeViewInvoiceModal}
                                    data-dismiss="modal">
                                <i className="fa fa-close"></i> Close
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default InvoicesUser;