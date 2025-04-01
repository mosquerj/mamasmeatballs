import React from 'react';
import './Recipe.css';

function Recipe() {
  return (
    <div className="recipe-of-the-day">
      <h2>Recipe of the Day!</h2>
      <img src="/pictures/classic.jpg" alt="Classic Meatballs" />
      <h3>Classic Italian Meatballs</h3>
      <p>These classic Italian meatballs are tender, flavorful, and perfect for any occasion.</p>
      
      <h4>Ingredients</h4>
      <ul>
        <li>1 lb ground beef</li>
        <li>1/2 cup breadcrumbs</li>
        <li>1 egg</li>
        <li>1/4 cup parsley</li>
        <li>Salt and pepper to taste</li>
      </ul>
      
      <h4>Instructions</h4>
      <ol>
        <li>Mix all ingredients in a bowl.</li>
        <li>Form into meatballs.</li>
        <li>Bake at 375°F for 20 minutes.</li>
      </ol>
    </div>
  );
}

export default Recipe;
