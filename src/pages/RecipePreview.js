import React from 'react';
import { useParams } from 'react-router-dom';
import './RecipePreview.css';

function RecipePreview() {
  const { id } = useParams();
  
  // Temporary data - will be replaced with JSON fetch later
  const recipe = {
    _id: id,
    img_name: "/pictures/classic.jpg",
    name: "Classic Meatballs",
    description: "Juicy and flavorful, these classic meatballs are perfect for pasta or subs.",
    ingredients: [
      "1 lb ground beef",
      "1/2 cup breadcrumbs",
      "1 egg",
      "1/4 cup parsley",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Mix all ingredients in a bowl.",
      "Form into meatballs.",
      "Bake at 375°F for 20 minutes."
    ]
  };

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
