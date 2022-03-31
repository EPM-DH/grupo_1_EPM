import React from "react";
import { useEffect, useState } from 'react';

function UltimosProductosVendidos() {
    const [productos, setProductos] = useState([]);

	// Para API
	const path = '/api/v2/';

	useEffect(() => {
        fetch(`${path}order`)
        .then((data) => {
            return data.json();
        })
        .then((result) => {
            setProductos(result.last5Orders);
        })
        .catch((e) => {
            console.log(e);
        });
		
	}, []);

	return(
        productos && <div className="col-auto mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimos 5 Productos Vendidos</h5>
                </div>
                <div className="card-body">
                    <ol>
                        {productos.length === 0 && <p>No hay productos vendidos por el momento</p>}
                        {productos.length > 0 && productos.map((producto, i) => {
                            return (<li key={producto+i}>{producto.name} - {producto.status}</li>
                                    );
                            })
                        }
                    </ol>
                    {/*<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalle del producto</a>*/}
                </div>
            </div>
        </div>
	);

}

export default UltimosProductosVendidos;