import React from "react";
import SmallCard from './SmallCard';
import { useEffect, useState } from 'react';

function TotalVentas() {
    const [totalVentas, setTotalVentas] = useState(0);

	// Para API
	const path = '/api/v2/';

	useEffect(() => {
        fetch(`${path}order`)
        .then((data) => {
            return data.json();
        })
        .then((result) => {
            setTotalVentas(result.totalIncome);
        })
        .catch((e) => {
            console.log(e);
        });
		
	}, []);

	return(
		<SmallCard color="info" title="Total de Ventas" quantity={'$' + totalVentas} icon="fas fa-money-bill"/>
	);
}

export default TotalVentas;