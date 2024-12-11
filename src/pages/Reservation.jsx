import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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



  return (
    <>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
            overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "50%",
            margin: "auto",
          },
          }}
          >
            <h2>Reserva confirmada</h2>
            <p>Fecha y hora: {reservationDate ? reservationDate : "No disponible"}</p>
            <p>Película: {movie && movie.title ? movie.title : "No disponible"}</p>
            <p>Asientos reservados: {seats ? seats : "No disponible"}</p>
            <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </>
  );
};

export default Reservation;
