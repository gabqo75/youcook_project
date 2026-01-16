import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import axios from 'axios'

import RecipeList from './RecipeList'
import RecipeDetail from './RecipeDetail'
import CategoryRecipes from './CategoryRecipes'
import Login from './Login'
import Register from './Register'
import AddRecipe from './AddRecipe'
import Profile from './Profile'
import EditRecipe from './EditRecipe';

import './Header.css'

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:8000/api";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/me`)
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/logout`);
    } catch (err) {
      console.error("Erreur déconnexion", err);
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  };

  if (loading) return <div style={{padding: '50px', textAlign: 'center', fontWeight: 'bold', fontFamily: 'Poppins'}}>Chargement...</div>;

  return (
    <Router>
<header className="navbar">
  <Link to="/" className="logo-pill">YOUCOOK</Link>

  <div className="nav-right">
    {!user ? (
      <Link to="/login" className="nav-item">Connexion/Inscription</Link>
    ) : (
      <>
        <Link to="/add-recipe" className="nav-item">Ajouter une recette</Link>
        <Link to="/profile" className="nav-item">Mon profil</Link>
        <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
      </>
    )}
  </div>
</header>

      {}
      <main style={{ padding: '40px' }}>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/category/:id" element={<CategoryRecipes />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/add-recipe" element={user ? <AddRecipe /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        </Routes>
      </main>
    </Router>
  )
}