import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <Link to={`/recipe-preview/${recipe._id}`}>
        <img src={recipe.img_name} alt={recipe.name} />
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
      </Link>
    </div>
  );
}

export default RecipeCard;
