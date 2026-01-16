import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login', { 
        username: email, 
        password 
      });
      onLogin(res.data);
      navigate('/');
    } catch (err) { 
      alert("Erreur de connexion"); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Connexion</h2>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Adresse e-mail</label>
            <input 
              type="email" 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Mot de passe</label>
            <input 
              type="password" 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          <div className="signup-link">
            Vous avez déjà un compte ?
            <Link to="/register"> Inscrivez-vous ici</Link>
          </div>

          <button type="submit" className="btn-login">
            Me connecter
          </button>
        </form>
      </div>
    </div>
  );
}