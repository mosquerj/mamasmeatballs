import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <Link to={`/recipe-preview/${recipe._id}`}>
        <img 
          src={`${process.env.PUBLIC_URL}/pictures/${recipe.img_name.split('/').pop()}`}
          alt={recipe.name}
          onError={(e) => e.target.style.display = 'none'}
        />
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
      </Link>
    </div>
  );
}

export default RecipeCard;
