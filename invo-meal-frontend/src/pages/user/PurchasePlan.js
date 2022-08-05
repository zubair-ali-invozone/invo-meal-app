import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {checkSubscription, checkSubscriptionReset, plans, subscribeNow, subscribeNowReset} from "../../redux/action";
import {useNavigate} from "react-router-dom";

const PurchasePlan = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [planId, setPlanId] = useState(0);

    const {
        planLoading,
        planData,
        planError,
        subscribeNowLoading,
        subscribeNowData,
        subscribeNowError,
        checkSubscriptionLoading,
        checkSubscriptionData,
        checkSubscriptionError
    } = useSelector((state) => state.usersRedux);

    useEffect(() => {
        if (subscribeNowData?.status === true) {
            dispatch(subscribeNowReset());
            navigate("/user/subscription");
        }
    }, [subscribeNowData]);

    useEffect(() => {
        if (checkSubscriptionData?.is_plan === true) {
            dispatch(checkSubscriptionReset());
            navigate("/user/subscription");
        } else if (checkSubscriptionData?.is_plan === false) {
            dispatch(checkSubscriptionReset());
            dispatch(plans());
        }
    }, [checkSubscriptionData]);

    useEffect(() => {
        dispatch(checkSubscription());
    }, []);

    const subscribe = (planId) => {
        setPlanId(planId);
        dispatch(subscribeNow({planId}));
    }

    return (
        <div className="right_col" role="main">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Purchase Plan</h3>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-md-12 col-sm-12  ">
                        <div className="x_panel">
                            <div className="x_content">
                                <div className="row">
                                    <div className="col-md-12">
                                        {(checkSubscriptionLoading || planLoading) ? (
                                            <div className="text-center p-5">
                                                <i className="fa fa-spinner fa-spin fa-3x"></i>
                                            </div>
                                        ) : planData?.data ? (
                                            planData?.data.map((item, index) => (
                                                <div key={index} className="col-md-4 col-sm-6">
                                                    <div className="pricing">
                                                        <div className="title">
                                                            <h2>{item.planTitle}</h2>
                                                            <h1>Rs. {item.amount}</h1>
                                                            <span>{item.planDays} Days</span>
                                                        </div>
                                                        <div className="x_content">
                                                            <div className="">
                                                                <div className="pricing_features">
                                                                    <ul className="list-unstyled text-left">
                                                                        <li>
                                                                            <i className="fa fa-check text-success mr-2"></i>
                                                                            Some description here...
                                                                        </li>
                                                                        <li>
                                                                            <i className="fa fa-times text-danger mr-2"></i>
                                                                            Some description here...
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="pricing_footer">
                                                                <button className="btn btn-success btn-block"
                                                                        onClick={() => subscribe(item.id)}>
                                                                    {subscribeNowLoading && planId === item.id ? (
                                                                        <i className="fa fa-spinner fa-spin"></i>) : "Subscribe Now"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))) : (
                                            <div className="count text-center mt-3 mb-3">
                                                Sorry! No menu found.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PurchasePlan;