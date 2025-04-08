import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import './Browse.css';

function Browse() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://meatballserver.onrender.com';
    fetch(`${apiUrl}/recipes`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching recipes:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error loading recipes: {error}</p>;

  return (
    <>
      <h2>Browse Recipes</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search for recipes..." />
        <button>Search</button>
      </div>
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

export default Browse;
