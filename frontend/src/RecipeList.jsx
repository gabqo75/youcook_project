import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';


const StarterIcon = () => (
<svg width="100px" height="100px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13 7C13 9.41896 11.2822 11.4367 9 11.9V14H12V16H4V14H7V11.9C4.71776 11.4367 3 9.41896 3 7V6.89072C3 6.63062 3.01986 6.3709 3.05941 6.11382L4 0H12L12.9406 6.11382C12.9801 6.3709 13 6.63062 13 6.89072V7ZM5.2543 5H10.7457L10.2842 2H5.71584L5.2543 5Z" fill="#ffffff"></path> </g></svg>);

const MainIcon = () => (
<svg width="100px" height="100px" fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>hot-surface</title> <path d="M14.125 22.094c-2.813-9.375 2.813-9.375 0-18.75h3.75c2.813 9.375-2.813 9.375 0 18.75h-3.75zM1 26.781v1.875h30v-1.875c0-1.875 0-1.875-1.875-1.875 0 0-0.937-1.875-1.875-1.875-1.875 0-1.875 2.813-3.75 2.813s-1.875-2.813-3.75-2.813-1.875 2.813-3.75 2.813-1.875-2.813-3.75-2.813-1.875 2.813-3.75 2.813-1.875-2.813-3.75-2.813c-0.937 0-1.875 1.875-1.875 1.875-1.875 0.001-1.875 0.001-1.875 1.875zM6.625 22.094c-2.813-9.375 2.813-9.375 0-18.75h3.75c2.813 9.375-2.813 9.375 0 18.75h-3.75zM21.625 22.094c-2.813-9.375 2.813-9.375 0-18.75h3.75c2.813 9.375-2.813 9.375 0 18.75h-3.75z"></path> </g></svg>
);

const DessertIcon = () => (
<svg width="100px" height="100px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M128 416v-48a144 144 0 0 1 168.64-141.888 224.128 224.128 0 0 1 430.72 0A144 144 0 0 1 896 368v48a384 384 0 0 1-352 382.72V896h-64v-97.28A384 384 0 0 1 128 416zm287.104-32.064h193.792a143.808 143.808 0 0 1 58.88-132.736 160.064 160.064 0 0 0-311.552 0 143.808 143.808 0 0 1 58.88 132.8zm-72.896 0a72 72 0 1 0-140.48 0h140.48zm339.584 0h140.416a72 72 0 1 0-140.48 0zM512 736a320 320 0 0 0 318.4-288.064H193.6A320 320 0 0 0 512 736zM384 896.064h256a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64z"></path></g></svg>
);

const VeggieIcon = () => (
<svg fill="#ffffff" height="100px" width="100px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 213.306 213.306" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M182.082,127.001c10.919,0,20.918-5.973,26.096-15.587l4.231-7.857c1.251-2.324,1.189-5.135-0.165-7.401 c-1.354-2.267-3.799-3.654-6.439-3.654h-24.604c-6.012,0-11.8,1.861-16.646,5.149V86.049h17.527 c10.919,0,20.918-5.973,26.096-15.587l4.231-7.857c1.251-2.324,1.189-5.135-0.165-7.401c-1.354-2.267-3.799-3.654-6.439-3.654 h-24.604c-2.414,0-4.789,0.311-7.086,0.882c2.801-4.364,4.773-9.978,4.773-17.007c0-21.071-17.116-32.061-17.845-32.518 c-2.438-1.531-5.538-1.531-7.977,0c-0.729,0.458-17.845,11.447-17.845,32.518c0,7.029,1.972,12.643,4.773,17.006 c-2.296-0.57-4.671-0.881-7.085-0.881h-24.604c-2.64,0-5.085,1.388-6.439,3.654c-1.354,2.266-1.416,5.077-0.165,7.401l4.231,7.857 c5.176,9.614,15.176,15.587,26.096,15.587h17.527V97.65c-4.846-3.288-10.633-5.149-16.646-5.149h-24.604 c-2.64,0-5.085,1.388-6.439,3.654c-1.354,2.266-1.416,5.077-0.165,7.401l4.231,7.857c5.176,9.614,15.176,15.587,26.096,15.587 h17.527v12.286c-4.846-3.288-10.634-5.149-16.646-5.149h-24.604c-2.64,0-5.085,1.388-6.439,3.654 c-1.354,2.266-1.416,5.077-0.165,7.401l4.231,7.857c5.176,9.614,15.176,15.587,26.096,15.587h17.527v35.411 c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-35.411h17.527c10.919,0,20.918-5.973,26.096-15.587l4.231-7.857 c1.251-2.324,1.189-5.135-0.165-7.401c-1.354-2.267-3.799-3.654-6.439-3.654h-24.604c-6.012,0-11.8,1.86-16.646,5.148v-12.285 H182.082z"></path> <path d="M66.9,132.183c9.33,0,17.874-5.103,22.297-13.318l3.406-6.326c1.251-2.324,1.189-5.135-0.165-7.402 c-1.354-2.266-3.799-3.654-6.439-3.654H66.19c-0.987,0-1.965,0.068-2.933,0.182c1.54-3.24,2.533-7.118,2.533-11.704 c0-17.764-14.437-27.033-15.052-27.419c-2.438-1.531-5.538-1.531-7.977,0c-0.615,0.386-15.052,9.655-15.052,27.419 c0,4.585,0.992,8.464,2.533,11.704c-0.968-0.114-1.946-0.182-2.933-0.182H7.5c-2.64,0-5.085,1.388-6.439,3.654 c-1.354,2.267-1.416,5.078-0.165,7.402l3.406,6.326c4.423,8.215,12.967,13.318,22.297,13.318h12.65v11.218 c-3.625-1.942-7.717-3.023-11.94-3.023H7.5c-2.64,0-5.085,1.388-6.439,3.654c-1.354,2.267-1.416,5.078-0.165,7.402l3.406,6.326 c4.424,8.215,12.967,13.318,22.297,13.318h12.65v32.971c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-32.971H66.9 c9.33,0,17.874-5.103,22.297-13.318l3.406-6.326c1.251-2.324,1.189-5.135-0.165-7.402c-1.354-2.266-3.799-3.654-6.439-3.654H66.19 c-4.224,0-8.315,1.081-11.94,3.023v-11.218H66.9z"></path> </g> </g></svg>
);

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 1, name: 'Entrées', icon: <StarterIcon /> },
    { id: 2, name: 'Plats chauds', icon: <MainIcon /> },
    { id: 3, name: 'Desserts', icon: <DessertIcon /> },
    { id: 4, name: 'Veggie', icon: <VeggieIcon /> },
  ];

  useEffect(() => {
    axios.get('http://localhost:8000/api/recipes')
      .then(res => {
        const data = res.data['hydra:member'] || res.data['member'] || res.data;
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des recettes", err);
        setLoading(false);
      });
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    (recipe.nomRecette || recipe.nom_recette).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>Cherchez ce que vous allez mangez ce soir !</h1>
        <div className="search-wrapper">
          <input 
            type="text" 
            placeholder="Rechercher une recette..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {!searchTerm && (
        <>
          <h2 className="section-title">Une catégorie préférée ?</h2>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.id}`} className="category-card">
                <h3>{cat.name}</h3>
                {}
                {cat.icon}
              </Link>
            ))}
          </div>
        </>
      )}

      <h2 className="section-title" style={{ marginTop: '60px' }}>
        {searchTerm ? `Résultats pour "${searchTerm}"` : "Découvrir toutes les recettes"}
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>Chargement des gourmandises...</p>
      ) : (
        <div className="all-recipes-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-main-card">
                <div className="recipe-img-container">
                  {recipe.imageUrl || recipe.image_url ? (
                    <img src={recipe.imageUrl || recipe.image_url} alt={recipe.nomRecette} />
                  ) : null}
                </div>
                <div className="recipe-card-content">
                  <h4>{recipe.nomRecette || recipe.nom_recette}</h4>
                  <div className="recipe-card-meta">
                    <span>{recipe.difficulte}</span>
                    <span>{recipe.tempsPreparation || recipe.temps_preparation}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Aucune recette ne correspond à votre recherche.</p>
          )}
        </div>
      )}
    </div>
  );
}