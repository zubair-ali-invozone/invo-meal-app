import {useDispatch, useSelector} from "react-redux";
import {userWeeklyMenuAction} from "../../redux/action";
import {useEffect} from "react";

const DashboardUser = () => {
    const dispatch = useDispatch();

    const {weeklyMenuLoading, weeklyMenuData, weeklyMenuError} = useSelector((state) => state.usersRedux);

    useEffect(() => {
        dispatch(userWeeklyMenuAction());
    }, []);

    return (
        <div className="right_col" role="main">
            <div className="">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8 animated flipInY">
                        {weeklyMenuError && (
                            <div className="alert alert-danger" role="alert">
                                {weeklyMenuError?.response?.data?.msg}
                            </div>
                        )}
                        <div className="tile-stats">
                            {weeklyMenuLoading ? (
                                <div className="text-center p-5">
                                    <i className="fa fa-spinner fa-spin fa-3x"></i>
                                </div>
                            ) : weeklyMenuData?.data ? (
                                <>
                                    <div className="text-center mt-3 mb-3 bg-light p-2 font-weight-bolder" style={{fontSize: '30px'}}>
                                        Weekly Menu ({weeklyMenuData?.data?.startDate} To {weeklyMenuData?.data?.endDate})
                                    </div>
                                    <div className="text-center mb-3">
                                        <img src={weeklyMenuData?.data?.menuImage} alt="Weekly Menu" height="565"/>
                                    </div>
                                </>
                            ) : (
                                <div className="count text-center mt-3 mb-3">
                                    Sorry! No menu found.
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <div className="animated flipInY col-lg-12 col-md-12 col-sm-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-list"></i></div>
                                <div className="count">10</div>
                                <h3>Pending Invoices</h3>
                                <p>Lorem ipsum psdea itgum rixt.</p>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-12 col-md-12 col-sm-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-users"></i></div>
                                <div className="count">5</div>
                                <h3>Total Cancel Requests</h3>
                                <p>Lorem ipsum psdea itgum rixt.</p>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-12 col-md-12 col-sm-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-calendar"></i></div>
                                <div className="count">2022-08-25</div>
                                <h3>Subscription Expiry</h3>
                                <p>Lorem ipsum psdea itgum rixt.</p>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-12 col-md-12 col-sm-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-key"></i></div>
                                <div className="count">3</div>
                                <h3>Available Plans</h3>
                                <p>Lorem ipsum psdea itgum rixt.</p>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-12 col-md-12 col-sm-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-clock-o"></i></div>
                                <div className="count">15</div>
                                <h3>Total Subscriptions</h3>
                                <p>Lorem ipsum psdea itgum rixt.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DashboardUser;