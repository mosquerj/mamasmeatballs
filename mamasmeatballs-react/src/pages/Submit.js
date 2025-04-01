import React from 'react';
import './Submit.css';

function Submit() {
  return (
    <>
      <h2>Submit a Recipe</h2>
      <p>We'd love to feature your recipe on Mama's Meatballs!</p>
      
      <ul className="guidelines">
        <li>Provide accurate measurements for ingredients</li>
        <li>Include step-by-step instructions</li>
        <li>Add a short description of the recipe</li>
        <li>Ensure the recipe is original or properly credited</li>
      </ul>
      
      <form className="submit-form">
        <label htmlFor="recipe-name">Recipe Name:</label>
        <input type="text" id="recipe-name" name="recipe-name" placeholder="Enter recipe name" required />
        
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea id="ingredients" name="ingredients" placeholder="List ingredients (one per line)" required></textarea>
        
        <label htmlFor="instructions">Instructions:</label>
        <textarea id="instructions" name="instructions" placeholder="Provide step-by-step instructions" required></textarea>
        
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" placeholder="Add a short description"></textarea>
        
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Submit;
