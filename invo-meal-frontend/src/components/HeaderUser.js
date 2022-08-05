import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginReset} from "../redux/action";

const HeaderUser = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const SITE_DATA = process.env.REACT_APP_SITE_DATE;
    const SITE_TOKEN = process.env.REACT_APP_SITE_TOKEN;

    const handleLogout = () => {
        dispatch(loginReset());
        localStorage.removeItem(SITE_DATA);
        localStorage.removeItem(SITE_TOKEN);
        navigate("/login");
    }

    return (
        <div className="top_nav">
            <div className="nav_menu">
                <div className="nav toggle">
                    <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                </div>
                <nav className="nav navbar-nav">
                    <ul className=" navbar-right">
                        <li className="nav-item dropdown open">
                            <a href="javascript:;" className="user-profile dropdown-toggle" aria-haspopup="true"
                               id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                                <img src="/images/img.jpg" alt=""/>
                                John Doe
                            </a>
                            <div className="dropdown-menu dropdown-usermenu pull-right"
                                 aria-labelledby="navbarDropdown">
                                <Link to="/admin/dashboard" className="dropdown-item">
                                    <i className="fa fa-user pull-right"></i> Profile
                                </Link>
                                <Link to="/admin/dashboard" className="dropdown-item">
                                    <i className="fa fa-key pull-right"></i> Change Password
                                </Link>
                                <button type="button" className="dropdown-item" onClick={handleLogout}>
                                    <i className="fa fa-sign-out pull-right"></i> Log Out
                                </button>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
export default HeaderUser;