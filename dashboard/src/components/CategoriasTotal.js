import React from "react";
import { useEffect, useState } from 'react';

function CategoriasTotal() {
    const [categorias, setCategorias] = useState([]);

	// Para API
	const path = '/api/v2/';

	useEffect(() => {
        fetch(`${path}product`)
        .then((data) => {
            return data.json();
        })
        .then((result) => {
            setCategorias(result.countByCategory);
        })
        .catch((e) => {
            console.log(e);
        });
		
	}, []);

	return(
        categorias && <div className="col-auto mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Total de productos por categoría</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {categorias.length === 0 && <p>No hay categorías existentes por el momento</p>}
                        {categorias.length > 0 && categorias.map((categoria, i) => {
                            return (
                                    <div className="col-lg-6 mb-4" key={Object.keys(categoria)+i}>
                                        <div className="card bg-dark text-white shadow">
                                            <div className="card-body d-flex justify-content-between align-items-center">{Object.keys(categoria)} <span className="badge bg-complementary">{Object.values(categoria)}</span></div>
                                        </div>
                                    </div>);
                            })
                        }
                    </div>
                    {/*<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalle del producto</a>*/}
                </div>
            </div>
        </div>
	);

}

export default CategoriasTotal;