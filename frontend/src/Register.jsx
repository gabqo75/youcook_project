import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [pseudonyme, setPseudonyme] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register', {
        pseudonyme,
        email,
        password
      });
      alert("Compte créé avec succès ! Connectez-vous.");
      navigate('/login');
    } catch (err) {
      alert("Erreur lors de l'inscription. Vérifiez vos informations.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Inscription</h2>

        <form onSubmit={handleRegister}>
          {}
          <div className="input-group">
            <label>Pseudonyme</label>
            <input 
              type="text" 
              value={pseudonyme}
              onChange={e => setPseudonyme(e.target.value)} 
              required 
            />
          </div>

          {}
          <div className="input-group">
            <label>Adresse e-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>

          {}
          <div className="input-group">
            <label>Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          <p className="login-link-text">
            Vous avez déjà un compte ?
            <Link to="/login">Connectez-vous ici</Link>
          </p>

          <button type="submit" className="btn-register">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}