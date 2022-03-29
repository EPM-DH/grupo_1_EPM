import React from "react";
import SmallCard from './SmallCard';
import { useEffect, useState } from 'react';

function NumeroVentas() {
    const [numeroVentas, setTotalNumeroVentas] = useState(0);

	// Para API
	const path = '/api/v2/';

	useEffect(() => {
        fetch(`${path}order`)
        .then((data) => {
            return data.json();
        })
        .then((result) => {
            setTotalNumeroVentas(result.numberOfOrders);
        })
        .catch((e) => {
            console.log(e);
        });
		
	}, []);

	return(
		<SmallCard color="danger" title="Numero de Ventas" quantity={numeroVentas} icon="fas fa-hashtag"/>
	);
}

export default NumeroVentas;