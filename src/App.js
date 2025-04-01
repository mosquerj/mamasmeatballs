// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Contact from './pages/Contact';
import Recipe from './pages/Recipe';
import Submit from './pages/Submit';
import RecipePreview from './pages/RecipePreview';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/recipe-preview/:id" element={<RecipePreview />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2025 Mama's Meatballs</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
