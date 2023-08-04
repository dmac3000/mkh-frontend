import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { recipeImages } from '../recipeImages';
import RecipeCard from '../components/RecipeCard';

const CreateRecipe = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { message: 'You must be logged in to create a recipe' } });
    }
  }, [isLoggedIn, navigate]);

  const [name, setName] = useState('');
  const [effects, setEffects] = useState('');
  const [description, setDescription] = useState(''); 
  const [image, setImage] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [hearts, setHearts] = useState(0);
  const [previewRecipe, setPreviewRecipe] = useState({
    name: '',
    effects: '',
    description: '',
    imageFilename: '',
    ingredients: [],
    hearts: 0, // set initial hearts value
    userId: userId
  });

  const [ingredients, setIngredients] = useState([
    { id: '', selectedIngredient: null },
  ]);

  useEffect(() => {
    axios.get('http://localhost:3333/api/ingredients')
      .then(res => setIngredientsList(res.data))
      .catch(err => console.error(err));
  }, []);

  const [errorMessage, setErrorMessage] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      setErrorMessage("You must be logged in to create a recipe.");
      return;
    }
  
    try {
      const ingredientNames = ingredients.map(ingredient => ingredient.selectedIngredient.name);
      const requestBody = {
        name,
        effects,
        description,
        ingredients: ingredientNames,
        imageFilename: image,
        hearts,
        userId,
      };
      console.log("Request Body: ", requestBody);
      const token = localStorage.getItem('token');  // Get the token from local storage
      const { data } = await axios.post('http://localhost:3333/api/recipes', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
    
      console.log('Recipe created successfully', data);
      setTimeout(() => {
        console.log(`Navigating to /view-recipe/${data._id}`);
        navigate(`/view-recipe/${data._id}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred while creating the recipe.");
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    const selected = ingredientsList.find(ingredient => ingredient.name === value);
    newIngredients[index] = { id: selected.name, selectedIngredient: selected };
    setIngredients(newIngredients);

    // Recipe Preview
    const newPreviewIngredients = newIngredients.filter(ingredient => ingredient.selectedIngredient !== null).map(ingredient => ingredient.selectedIngredient);
    setPreviewRecipe(prev => ({ ...prev, ingredients: newPreviewIngredients, userId: userId }));
  };

  return (
    <div className="mx-auto my-auto text-white sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 pt-6">
      <div className="bg-black/70 rounded-2xl relative pb-6">
        <div className="flex flex-col md:flex-row items-start m-4 justify-start h-3/4 ">
          <div className="flex flex-col items-center justify-start sm:w-full md:max-w-sm mx-auto pt-6 rounded text-white">
           
            <h1 className="text-4xl font-custom pb-4">Create Recipe</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
           
            <form onSubmit={handleSubmit}>
              <h3 className='text-white font-bold py-2'>Recipe Details</h3>
           
              {/* Recipe Name */}
              <div>
                  <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => {
                          setName(e.target.value);
                          setPreviewRecipe(prev => ({ ...prev, name: e.target.value }));
                      }} 
                      placeholder="Name (max 25)" 
                      required 
                      maxLength={25}
                  />
              </div>

              {/* Recipe Description */}
              <div>
                  <input 
                      type="text" 
                      value={description} 
                      onChange={(e) => {
                          setDescription(e.target.value);
                          setPreviewRecipe(prev => ({ ...prev, description: e.target.value }));
                      }} 
                      placeholder="Description (max 75)" 
                      required 
                      maxLength={70} // limit to 75 characters
                  />
              </div>
              
              {/* Recipe Image Selector */}
              <h3 className='text-white font-bold py-2'>Select Recipe Image</h3>
                <select onChange={(e) => {
                  setImage(e.target.value);
                  setPreviewRecipe(prev => ({ ...prev, imageFilename: e.target.value }));
                }} required>
                  <option value="">Select an image</option>
                  {Object.keys(recipeImages).map((recipeName) => (
                    <option value={recipeName} key={recipeName}>{recipeName}</option>
                  ))}
                </select>

              {/* Heart Selector */}
              <h3 className='text-white font-bold py-2'>Hearts</h3>
              <select onChange={(e) => {
                  setHearts(e.target.value === 'Full' ? 20 : Number(e.target.value));
                  setPreviewRecipe(prev => ({ ...prev, hearts: e.target.value === 'Full' ? 20 : Number(e.target.value) }));
              }} required>
                  {[...Array(12).keys()].map(i => {
                      return <option value={i} key={i}>{i}</option>;
                  })}
                  <option value='Full'>Full</option>
              </select>

              {/* Effects Selector */}
              <h3 className='text-white font-bold py-2'>Effects</h3>
              <select onChange={(e) => {
                  setEffects(e.target.value);
                  setPreviewRecipe(prev => ({ ...prev, effects: e.target.value }));
              }} required>
                  <option value="">Select an effect</option>
                  <option value="No special effect">No special effect</option>
                  <option value="Gloom Resist">Gloom Resist</option>
                  <option value="Shock Resist">Shock Resist</option>
                  <option value="Adds Stamina">Adds Stamina</option>
                  <option value="Restores Stamina">Restores Stamina</option>
                  <option value="Fire Resist">Fire Resist</option>
                  <option value="Heat Resist">Heat Resist</option>
                  <option value="Movement Speed Up">Move Speed Up</option>
                  <option value="Attack Up">Attack Up</option>
                  <option value="Stealth Up">Stealth Up</option>
                  <option value="Cold Resist">Cold Resist</option>
                  <option value="Grip Up">Grip Up</option>
                  <option value="Heals Gloom Damage">Heals Gloom Damage</option>
                  <option value="Defence Up">Defence Up</option>
                  <option value="Glow">Glow</option>
                  <option value="Hot Weather Atk Up">Hot Weather Atk Up</option>
                  <option value="Cold Weather Atk Up">Cold Weather Attack Up</option>
                  <option value="Stormy Weather Atk Up">Stormy Weather Attack Up</option>
                  <option value="Swim Speed Up">Swim Speed Up</option>
              </select>


              <h3 className='text-white font-bold py-2'>Select Ingredients</h3>
                {ingredients.map((ingredient, index) => (
                  <div key={index}>
                    <select id={`ingredient${index + 1}`} value={ingredient.id} onChange={(e) => handleIngredientChange(index, e.target.value)} required>
                      <option value="">Select Ingredient #{index + 1}</option>
                      {ingredientsList.map((ingredient) => (
                        <option value={ingredient.name} key={ingredient._id}>
                          {ingredient.name}
                        </option>
                      ))}
                    </select>

      <button onClick={() => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);

        // Update the previewRecipe state
        const newPreviewIngredients = newIngredients.filter(ingredient => ingredient.selectedIngredient !== null).map(ingredient => ingredient.selectedIngredient);
        setPreviewRecipe(prev => ({ ...prev, ingredients: newPreviewIngredients }));
      }}>Remove</button>
    </div>
  ))}

<div className="mt-2 font-bold">
    <button onClick={() => {
      if (ingredients.length < 5) {
        setIngredients(prev => [...prev, { id: '', selectedIngredient: null }])
      } else {
        alert("You can't add more than 5 ingredients");
      }
    }}>
      + Add Ingredient
    </button>
  </div>

  <div>
    <button 
      className="px-4 py-2 mt-6 font-bold text-white bg-totk-green-light rounded hover:bg-totk-green focus:outline-none focus:shadow-outline" 
      type="submit"
    >Create Recipe</button>
  </div>
</form>
          </div>
          <div className="recipe-preview pt-10 lg:pt-28 max-w-sm mx-auto px-5 py-4 rounded text-white">
            <RecipeCard recipe={previewRecipe} />
          </div>

        </div>
      </div>
    </div>
  );
}
export default CreateRecipe;