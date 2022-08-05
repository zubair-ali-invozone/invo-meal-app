import {Outlet} from "react-router-dom";
import SidebarUser from "./components/SidebarUser";
import HeaderUser from "./components/HeaderUser";

const WrapperAdmin = () => {
    return (
        <div className="container body">
            <div className="main_container">
                <div className="col-md-3 left_col">
                    <div className="left_col scroll-view">
                        <div className="navbar nav_title">
                            <a href="index.html" className="site_title">
                                <i className="fa fa-cutlery"></i> <span>invo-meals</span>
                            </a>
                        </div>

                        <div className="clearfix"></div>
                        <div className="profile clearfix mb-3">
                            <div className="profile_pic">
                                <img src="/images/img.jpg" alt="..." className="img-circle profile_img"/>
                            </div>
                            <div className="profile_info">
                                <span>Welcome,</span>
                                <h2>Admin</h2>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        {/* --- Sidebar --- */}
                        <SidebarUser/>
                        {/* --- End Sidebar --- */}
                    </div>
                </div>
                {/* --- Navbar --- */}
                <HeaderUser/>
                {/* --- End Navbar --- */}

                {/* --- Route Component --- */}
                <Outlet/>
                {/* --- End Component --- */}

                {/* --- Footer --- */}
                {/*<Footer />*/}
                {/* --- End Footer --- */}
            </div>
        </div>
    );
}
export default WrapperAdmin;