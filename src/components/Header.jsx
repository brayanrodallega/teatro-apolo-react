import { Link } from "react-router-dom";
import '../styles/Header.css';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

// Función para abrir el sidebar
function openMenu() {
    document.getElementById('sidebar').style.width = '250px';
}

// Función para cerrar el sidebar
function closeMenu() {
    document.getElementById('sidebar').style.width = '0';
}

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            setIsLoggedIn(true);
            const decodedToken = jwtDecode(token);
            setIsAdmin(decodedToken.isAdmin);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("token");
        setIsLoggedIn(false);
        setIsAdmin(false);
        window.location.href = "/";
    };

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
                        <Link to="/">Hoy</Link>
                    </li>
                    <li>
                        <Link to="/">Proximamente</Link>
                    </li>
                </ul>
        
                <div className="header-nav-menu-search">
                    <input type="text" placeholder="Buscar películas..." />
                    <button>🔍</button>
                </div>
        
                <div className="header-nav-login">
                    {isLoggedIn ? (
                        <>
                            {isAdmin ? (
                                <Link to="/admin/dashboard">Dashboard</Link>
                            ) : (
                                <Link to="/user/reservations">Mis Reservas</Link>
                            )}
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Iniciar sesión</Link>
                            <Link to="/register">Registrarse</Link>
                        </>
                    )}
                </div>
            </nav>

            <aside className="sidebar" id="sidebar">
                <button className="close-btn" onClick={closeMenu}>×</button>
                <ul className="sidebar-menu">
                    <h3>Cine Apollo</h3>
                    <li><Link to="/">Cartelera</Link></li>
                    <li><Link to="/">Hoy</Link></li>
                    <li><Link to="/">Proximamente</Link></li>
                    {isLoggedIn ? (
                        <>
                            {isAdmin ? (
                                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                            ) : (
                                <li><Link to="/user/reservations">Mis Reservas</Link></li>
                            )}
                            <li><button onClick={handleLogout}>Cerrar sesión</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Iniciar sesión</Link></li>
                            <li><Link to="/register">Registrarse</Link></li>
                        </>
                    )}
                </ul>
            </aside>
        </header>
    );
}

export default Header;