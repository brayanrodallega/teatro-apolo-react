import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import "../styles/Login.css";


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form, {
        withCredentials: true,
      })

      // Guardar el token en una cookie
      Cookies.set("token", response.data.token);
      // Mostrar un mensaje de éxito
      toast.success("¡Inicio de sesión exitoso!");
      // Redirigir al usuario a la página de películas o perfil
      window.location.href = "/movies";
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
