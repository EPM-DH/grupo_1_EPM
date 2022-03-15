import React from 'react';
import { Link } from 'react-router-dom';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - DH movies</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/genresInDB">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Genres</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/lastMovieInDB">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Last Movie</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/contentRowMovies">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Movies Resume</span></Link>
                </li>

                {/*<!-- Nav Item - Movies -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/movies">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Movies</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}

        </React.Fragment>
    )
}
export default SideBar;