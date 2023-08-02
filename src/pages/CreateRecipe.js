import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ingredientImages } from '../ingredientImages';
import { recipeImages } from '../recipeImages';

const CreateRecipe = () => {
  const [name, setName] = useState('');
  const [effects, setEffects] = useState('');
  const [description, setDescription] = useState(''); 
  const [image, setImage] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([
    { id: '', selectedIngredient: null },
    { id: '', selectedIngredient: null },
    { id: '', selectedIngredient: null },
    { id: '', selectedIngredient: null },
    { id: '', selectedIngredient: null },
  ]);

  useEffect(() => {
    axios.get('http://localhost:3333/api/ingredients')
      .then(res => setIngredientsList(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const ingredientNames = ingredients.map(ingredient => ingredient.selectedIngredient.name);
      const requestBody = {
        name,
        effects,
        description,
        ingredients: ingredientNames,
        imageFilename: image,
      };
      console.log("Request Body: ", requestBody);
      const { data } = await axios.post('http://localhost:3333/api/recipes', requestBody);
  
      console.log('Recipe created successfully', data);
      setTimeout(() => {
      console.log(`Navigating to /view-recipe/${data._id}`);
      navigate(`/view-recipe/${data._id}`);
    }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    const selected = ingredientsList.find(ingredient => ingredient.name === value);
    newIngredients[index] = { id: selected.name, selectedIngredient: selected };
    setIngredients(newIngredients);
  };

  return (
    
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="h-16"></div>
      <div style={{height: "50vh"}} className="w-full bg-black text-white flex flex-col items-center justify-start pt-4">
      <h1 className="text-4xl font-custom">Create New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Recipe Name" required />
        <input type="text" value={effects} onChange={(e) => setEffects(e.target.value)} placeholder="Choose Effects" required />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Recipe Description" required /> 

        <h3>Select Recipe Image</h3>
        <select onChange={(e) => {
          console.log("Selected image: ", e.target.value);
          setImage(e.target.value);
        }} required>
          <option value="">Select an image</option>
          {/* Replace these options with the actual list of available images */}
          {Object.keys(recipeImages).map((recipeName) => (
            <option value={recipeName} key={recipeName}>{recipeName}</option>
          ))}
        </select>
        
        {image && <img className="recipe-image" src={recipeImages[image]} alt={image} />}
        <h3>Select Ingredients</h3>
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
            {ingredient.selectedIngredient && <img className="ingredient-image" src={ingredientImages[ingredient.selectedIngredient.name]}  alt={ingredient.selectedIngredient.name} />}
          </div>
        ))}
        <button type="submit">Create Recipe</button>
      </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
