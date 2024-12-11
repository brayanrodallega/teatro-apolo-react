import { useEffect, useState } from "react";
import axios from "axios";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/reservations`);
      //   {
      //     "message": "Reservas obtenidas con éxito",
      //     "reservations": [
      //         {
      //             "_id": "6758ece6aa29be6910ff4e13",
      //             "title": "El Rey León",
      //             "date": "2024-11-20T18:00:00.000Z",
      //             "user": {
      //                 "_id": "67550bff11066983cffcf5a9",
      //                 "email": "estiben@mail.com",
      //                 "name": "Estiben"
      //             },
      //             "seats": 4,
      //             "__v": 0
      //         }
      //     ]
      // }
        // Supongamos que el backend devuelve un array de reservas

        // format date
        const date = new Date(response.data.reservations.date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateFormatted = date.toLocaleDateString('es-ES', options);
        console.log(dateFormatted);

        // format time
        const time = new Date(response.data.reservations.date);
        const timeFormatted = time.toLocaleTimeString('es-ES');
        console.log(timeFormatted);
        setReservations(response.data.reservations);
        console.log(response.data.reservations);
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


  if (loading) {
    return <p>Cargando reservas...</p>;
  }

  return (
    <div>
      <h2>Listado de Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Película</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Asientos</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.user.name}</td>
              <td>{reservation.user.email}</td>
              <td>{reservation.title}</td>
              <td>{dateformater(new Date(reservation.date))}</td>
              <td>{timeformater(new Date(reservation.date))}</td>
              <td>{reservation.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReservations;
