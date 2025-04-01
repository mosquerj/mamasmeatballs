import React from 'react';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const popularRecipes = [
    { _id: 1, img_name: "/pictures/classic.jpg", name: "Classic Meatballs", description: "Juicy and flavorful classic meatballs" },
    { _id: 2, img_name: "/pictures/spicy.jpg", name: "Spicy Meatballs", description: "Add a kick to your meal" },
    { _id: 3, img_name: "/pictures/veggie.jpg", name: "Veggie Meatballs", description: "Vegetarian twist on the classic" }
  ];

  return (
    <>
      <div className="about">
        <h2>About Us</h2>
        <p>Welcome to Mama's Meatballs!</p>
      </div>
      
      <div className="featured-recipe">
        <Link to="/recipe">
          <img 
            src={`${process.env.PUBLIC_URL}/pictures/classic.jpg`} 
            alt="Featured Recipe"
            onError={(e) => e.target.style.display = 'none'}
          />
        </Link>
      </div>
      
      <div className="popular-recipes">
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
