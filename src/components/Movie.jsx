import { Link } from "react-router-dom";
import "../styles/Movie.css";

function Movie({ movie }) {
    return (
        <div className="movie">
            <Link to={`/user/reservation/${movie._id}`}>
                <div className="poster">
                    <img src={movie.image} alt={`Cartel de la película ${movie.title}`} />
                </div>
                <div>
                    <h3 className="title">{movie.title}</h3>
                    <p className="description">{movie.description}</p>
                </div>
            </Link>
        </div>
    );
}

export default Movie;