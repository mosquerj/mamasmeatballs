import React from 'react';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  // Array of popular recipes using proper image paths
  const popularRecipes = [
    { _id: 1, img_name: "/pictures/classic.jpg", name: "Classic Meatballs", description: "Juicy and flavorful classic meatballs" },
    { _id: 2, img_name: "/pictures/spicy.jpg", name: "Spicy Meatballs", description: "Add a kick to your meal" },
    { _id: 3, img_name: "/pictures/veggie.jpg", name: "Veggie Meatballs", description: "Vegetarian twist on the classic" }
  ];

  // Path for the featured image
  const featuredImageUrl = `${process.env.PUBLIC_URL}/pictures/classic.jpg`;

  return (
    <>
      <div className="about">
        <h2>About Us</h2>
        <p>Welcome to Mama's Meatballs! Enjoy our mouthwatering recipes and experience a taste of home.</p>
      </div>
      
      <div className="featured-recipe">
        <Link to="/recipe">
          <img 
            src={featuredImageUrl} 
            alt="Featured Recipe"
          />
        </Link>
      </div>
      
      <div className="popular-recipes">
        <h2>Popular Recipes</h2>
        <div className="recipe-grid">
          {popularRecipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
