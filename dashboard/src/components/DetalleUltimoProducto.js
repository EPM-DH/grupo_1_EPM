import React from "react";
import { useEffect, useState } from 'react';

function DetalleUltimoProducto() {
    const [producto, setProducto] = useState({});

	// Para API
	const path = '/api/v2/';

	useEffect(() => {
        fetch(`${path}product`)
        .then((data) => {
            return data.json();
        })
        .then((result) => {
            setProducto(...result.products.slice(-1));
        })
        .catch((e) => {
            console.log(e);
        });
		
	}, []);

    /*useEffect(() => {
        console.log(producto.categories);
    }, [producto]);*/

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Detalle ultimo producto: {producto.name}</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={producto.image} alt="Imagen ultimo producto"/>
                    </div>
                    <h6><strong>Descripción corta</strong></h6>
                    <p>{producto.description}</p>
                    <h6><strong>Precio producto</strong></h6>
                    <p className="precio-producto">${producto.price}</p>
                    <h6><strong>Categorías del producto</strong></h6>
                    <ul>
                        {producto.categories.length > 0 ? producto.categories.map((categoria, i) => {
                                return <li key={categoria+i}>{categoria}</li>
                            }) : <p>Este producto no tiene categorías asociadas</p>
                        }
                    </ul>
                    {/*<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalle del producto</a>*/}
                </div>
            </div>
        </div>
    );
}

export default DetalleUltimoProducto;