import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {mealCancelList} from "../../redux/action";
import Moment from 'moment';

const Invoices = () => {
    const dispatch = useDispatch();

    const {
        adminCancelMealLoading,
        adminCancelMealData,
        adminCancelMealError
    } = useSelector((state) => state.adminRedux);

    useEffect(() => {
        dispatch(mealCancelList());
    }, []);

    return (
        <div className="right_col" role="main">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Today Meal</h3>
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
                                        <th>Date</th>
                                        <th>Email</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Subscription Type</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {adminCancelMealLoading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center"><i className="fa fa-spinner fa-spin fa-2x"></i></td>
                                        </tr>
                                    ) : adminCancelMealData?.data?.length > 0 ? (
                                        adminCancelMealData?.data?.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{++index}</th>
                                                <td>{Moment(new Date()).format("DD-MMM-YYYY")}</td>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.planTitle}</td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                <strong>Sorry! Today meal list is not found.</strong>
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
export default Invoices;