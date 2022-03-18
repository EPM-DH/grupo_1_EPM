import React from 'react';


function FilaProducto(props){
    return (
                <tr>
                    <td>{props.name}</td>
                    <td>{props.description}</td>
                    <td>
                        <ul>
                            {props.categories.map((category,i) => 
                                <li key={`category${i}`}>{category}</li>
                            )}
                        </ul>
                    </td>
                </tr>
    )
}
    
        

export default FilaProducto;