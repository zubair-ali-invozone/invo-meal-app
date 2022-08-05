import {Link} from "react-router-dom";

const SidebarAdmin = () => {
    return (
        <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
            <div className="menu_section">
                <h3>Options</h3>
                <ul className="nav side-menu">
                    <li>
                        <Link to="/admin/dashboard"><i className="fa fa-home"></i> Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/weekly-menus"><i className="fa fa-cutlery"></i> Weekly Menus</Link>
                    </li>
                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/invoices"><i className="fa fa-list"></i> Invoices</Link>
                    </li>
                    <li>
                        <Link to="/admin/today-meal"><i className="fa fa-spoon"></i> Today Meal</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default SidebarAdmin;