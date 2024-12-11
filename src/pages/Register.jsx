import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";



const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    //confirmPassword: "",
    name: "",
    //documentType: "CC",
    //documentNumber: "",
    phone: "",
    //birthDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (form.password !== form.confirmPassword) {
    //   toast.error("Las contraseñas no coinciden.");
    //   return;
    // }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, form);
      toast.success("Usuario registrado exitosamente. ¡Inicia sesión!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al registrar usuario.");
    }
  };

  return (
    <div className="register-container">
      <h2>Crear cuenta</h2>
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
        {/* <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        /> */}
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        {/* <select name="documentType" value={form.documentType} onChange={handleChange}>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="PPT">Permiso por Protección Temporal</option>
        </select>
        <input
          type="text"
          name="documentNumber"
          placeholder="Número de documento"
          value={form.documentNumber}
          onChange={handleChange}
          required
        /> */}
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          required
        />
        {/* <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          required
        /> */}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
