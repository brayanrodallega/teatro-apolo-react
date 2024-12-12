import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "../styles/Reservation.css";

const Reservation = () => {
  const { id } = useParams(); // Obtener el ID de la película desde la URL
  const [movie, setMovie] = useState(null);
  const [reservationDate, setReservationDate] = useState("");
  const [seats, setSeats] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  // Obtener los detalles de la película desde el backend
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/${id}`);
        setMovie(response.data); // Supongamos que el backend devuelve los datos de la película
      } catch (error) {
        toast.error("Error al cargar los detalles de la película.", error);
      }
    };

    fetchMovie();
  }, [id]);

  // Manejar la reserva
  const handleReservation = async (e) => {
    e.preventDefault();
    // Obtener el showtimeId de la fecha seleccionada
    let showtime = movie.showtimes.find((showtime) => showtime.date === reservationDate);
    // Obtener el token de la cookie
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/reservations/reserve`,
        { title: movie.title, showtimeId: showtime._id, userId: decodedToken.id, seats },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Reserva realizada con éxito.");
      openModal();
    } catch (error) {
      toast.error("Error al realizar la reserva. Intenta nuevamente.", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/");
  }

  {/* Función para dar formato a la fecha y hora / date: 2024-11-20T21:00:00.000+00:00 */}

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("es-ES", options);
  }

  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(date).toLocaleTimeString("es-ES", options);
  }





  return (
    <>
      <div className="reservation-container">
        {movie ? (
          <>
            <div className="movie-details">
              {/* Aquí va el contenido de la película */}
              <h2>{movie.title}</h2>
              <img src={movie.image} alt={`Cartel de la película ${movie.title}`} />
              <p>{movie.description}</p>
              {/* Agrega más detalles de la película según sea necesario */}
            </div>
            <form className="reservation-form" onSubmit={handleReservation}>
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
              <button type="submit">Reservar</button>
            </form>
          </>
        ) : (
          <p>Cargando los detalles de la película...</p>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Reserva confirmada</h2>
        <p>Fecha: {reservationDate ? formatDate(reservationDate) : "No disponible"}</p>
        <p>Hora: {reservationDate ? formatTime(reservationDate) : "No disponible"}</p>
        <p>Película: {movie && movie.title ? movie.title : "No disponible"}</p>
        <p>Asientos reservados: {seats ? seats : "No disponible"}</p>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </>
  );
};

export default Reservation;
