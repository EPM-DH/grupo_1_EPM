import React from "react";
import SmallCard from './SmallCard';
import { useEffect, useState } from 'react';

function TotalCategorias() {
    const [totalCategorias, setTotalCategorias] = useState(0);

	// Para API
	const path = '/api/v2/';

	useEffect(() => {
        fetch(`${path}product`)
        .then((data) => {
            return data.json();
        })
        .then((result) => {
            setTotalCategorias(result.countByCategory.length);
        })
        .catch((e) => {
            console.log(e);
        });
		
	}, []);

	return(
		totalCategorias && <SmallCard color="warning" title="Total de Categorias" quantity={totalCategorias} icon="fab fa-buffer"/>
	);
}

export default TotalCategorias;