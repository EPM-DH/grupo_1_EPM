//For routing
import { Switch, Route } from 'react-router-dom';

//Components
import SideBar from './components/SideBar';
import TopBar from "./components/TopBar";
import MainComponent from './components/MainComponent';
import CategoriasTotal from './components/CategoriasTotal';
import DetalleUltimoProducto from './components/DetalleUltimoProducto';
import ListadoProductos from './components/ListadoProductos';
import TotalCategorias from './components/TotalCategorias';
import TotalProductos from './components/TotalProductos';
import TotalUsuarios from './components/TotalUsuarios';
import NotFound404 from './components/NotFound404';
import Footer from './components/Footer';

function App() {
  return (
    <div id="wrapper">
        <SideBar/>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBar/>
            <Switch>
              <Route path="/" exact component={MainComponent}/>
              <Route path="/totalCategoriesProducts" component={CategoriasTotal}/>
              <Route path="/lastProduct" component={DetalleUltimoProducto}/>
              <Route path="/productsList" component={ListadoProductos}/>
              <Route path="/totalCategories" component={TotalCategorias}/>
              <Route path="/totalProducts" component={TotalProductos}/>
              <Route path="/totalUsers" component={TotalUsuarios}/>
              <Route component={NotFound404}/>
            </Switch>
            <Footer/>
          </div>
        </div>  
    </div>
  );
}

export default App;
