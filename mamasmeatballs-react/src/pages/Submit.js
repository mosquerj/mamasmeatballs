import React, { useState, useEffect } from 'react';
import './Submit.css';

function Submit() {
  // State for form fields
  const [imgName, setImgName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  
  // States for form feedback and recipe list
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [recipes, setRecipes] = useState([]);

  // Fetch current recipes when component mounts
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://meatballserver.onrender.com';
    fetch(`${apiUrl}/recipes`)
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  // Basic client-side validation matching server Joi validation
  const validateForm = () => {
    if (imgName.trim().length < 3) return 'Image name must be at least 3 characters.';
    if (name.trim().length < 3) return 'Recipe name must be at least 3 characters.';
    if (description.trim().length < 5) return 'Description must be at least 5 characters.';
    if (ingredients.trim() === '') return 'Ingredients field cannot be empty.';
    if (instructions.trim() === '') return 'Instructions field cannot be empty.';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitSuccess('');
    setSubmitError('');

    // Validate form client-side
    const errorMessage = validateForm();
    if (errorMessage) {
      setSubmitError(errorMessage);
      return;
    }

    // Prepare data: Split ingredients/instructions by newlines into arrays
    const newRecipe = {
      img_name: imgName.trim(),
      name: name.trim(),
      description: description.trim(),
      ingredients: ingredients.split('\n').map(item => item.trim()).filter(item => item !== ''),
      instructions: instructions.split('\n').map(item => item.trim()).filter(item => item !== '')
    };

    const apiUrl = process.env.REACT_APP_API_URL || 'https://meatballserver.onrender.com';
    fetch(`${apiUrl}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.error || 'Failed to add recipe') });
        }
        return response.json();
      })
      .then(data => {
        setSubmitSuccess('Recipe added successfully!');
        // Clear the form
        setImgName('');
        setName('');
        setDescription('');
        setIngredients('');
        setInstructions('');
        // Update local recipe list (so the new data is immediately visible)
        setRecipes(prevRecipes => [...prevRecipes, data.recipe]);
      })
      .catch(err => {
        setSubmitError(err.message);
      });
  };

  return (
    <div className="submit-container">
      <h2>Submit a Recipe</h2>
      <p>We'd love to feature your recipe on Mama's Meatballs!</p>
      {submitSuccess && <p className="success-message">{submitSuccess}</p>}
      {submitError && <p className="error-message">{submitError}</p>}

      <form className="submit-form" onSubmit={handleSubmit}>
        <label htmlFor="img-name">Image Name:</label>
        <input 
          type="text" 
          id="img-name" 
          name="img-name" 
          placeholder="e.g., classic.jpg" 
          value={imgName}
          onChange={e => setImgName(e.target.value)}
          required
        />

        <label htmlFor="recipe-name">Recipe Name:</label>
        <input 
          type="text" 
          id="recipe-name" 
          name="recipe-name" 
          placeholder="Enter recipe name" 
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea 
          id="description" 
          name="description" 
          placeholder="Add a short description" 
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="ingredients">Ingredients (one per line):</label>
        <textarea 
          id="ingredients" 
          name="ingredients" 
          placeholder="List ingredients"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          required
        ></textarea>

        <label htmlFor="instructions">Instructions (one per line):</label>
        <textarea 
          id="instructions" 
          name="instructions" 
          placeholder="Provide step-by-step instructions"
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      {/* Optional: Display the updated list of recipes */}
      <div className="recipes-list">
        <h3>Current Recipes</h3>
        <ul>
          {recipes.map(recipe => (
            <li key={recipe._id}>
              <strong>{recipe.name}</strong> - {recipe.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Submit;
