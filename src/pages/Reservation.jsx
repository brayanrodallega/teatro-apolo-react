import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Reservation = () => {
  const { id } = useParams(); // Obtener el ID de la película desde la URL
  const [movie, setMovie] = useState(null);
  const [reservationDate, setReservationDate] = useState("");
  const [seats, setSeats] = useState(0);
  const navigate = useNavigate();

  // Obtener los detalles de la película desde el backend
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data); // Supongamos que el backend devuelve los datos de la película
      } catch (error) {
        toast.error("Error al cargar los detalles de la película.");
      }
    };

    fetchMovie();
  }, [id]);

  // Manejar la reserva
  const handleReservation = async (e) => {
    e.preventDefault();
    let showtime = movie.showtimes.find((showtime) => showtime.date === reservationDate);
    try {
      await axios.post(
        `http://localhost:5000/api/movies/reserve/${id}`,
        { showtimeId: showtime, seats: seats },
        { withCredentials: true }
      );
      toast.success("Reserva realizada con éxito.");
      navigate("/movies"); // Redirigir al usuario a la página de películas
    } catch (error) {
      toast.error("Error al realizar la reserva. Intenta nuevamente.");
    }
  };

  return (
    <div className="reservation-container">
      {movie ? (
        <>
          <h2>Reserva para: {movie.title}</h2>
          <p>{movie.description}</p>
          <form onSubmit={handleReservation}>
            <label>
              Selecciona la fecha:
            </label>
            <select value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} required>
                <option value="">Selecciona una fecha</option>
                {movie.showtimes.map((showtime) => (
                    <option key={showtime._id} value={showtime.date}>
                    {new Date(showtime.date).toLocaleDateString()}
                    </option>
                ))}
            </select> <br />
            <label>Ingrese el numero de asientos: </label>
            <input type="number" name="seats" value={seats} onChange={(e) => setSeats(e.target.value)} required /> <br />
            <br />
            <button type="submit">Confirmar Reserva</button>
          </form>
        </>
      ) : (
        <p>Cargando los detalles de la película...</p>
      )}
    </div>
  );
};

export default Reservation;
