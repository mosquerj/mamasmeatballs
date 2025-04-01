import React from 'react';
import RecipeCard from '../components/RecipeCard';
import './Browse.css';

function Browse() {
  // Temporary hardcoded data - will be replaced with JSON fetch later
  const recipes = [
    {
      _id: 1,
      img_name: "/pictures/classic.jpg",
      name: "Classic Meatballs",
      description: "Juicy and flavorful classic meatballs"
    },
    {
      _id: 2,
      img_name: "/pictures/spicy.jpg",
      name: "Spicy Meatballs",
      description: "With a kick of chili and garlic"
    },
    {
      _id: 3,
      img_name: "/pictures/veggie.jpg",
      name: "Veggie Meatballs",
      description: "Vegetarian twist on the classic"
    },
    {
      _id: 4,
      img_name: "/pictures/swedish.jpg",
      name: "Swedish Meatballs",
      description: "With creamy gravy and lingonberry"
    },
    {
      _id: 5,
      img_name: "/pictures/bbq.jpg",
      name: "BBQ Meatballs",
      description: "Sweet and tangy BBQ-glazed"
    },
    {
      _id: 6,
      img_name: "/pictures/cheesy.jpg",
      name: "Cheesy Meatballs",
      description: "Stuffed with mozzarella"
    }
  ];

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
