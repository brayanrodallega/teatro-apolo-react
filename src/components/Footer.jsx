import { Link } from "react-router-dom";
import '../styles/Footer.css';


function Footer() {
    return (
        <footer>
            <div className="footer-links">
                <div>
                    <h4>Películas</h4>
                    <Link to="#">Acción</Link><br />
                    <Link to="#">Comedia</Link><br />
                    <Link to="#">Drama</Link><br />
                </div>
                <div>
                    <h4>Eventos</h4>
                    <Link to="#">Conciertos</Link><br />
                    <Link to="#">Teatro</Link><br />
                    <Link to="#">Deportes</Link><br />
                </div>
                <div>
                    <h4>Sobre nosotros</h4>
                    <Link to="/contacto">Contacto</Link><br />
                    <Link to="#">Trabaja con nosotros</Link><br />
                    <Link to="#">Política de privacidad</Link><br />
                </div>
                <div>
                    <h4>Síguenos en</h4>
                    <Link to="#">Facebook</Link><br />
                    <Link to="#">Twitter</Link><br />
                    <Link to="#">Instagram</Link><br />
                </div>
            </div>
        </footer>
    );
}

export default Footer;