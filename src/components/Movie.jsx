import { Link } from "react-router-dom";

function Movie({ movie }) {
    return (
        <div className="movie">
            <Link to={`/reservation/${movie._id}`}>
                <div className="poster">
                    <img src={movie.image} alt={`Cartel de la película ${movie.title}`} />
                </div>
                <div>
                    <h3 className="title">{movie.description}</h3>
                </div>
            </Link>
        </div>
    );
}

export default Movie;