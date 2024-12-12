import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Movie from "../components/Movie";
import "../styles/Movies.css";


const Movies = () => {
  const [movies, setMovies] = useState([]);

  // Obtener la lista de películas desde el backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies`);
        setMovies(response.data); // Supongamos que el backend devuelve un array de películas
      } catch (error) {
        toast.error("Error al cargar las películas.", error);
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
            <Movie key={movie._id} movie={movie} />
          ))
        ) : (
          <p>No hay películas disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
