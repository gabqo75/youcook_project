import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    nom_recette: '',
    description: '',
    difficulte: 'Facile',
    temps_preparation: '',
    ingredients: '',
    image_url: '',
    category_id: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/custom/recipes', formData);
      alert("Recette publiée !");
      navigate('/');
    } catch (err) {
      alert("Erreur lors de la publication.");
    }
  };

  return (
    <div className="add-recipe-wrapper">
      <div className="add-recipe-card">
        <h2>Ajouter une recette</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom de la recette</label>
            <input type="text" onChange={e => setFormData({...formData, nom_recette: e.target.value})} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea onChange={e => setFormData({...formData, description: e.target.value})} rows="3"></textarea>
          </div>

          <div className="form-group">
            <label>Catégorie</label>
            <select onChange={e => setFormData({...formData, category_id: e.target.value})} required>
              <option value="">-- Choisir --</option>
              <option value="1">Entrées</option>
              <option value="2">Plats chauds</option>
              <option value="3">Desserts</option>
              <option value="4">Veggie</option>
            </select>
          </div>

          <div className="form-group">
            <label>Difficulté</label>
            <select onChange={e => setFormData({...formData, difficulte: e.target.value})}>
              <option value="Facile">Facile</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          <div className="form-group">
            <label>Temps de préparation</label>
            <input type="text" placeholder="ex: 30 min" onChange={e => setFormData({...formData, temps_preparation: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Ingrédients</label>
            <textarea onChange={e => setFormData({...formData, ingredients: e.target.value})} rows="4" required></textarea>
          </div>

          <div className="form-group">
            <label>Image (URL)</label>
            <input type="text" onChange={e => setFormData({...formData, image_url: e.target.value})} />
          </div>

          <button type="submit" className="btn-publish">Ajouter</button>
        </form>
      </div>
    </div>
  );
}