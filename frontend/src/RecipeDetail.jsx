import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipes/${id}`)
      .then(res => setRecipe(res.data));
    
    axios.get('http://localhost:8000/api/my-favorites')
      .then(res => {
        const found = res.data.find(fav => fav.id === parseInt(id));
        if (found) setIsFavorite(true);
      }).catch(() => {}); 
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/favorites/toggle/${id}`, 
        {}, 
        { withCredentials: true } 
      );
      setIsFavorite(res.data.isFavorite);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Oups ! Votre session a expiré. Reconnectez-vous pour ajouter des favoris.");
      } else {
        alert("Une erreur est survenue.");
      }
    }
  };

  if (!recipe) return <p style={{padding: '20px'}}>Chargement...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>← Retour</Link>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <h1>{recipe.nomRecette || recipe.nom_recette}</h1>
        <button 
          onClick={toggleFavorite}
          style={{
            fontSize: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: isFavorite ? '#f6ff96ff' : '#f5f5f5',
            transition: 'transform 0.2s'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isFavorite ? 'Plat mis dans vos favoris' : 'Ajouter aux favoris?'}
        </button>
      </div>

      {(recipe.imageUrl || recipe.image_url) && (
        <img src={recipe.imageUrl || recipe.image_url} style={{ width: '100%', borderRadius: '15px' }} alt="recette" />
      )}
      
      <div style={{ marginTop: '20px' }}>
        <p><strong>Description :</strong> {recipe.description}</p>
        <p><strong>Difficulté :</strong> {recipe.difficulte}</p>
        <p><strong>Ingrédients :</strong> {recipe.ingredients}</p>
        <p><strong>Temps de préparation :</strong> {recipe.temps_preparation}</p>
      </div>
    </div>
  );
}