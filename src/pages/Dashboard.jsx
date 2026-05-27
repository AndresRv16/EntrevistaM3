import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await api.get("/");
      setIssues(response.data);
    } catch (error) {
      console.log(error);
      alert("Error cargando incidencias");
    }
  };

  const handleCreate = async () => {
    if (!title || !description || !status || !priority) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const newIssue = {
        title,
        description,
        status,
        priority
      };

      const response = await api.post("/", newIssue);
      
      setIssues([...issues, response.data]);

      setTitle("");
      setDescription("");
      setStatus("");
      setPriority("");

      alert("Incidencia creada");
    } catch (error) {
      console.log(error);
      alert("Error al crear incidencia");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">

        <h1>Dashboard</h1>

        <p>Bienvenido: {user?.name}</p>
        <p>Rol: {user?.role}</p>

        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>

        <h2>Nueva Incidencia</h2>

        <div className="form-grid">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Estado"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <input
            type="text"
            placeholder="Prioridad"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>

        <button className="create-btn" onClick={handleCreate}>
          Crear incidencia
        </button>

        <h2>Incidencias</h2>

        {issues.length === 0 ? (
          <p>No hay incidencias</p>
        ) : (
          issues.map((issue) => (
            <div className="issue-card" key={issue.id}>
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
              <p><strong>Estado:</strong> {issue.status}</p>
              <p><strong>Prioridad:</strong> {issue.priority}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Dashboard;