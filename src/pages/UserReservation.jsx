import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import "./../styles/Table.css";

const UserReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = Cookies.get("token");
        const decodedToken = jwtDecode(token);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/reservations/user/${decodedToken.id}`);
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const dateformater = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }

  const timeformater = (time) => {
    return time.toLocaleTimeString('es-ES');
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta reserva?");
    if (confirmDelete) {
      try {
        const token = Cookies.get("token");
        await axios.delete(`${import.meta.env.VITE_API_URL}/reservations/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation._id !== id)
        );
        alert("Reserva eliminada con éxito.");
      } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        alert("Error al eliminar la reserva. Intenta nuevamente.");
      }
    }
  };

  if (loading) {
    return <p>Cargando reservas...</p>;
  }

  return (
    <div className="table-container">
      <h2>Mis Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>Película</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Asientos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.title}</td>
              <td>{dateformater(new Date(reservation.date))}</td>
              <td>{timeformater(new Date(reservation.date))}</td>
              <td>{reservation.seats}</td>
              <td>
                <button onClick={() => handleDelete(reservation._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserReservation;