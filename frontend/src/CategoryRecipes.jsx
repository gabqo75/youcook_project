import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function CategoryRecipes() {
  const { id } = useParams(); 
  const [recipes, setRecipes] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories/${id}/recipes`)
      .then(res => {
        setCategoryName(res.data.categoryName);
        setRecipes(res.data.recipes);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{textAlign: 'center', padding: '50px'}}>Chargement...</p>;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
      <Link to="/" style={{ color: '#5CA87E', textDecoration: 'none', fontWeight: 'bold' }}>← Retour</Link>
      
      <h1 style={{ color: '#183424', margin: '30px 0' }}>{categoryName}</h1>
      
      <div className="category-grid">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe.id} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.nomRecette} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />}
              <div style={{ padding: '15px' }}>
                <h4 style={{ margin: '0', color: '#183424' }}>{recipe.nomRecette}</h4>
                <Link to={`/recipe/${recipe.id}`} style={{ display: 'block', marginTop: '10px', color: '#5CA87E', textDecoration: 'none', fontWeight: 'bold' }}>Voir la recette →</Link>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune recette trouvée.</p>
        )}
      </div>
    </div>
  );
}