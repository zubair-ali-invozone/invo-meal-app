import {Link} from "react-router-dom";

const SidebarUser = () => {
    return (
        <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
            <div className="menu_section">
                <h3>Options</h3>
                <ul className="nav side-menu">
                    <li>
                        <Link to="/user/dashboard"><i className="fa fa-home"></i> Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/user/subscription"><i className="fa fa-clock-o"></i> Subscription</Link>
                    </li>
                    <li>
                        <Link to="/user/invoices"><i className="fa fa-list"></i> Invoices</Link>
                    </li>
                    <li>
                        <Link to="/user/cancel-meal"><i className="fa fa-spoon"></i> Cancel Meal</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default SidebarUser;