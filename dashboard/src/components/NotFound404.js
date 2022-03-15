import React from 'react';
import imagenFondo from '../assets/img/404.jpg'

function NotFound404(){
    return (
        <React.Fragment>
			<h1>404 Not Found</h1>
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 30 +'rem'}} src={imagenFondo} alt="404 Not Found"/>
        </React.Fragment>
    )
}
export default NotFound404;