//For react
import React from "react";
import TotalProductos from "./TotalProductos";
import TotalUsuarios from "./TotalUsuarios";
import TotalCategorias from "./TotalCategorias";
import NumeroVentas from "./NumeroVentas";
import TotalVentas from "./TotalVentas";
import DetalleUltimoProducto from "./DetalleUltimoProducto";
import CategoriasTotal from "./CategoriasTotal";
import UltimosProductosVendidos from "./UltimosProductosVendidos";
import ListadoProductos from "./ListadoProductos";

function MainComponent() {

    return (
        <div className="container-fluid">
            <div className="d-flex flex-row justify-content-around align-items-center flex-nowrap">
                <TotalProductos/>
                <TotalUsuarios/>
                <TotalCategorias/>
                <NumeroVentas/>
                <TotalVentas/>
            </div>
            <div className="d-flex flex-fill">
                <DetalleUltimoProducto/>
                <div className="d-flex flex-column">
                    <CategoriasTotal/>
                    <UltimosProductosVendidos/>
                </div>
            </div>
            <div className="row">
                <ListadoProductos/>
            </div>
        </div>
    );
}

export default MainComponent;