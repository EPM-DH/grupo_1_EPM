import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                 {/*<!-- Sidebar - Brand -->*/}
                 <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={logo} alt="EPM" width="80" height="60"/>
                    </div>
                </Link>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - EPM</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Acciones</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/lastProduct">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Detalle último producto</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/totalCategoriesProducts">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Total de productos por categoría</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/productsList">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Lista de productos registrados</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}

        </React.Fragment>
    )
}
export default SideBar;