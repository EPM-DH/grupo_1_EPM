//For react
import React from "react";
import TotalProductos from "./TotalProductos";
import TotalUsuarios from "./TotalUsuarios";
import TotalCategorias from "./TotalCategorias";
import DetalleUltimoProducto from "./DetalleUltimoProducto";
import CategoriasTotal from "./CategoriasTotal";
import ListadoProductos from "./ListadoProductos";

function MainComponent() {

    return (
        <div className="container-fluid">
            <div className="row">
                <TotalProductos/>
                <TotalUsuarios/>
                <TotalCategorias/>
            </div>
            <div className="row">
                <DetalleUltimoProducto/>
                <CategoriasTotal/>
            </div>
            <div className="row">
                <ListadoProductos/>
            </div>
        </div>
    );
}

export default MainComponent;