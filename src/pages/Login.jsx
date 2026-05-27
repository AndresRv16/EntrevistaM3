import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ name, role }));
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Iniciar sesión</h1>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Rol"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button onClick={handleLogin}>Ingresar</button>
      </div>
    </div>
  );
}

export default Login;