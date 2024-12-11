{/* <aside class="sidebar" id="sidebar">
        
        <button class="close-btn" onclick="closeMenu()">×</button>
        <ul class="sidebar-menu">
            <h3>Cine Apollo</h3>
            <li><a href="#">Cartelera</a></li>
            <li><a href="#">Pronto</a></li>
            <li><a href="#">Comidas</a></li>
            <li><a href="login.html">Iniciar sesión</a></li>
            <li><a href="signin.html">Registrarse</a></li>
        </ul>
    </aside> */}

import { Link } from "react-router-dom";

// Función para cerrar el sidebar
function closeMenu() {
    document.getElementById('sidebar').style.width = '0';
}

function Menu() {
    return (
        <aside className="sidebar" id="sidebar">
            <button className="close-btn" onClick={closeMenu}>×</button>
            <ul className="sidebar-menu">
                <h3>Cine Apollo</h3>
                <li><Link to="/">Cartelera</Link></li>
                <li><Link to="/proximante">Pronto</Link></li>
                <li><Link to="/comida">Comidas</Link></li>
                <li><Link to="/login">Iniciar sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
            </ul>
        </aside>
    );
}

export default Menu;