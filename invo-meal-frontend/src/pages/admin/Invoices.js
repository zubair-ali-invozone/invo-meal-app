import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {adminInvoices, verifyInvoice, verifyInvoiceReset} from "../../redux/action";

const Invoices = () => {
    const dispatch = useDispatch();

    const [invoiceURL, setInvoiceURL] = useState("");
    const [invoiceId, setInvoiceId] = useState(0);
    const [invoiceStatus, setInvoiceStatus] = useState(0);
    const [invoiceCurrentStatus, setInvoiceCurrentStatus] = useState(null);
    const [resMsg, setResMsg] = useState(null);

    const {
        adminInvoicesLoading,
        adminInvoicesData,
        adminInvoicesError,

        verifyInvoiceLoading,
        verifyInvoiceData,
        verifyInvoiceError
    } = useSelector((state) => state.adminRedux);

    useEffect(() => {
        if (verifyInvoiceData?.status) {
            setResMsg(verifyInvoiceData?.msg);
            setInvoiceId(0);
            setInvoiceStatus(0);
            setInvoiceCurrentStatus(null);
            dispatch(adminInvoices());
            dispatch(verifyInvoiceReset());
            window.$('#viewInvoiceModal').modal('hide');
        }
    }, [verifyInvoiceData]);

    useEffect(() => {
        dispatch(adminInvoices());
    }, []);

    const handleStatus = (status) => {
        if (status === 1) {
            return <span className="badge badge-warning">Pending</span>
        } else if (status === 2) {
            return <span className="badge badge-success">Approved</span>
        } else if (status === 3) {
            return <span className="badge badge-danger">Disapproved</span>
        } else if (status === 4) {
            return <span className="badge badge-primary">Resubmit</span>
        }
    }

    const handleViewInvoice = (url, id, status) => {
        setInvoiceURL(url);
        setInvoiceId(id);
        setResMsg(null);
        setInvoiceCurrentStatus(status);
        window.$('#viewInvoiceModal').modal('show');
    }

    const handleVerifyInvoice = (status) => {
        setInvoiceStatus(status);
        dispatch(verifyInvoice({
            invoiceId: invoiceId,
            statusCode: status
        }));
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
                                {resMsg && (
                                    <div className="alert alert-success" role="alert" style={{textShadow: 'none'}}>
                                        {resMsg}
                                    </div>
                                )}
                                <table className="table table-bordered">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Email</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Subscription Type</th>
                                        <th>Amount</th>
                                        <th>View Invoice</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {adminInvoicesLoading ? (
                                        <tr>
                                            <td colSpan="8" className="text-center"><i className="fa fa-spinner fa-spin fa-2x"></i></td>
                                        </tr>
                                    ) : adminInvoicesData?.data.length > 0 ? (
                                        adminInvoicesData?.data.map((item, index) => (
                                            <tr>
                                                <th scope="row">{++index}</th>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.planTitle}</td>
                                                <td>{item.amount}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm" onClick={() => handleViewInvoice(item.proofImage, item.id, item.status)}>
                                                        View Invoice
                                                    </button>
                                                </td>
                                                <td>{handleStatus(item.status)}</td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                <strong>Sorry! No invoice found.</strong>
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

            <div className="modal fade" id="viewInvoiceModal" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">View Invoice</h5>
                            <button type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => {
                                        setInvoiceURL("")
                                        setInvoiceId(0)
                                        setInvoiceStatus(0)
                                        setInvoiceCurrentStatus(null)
                                    }}
                                    data-dismiss="modal">
                                <i className="fa fa-close"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img src={invoiceURL} alt="Invoice Image" className="img-fluid"/>
                        </div>
                        {invoiceCurrentStatus === 1 && (
                            <div className="modal-footer justify-content-center">
                                <button type="button"
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleVerifyInvoice(2)} disabled={verifyInvoiceLoading}>
                                    {verifyInvoiceLoading && invoiceStatus === 2 ? (
                                        <span><i className="fa fa-spinner fa-spin"></i> Approved</span>) : (
                                        <span><i className="fa fa-close"></i> Approved</span>)}
                                </button>
                                <button type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleVerifyInvoice(3)} disabled={verifyInvoiceLoading}>
                                    {verifyInvoiceLoading && invoiceStatus === 3 ? (
                                        <span><i className="fa fa-spinner fa-spin"></i> Disapproved</span>) : (
                                        <span><i className="fa fa-close"></i> Disapproved</span>)}
                                </button>
                                <button type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleVerifyInvoice(4)} disabled={verifyInvoiceLoading}>
                                    {verifyInvoiceLoading && invoiceStatus === 4 ? (
                                        <span><i className="fa fa-spinner fa-spin"></i> Resubmit</span>) : (
                                        <span><i className="fa fa-close"></i> Resubmit</span>)}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Invoices;