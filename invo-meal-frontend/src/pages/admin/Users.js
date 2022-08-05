import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import Moment from 'moment';
import {allUsers} from "../../redux/action";

const Users = () => {
    const dispatch = useDispatch();

    const {
        allUsersLoading,
        allUsersData,
        allUsersError
    } = useSelector((state) => state.adminRedux);

    useEffect(() => {
        dispatch(allUsers());
    }, []);

    const formatDate = (date) => {
        if (date) {
            return Moment(date).format("DD-MMM-YYYY")
        } else {
            return "NA"
        }
    }

    const handleStatus = (status) => {
        if (status === 1) {
            return <span className="badge badge-success">Active</span>
        }
    }

    return (
        <div className="right_col" role="main">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Users</h3>
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
                                        <th>Phone No</th>
                                        <th>Designation</th>
                                        <th>Subscription Type</th>
                                        <th>Subscription Date</th>
                                        <th>Expiry</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {allUsersLoading ? (
                                        <tr>
                                            <td colSpan="10" className="text-center"><i className="fa fa-spinner fa-spin fa-2x"></i></td>
                                        </tr>
                                    ) : allUsersData?.data.length > 0 ? (
                                        allUsersData?.data.map((item, index) => (
                                            <tr>
                                                <th scope="row">{++index}</th>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.designation}</td>
                                                <td>{item.planTitle || "NA"}</td>
                                                <td>{formatDate(item.createdAt)}</td>
                                                <td>{formatDate(item.expDate)}</td>
                                                <td>{handleStatus(item.status)}</td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                <strong>Sorry! No user found.</strong>
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
        </div>
    );
}
export default Users;