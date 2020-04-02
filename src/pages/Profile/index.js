import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import "./styles.css";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem("ongId");
  const ongNome = localStorage.getItem("ongNome");

  const history = useHistory();

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteInsident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("erro a deletar");
    }
  }

  function handleLogout(params) {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Welcome {ongNome}</span>

        <Link className="button" to="/incidents/new">
          Register new case
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Cases</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASE:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIPTION</strong>
            <p>{incident.description}</p>

            <strong>VALUE</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteInsident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// PROFILE page
