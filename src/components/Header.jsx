import { Link } from "react-router-dom";

// Función para abrir el sidebar
function openMenu() {
    document.getElementById('sidebar').style.width = '250px';
}

// Función para cerrar el sidebar
function closeMenu() {
    document.getElementById('sidebar').style.width = '0';
}

function Header() {
    return (
        <header className="header">
            <nav className="header-nav">
                <div className="header-nav-logo">
                <button className="menu-btn" onClick={openMenu}>
                    ☰
                </button>
                <Link to="/">Cine Apollo</Link>
                </div>
        
                <ul className="header-nav-menu">
                <li>
                    <Link to="/">Cartelera</Link>
                </li>
                <li>
                    <Link to="/proximante">Pronto</Link>
                </li>
                <li>
                    <Link to="/comida">Comidas</Link>
                </li>
                </ul>
        
                <div className="header-nav-menu-search">
                <input type="text" placeholder="Buscar películas..." />
                <button>🔍</button>
                </div>
        
                <div className="header-nav-login">
                <Link to="/login">Iniciar sesión</Link>
                <Link to="/register">Registrarse</Link>
                </div>
            </nav>

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
        </header>
        
    );
}

export default Header;