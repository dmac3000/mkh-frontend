import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ingredientImages } from '../ingredientImages';

const CreateRecipe = () => {
  const [name, setName] = useState('');
  const [effects, setEffects] = useState('');
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
      const ingredientIds = ingredients.map(ingredient => ingredient.id);
      const { data } = await axios.post('http://localhost:3333/api/recipes', {
        name,
        effects,
        ingredients: ingredientIds,
        image,
      });

      console.log('Recipe created successfully', data);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    const selected = ingredientsList.find(ingredient => ingredient._id === value);
    newIngredients[index] = { id: value, selectedIngredient: selected };
    setIngredients(newIngredients);
  };

  return (
    <div className="w-full max-w-md px-5 py-4 mx-auto mt-8 bg-white rounded shadow-md">
      <h2 className="mb-4 text-3xl font-bold text-center text-gray-900">Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Recipe Name" required />
        <input type="text" value={effects} onChange={(e) => setEffects(e.target.value)} placeholder="Effects" required />
        <h3>Select Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <select id={`ingredient${index + 1}`} value={ingredient.id} onChange={(e) => handleIngredientChange(index, e.target.value)} required>
              <option value="">Select Ingredient #{index + 1}</option>
              {ingredientsList.map((ingredient) => (
                <option value={ingredient._id} key={ingredient._id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            {ingredient.selectedIngredient && <img className="ingredient-image" src={ingredientImages[ingredient.selectedIngredient.name]}  alt={ingredient.selectedIngredient.name} />}

          </div>
        ))}
        <select onChange={(e) => setImage(e.target.value)} required>
          <option value="">Select an image</option>
          {/* Replace these options with the actual list of available images */}
          <option value="image1.png">Image 1</option>
          <option value="image2.png">Image 2</option>
          <option value="image3.png">Image 3</option>
        </select>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
