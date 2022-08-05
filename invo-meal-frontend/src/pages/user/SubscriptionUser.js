import {useDispatch, useSelector} from "react-redux";
import {checkSubscription, checkSubscriptionReset} from "../../redux/action";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const SubscriptionUser = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const {checkSubscriptionLoading, checkSubscriptionData, checkSubscriptionError} = useSelector((state) => state.usersRedux);

    useEffect(() => {
        if (checkSubscriptionData?.is_plan === false) {
            dispatch(checkSubscriptionReset());
            navigate("/user/purchase-plan");
        }
    }, [checkSubscriptionData]);

    useEffect(() => {
        dispatch(checkSubscription());
    }, []);

    return (
        <div className="right_col" role="main">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Subscription</h3>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="x_panel">
                        <div className="x_content">
                            <div className="col-md-12 col-sm-12">
                                <div className="profile_view">
                                    {checkSubscriptionLoading ? (
                                        <div className="text-center p-5">
                                            <i className="fa fa-spinner fa-spin fa-3x"></i>
                                        </div>
                                    ) : checkSubscriptionData?.data ? (
                                        <>
                                            <div className="col-sm-12">
                                                <div className="col-md-12 col-sm-12">
                                                    <h2><strong>Subscription:</strong> {checkSubscriptionData.data.planTitle}</h2>
                                                    <p><strong>Duration:</strong> {checkSubscriptionData.data.planDays} Days</p>
                                                    <p><strong>Pricing:</strong> Rs. {checkSubscriptionData.data.amount}</p>
                                                    <p><strong>Expiry Date:</strong> {checkSubscriptionData.data.expDate || (<span className="text-danger font-weight-bold">Not Started.</span>)}</p>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="col-sm-12 emphasis">
                                                    <button type="button" className="btn btn-danger btn-sm">
                                                        <i className="fa fa-close"> </i> Cancel Subscription
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="count text-center mt-3 mb-3">
                                            Sorry! No subscription found.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SubscriptionUser;