import React from "react";
import SmallCard from './SmallCard';
import { useEffect, useState } from 'react';

function TotalUsuarios() {
    const [totalUsuarios, setTotalUsuarios] = useState(0);

	// Para API
	const path = '/api/v2/';

	useEffect(() => {
        fetch(`${path}user`)
        .then((data) => {
            return data.json();
        })
        .then((result) => {
            setTotalUsuarios(result.count);
        })
        .catch((e) => {
            console.log(e);
        });
		
	}, []);

	return(
		<SmallCard color="success" title="Total de Usuarios" quantity={totalUsuarios} icon="fas fa-user"/>
	);
}

export default TotalUsuarios;