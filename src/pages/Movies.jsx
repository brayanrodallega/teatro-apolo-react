import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  // Obtener la lista de películas desde el backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setMovies(response.data); // Supongamos que el backend devuelve un array de películas
      } catch (error) {
        toast.error("Error al cargar las películas.");
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-container">
      <h2>Películas en Cartelera</h2>
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <Link to={`/reservation/${movie._id}`}>Reservar</Link>
            </div>
          ))
        ) : (
          <p>No hay películas disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
