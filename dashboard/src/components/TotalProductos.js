import React from "react";
import SmallCard from './SmallCard';
import { useEffect, useState } from 'react';

function TotalProductos() {
    const [totalProductos, setTotalProductos] = useState(0);

	// Para API
	const path = '/api/v2/';

	useEffect(() => {
        fetch(`${path}product`)
        .then((data) => {
            return data.json();
        })
        .then((result) => {
            setTotalProductos(result.count);
        })
        .catch((e) => {
            console.log(e);
        });
		
	}, []);

	return(
		totalProductos && <SmallCard color="primary" title="Total de productos" quantity={totalProductos} icon="fas fa-shopping-basket"/>
	);
}

export default TotalProductos;