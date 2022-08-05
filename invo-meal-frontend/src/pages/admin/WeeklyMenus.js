import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {allWeeklyMenus} from "../../redux/action";

const WeeklyMenus = () => {
    const dispatch = useDispatch();

    const [menuImageURL, setMenuImageURL] = useState("");

    const {
        allMenusLoading,
        allMenusData,
        allMenusError
    } = useSelector((state) => state.adminRedux);

    useEffect(() => {
        dispatch(allWeeklyMenus());
    }, []);

    const handleStatus = (status) => {
        if (status === 1) {
            return <span className="badge badge-success">Active</span>
        }
    }

    const handleMenu = (url) => {
        setMenuImageURL(url);
        window.$('#menuImageModal').modal('show');
    }

    return (
        <div className="right_col" role="main">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Weekly Menus</h3>
                    </div>
                    <div className="title_right">
                        <div className=" text-right">
                            <Link to="/admin/add-weekly-menu" className="btn btn-primary">
                                <i className="fa fa-plus-circle"></i> Add New Menu
                            </Link>
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
                                        <th>Title</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Image</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {allMenusLoading ? (
                                        <tr>
                                            <td colSpan="7" className="text-center"><i className="fa fa-spinner fa-spin fa-2x"></i></td>
                                        </tr>
                                    ) : allMenusData?.data.length > 0 ? (
                                        allMenusData?.data.map((item, index) => (
                                            <tr>
                                                <th scope="row">{++index}</th>
                                                <td>{item.title}</td>
                                                <td>{item.startDate}</td>
                                                <td>{item.endDate}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm"
                                                            onClick={() => handleMenu(item.menuImage)}>
                                                        View Image
                                                    </button>
                                                </td>
                                                <td>{handleStatus(item.status)}</td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm">Delete</button>
                                                </td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                <strong>Sorry! No menu found.</strong>
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

            <div className="modal fade" id="menuImageModal" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">View Weekly Menu</h5>
                        </div>
                        <div className="modal-body">
                            <img src={menuImageURL} alt="Invoice Image" className="img-fluid"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => setMenuImageURL("")}
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
export default WeeklyMenus;