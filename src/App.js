import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import CreateRecipe from './pages/CreateRecipe';
import ViewRecipe from './pages/ViewRecipe';
import ViewAllRecipes from './pages/ViewAllRecipes';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className='background-image'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />  
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/view-recipe/:id" element={<ViewRecipe />} />
          <Route path="/view-all/" element={<ViewAllRecipes />} />
          <Route path="/search" element={<SearchResults />} />

        </Routes>
      </div>
      {/* </div> */}
    </Router>
  )
};

export default App;
