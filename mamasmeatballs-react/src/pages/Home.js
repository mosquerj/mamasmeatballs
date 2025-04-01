import React from 'react';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const featuredRecipe = {
    _id: 1,
    img_name: "/pictures/classic.jpg",
    name: "Classic Meatballs",
    description: "Juicy and flavorful, these classic meatballs are perfect for pasta or subs."
  };

  const popularRecipes = [
    { _id: 1, img_name: "/pictures/classic.jpg", name: "Classic Meatballs", description: "Juicy and flavorful classic meatballs" },
    { _id: 2, img_name: "/pictures/spicy.jpg", name: "Spicy Meatballs", description: "Add a kick to your meal" },
    { _id: 3, img_name: "/pictures/veggie.jpg", name: "Veggie Meatballs", description: "Vegetarian twist on the classic" }
  ];

  return (
    <>
      <div className="about">
        <h2>About Us</h2>
        <p>Welcome to Mama's Meatballs, your go-to destination for delicious, homemade meatball recipes!</p>
      </div>
      
      <div className="featured-recipe">
        <h2>Check out this featured recipe!</h2>
        <div className="featured-content">
          <Link to="/recipe">
            <img src="/pictures/classic.jpg" alt="Featured Recipe" />
          </Link>
          <p>This week's featured recipe is our <strong>Classic Italian Meatballs</strong>.</p>
        </div>
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
