import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddRecipe.css'; 

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nom_recette: '',
    description: '',
    difficulte: 'Moyenne',
    temps_preparation: '',
    ingredients: '',
    image_url: '',
    category_id: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get(`http://localhost:8000/api/recipes/${id}`)
      .then(res => {
        const r = res.data;
        setFormData({
          nom_recette: r.nomRecette || r.nom_recette || '',
          description: r.description || '',
          difficulte: r.difficulte || 'Moyenne',
          temps_preparation: r.tempsPreparation || r.temps_preparation || '',
          ingredients: r.ingredients || '',
          image_url: r.imageUrl || r.image_url || '',
          category_id: r.category?.id || ''
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors du chargement de la recette", err);
        alert("Impossible de charger la recette.");
        navigate('/profile');
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/custom/recipes/${id}`, formData);
      alert("Recette mise à jour avec succès !");
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <div style={{padding: '50px', textAlign: 'center', color: '#183424'}}>Chargement des données...</div>;

  return (
    <div className="add-recipe-wrapper">
      <div className="add-recipe-card">
        <h2>Modifier ma recette</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom de la recette</label>
            <input 
              type="text" 
              value={formData.nom_recette}
              onChange={e => setFormData({...formData, nom_recette: e.target.value})} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})} 
              rows="3"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Catégorie</label>
            <select 
              value={formData.category_id}
              onChange={e => setFormData({...formData, category_id: e.target.value})} 
              required
            >
              <option value="">-- Choisir --</option>
              <option value="1">Entrées</option>
              <option value="2">Plats chauds</option>
              <option value="3">Desserts</option>
              <option value="4">Veggie</option>
            </select>
          </div>

          <div className="form-group">
            <label>Difficulté</label>
            <select 
              value={formData.difficulte}
              onChange={e => setFormData({...formData, difficulte: e.target.value})}
            >
              <option value="Facile">Facile</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          <div className="form-group">
            <label>Temps de préparation</label>
            <input 
              type="text" 
              value={formData.temps_preparation}
              onChange={e => setFormData({...formData, temps_preparation: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label>Ingrédients</label>
            <textarea 
              value={formData.ingredients}
              onChange={e => setFormData({...formData, ingredients: e.target.value})} 
              rows="5" 
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Image (URL)</label>
            <input 
              type="text" 
              value={formData.image_url}
              onChange={e => setFormData({...formData, image_url: e.target.value})} 
            />
          </div>

          <button type="submit" className="btn-publish">Enregistrer les modifications</button>
          <button 
            type="button" 
            onClick={() => navigate('/profile')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              marginTop: '15px', 
              cursor: 'pointer',
              textDecoration: 'underline',
              width: '100%'
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}