import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [myRecipes, setMyRecipes] = useState([]);
  const [myFavorites, setMyFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesRes, favoritesRes] = await Promise.all([
          axios.get('http://localhost:8000/api/my-recipes'),
          axios.get('http://localhost:8000/api/my-favorites')
        ]);
        setMyRecipes(recipesRes.data);
        setMyFavorites(favoritesRes.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ?")) {
      try {
        await axios.delete(`http://localhost:8000/api/custom/recipes/${id}`);
        setMyRecipes(myRecipes.filter(r => r.id !== id));
      } catch (err) { alert("Erreur"); }
    }
  };

  if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Chargement...</div>;

  return (
    <div className="profile-container">
      <h1>Mon Espace</h1>
      
      {}
      <section>
        <h2>Mes créations</h2>
        <div className="simple-list">
          {myRecipes.length > 0 ? myRecipes.map(recipe => (
            <div key={recipe.id} className="simple-item">
              <span className="item-name">{recipe.nomRecette}</span>
              <div className="item-actions">
                <Link to={`/recipe/${recipe.id}`} className="action-link">Voir</Link>
                <Link to={`/edit-recipe/${recipe.id}`} className="action-link" style={{color: '#333'}}>Modifier</Link>
                <button onClick={() => handleDelete(recipe.id)} className="delete-link">Supprimer</button>
              </div>
            </div>
          )) : <p>Aucune recette créée.</p>}
        </div>
      </section>

      {}
      <section>
        <h2>Mes favoris</h2>
        <div className="simple-list">
          {myFavorites.length > 0 ? myFavorites.map(fav => (
            <div key={fav.id} className="simple-item">
              <span className="item-name">{fav.nomRecette}</span>
              <Link to={`/recipe/${fav.id}`} className="action-link">Voir →</Link>
            </div>
          )) : <p>Aucun favori.</p>}
        </div>
      </section>
    </div>
  );
}