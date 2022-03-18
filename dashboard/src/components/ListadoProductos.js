import React from "react";
import { useEffect, useState } from 'react';
import FilaProducto from "./FilaProducto";

function ListadoProductos() {
    const [productos, setProductos] = useState([]);

	// Para API
	const path = '/api/v2/';

	useEffect(() => {
        fetch(`${path}product`)
        .then((data) => {
            return data.json();
        })
        .then((result) => {
            setProductos([...result.products]);
        })
        .catch((e) => {
            console.log(e);
        });
		
	}, []);

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <h2>Lista de productos registrados</h2>
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Categorías</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Categorías</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                                productos.map((row , i) => {
                                    return <FilaProducto {...row} key={i}/>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

export default ListadoProductos;