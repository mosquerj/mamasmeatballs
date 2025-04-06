import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipePreview.css';

function RecipePreview() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://meatballserver.onrender.com';
    fetch(`${apiUrl}/recipes/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        return response.json();
      })
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching recipe:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div className="recipe-preview">
      <h2>{recipe.name}</h2>
      <img src={recipe.img_name} alt={recipe.name} />
      <p>{recipe.description}</p>
      
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      
      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipePreview;
