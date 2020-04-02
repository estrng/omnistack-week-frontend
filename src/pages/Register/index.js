import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();
  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      nome,
      email,
      whatsapp,
      city,
      uf
    };
    try {
      const response = await api.post("ongs", data); // REGISTER API post

      alert(`Seu ID: ${response.data.id}`);

      history.push("/");
    } catch (err) {
      alert("Erro tente novamente");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Register</h1>
          <p>Make your registrer.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={10} color="#e02041" />
            Back
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Ong"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="State"
              style={{ with: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
// REGISTER Page
