import { Link } from "react-router-dom";
import "../styles/MovieFilter.css";

function MovieFilter() {
    return (
        <section className="filter-section">
            <Link to="/"><button className="filter-btn">Todas las películas</button></Link>
            <Link to="/"><button className="filter-btn">Hoy</button></Link>
            <Link to="/"> <button className="filter-btn">Próximamente</button></Link>
            <div className="date-select">
                <label htmlFor="date">Seleccionar fecha:</label>
                <select id="date">
                    <option value="none">Elegir</option>
                    <option value="2024-09-25">25 Sep 2024</option>
                    <option value="2024-09-26">26 Sep 2024</option>
                </select>
            </div>
        </section>
    );
}

export default MovieFilter;