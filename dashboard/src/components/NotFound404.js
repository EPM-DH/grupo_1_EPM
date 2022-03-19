import React from 'react';
import imagenFondo from '../assets/img/404.jpeg'

function NotFound404(){
    return (
        <React.Fragment>
			<h1>404 Not Found</h1>
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: '150%'}} src={imagenFondo} alt="404 Not Found"/>
        </React.Fragment>
    )
}
export default NotFound404;