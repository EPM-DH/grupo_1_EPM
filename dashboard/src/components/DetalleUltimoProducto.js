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

    useEffect(() => {
        console.log(producto.categories);
    }, [producto]);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Detalle ultimo producto: {producto.name}</h5>
                </div>
                <div className="card-body">
                    <p>{producto.description}</p>
                    <ul>
                        {
                            /*producto.categories.map((categoria, i) => {
                                return <li key={categoria+i}>{categoria}</li>
                            })*/
                        }
                    </ul>
                    {/*<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalle del producto</a>*/}
                </div>
            </div>
        </div>
    );
}

export default DetalleUltimoProducto;