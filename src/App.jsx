import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import Reservation from "./pages/Reservation";
import AdminReservations from "./pages/AdminReservations";
import UserReservation from "./pages/UserReservation";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/user/reservations" element={<UserReservation />} />
        <Route path="/user/reservation/:id" element={<Reservation />} />
        <Route path="/admin/dashboard" element={<AdminReservations />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
