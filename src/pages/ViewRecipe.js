import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const ViewRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Delete response:", response);

      localStorage.setItem("message", "Recipe deleted successfully");
      console.log(
        "message set in localStorage:",
        localStorage.getItem("message")
      );
      navigate("/my-recipes", {
        state: { message: "Recipe deleted successfully." },
      });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setError(err.response.data.message);
      }
    }
  };

  // Don't render anything if the recipe is not loaded yet
  if (!recipe) {
    return null;
  }

  return (
    <div className="mx-auto my-auto text-white w-96 pt-10">
      <div className="bg-black/70 rounded-2xl relative pb-4">
        <div className="flex flex-col items-center justify-start">
          <div className="pt-6 mx-auto py-4 rounded text-white">
            <h1 className="text-4xl font-custom text-center pb-4">
              View Recipe
            </h1>
            {error && <p className="text-red-500 pb-2">{error}</p>}
            <RecipeCard recipe={recipe} />
            <div className="mt-4 flex gap-4 justify-center">
              <button
                className="w-24 px-4 py-2 font-bold text-white bg-totk-green-light rounded hover:bg-totk-green focus:outline-none focus:shadow-outline"
                onClick={() => navigate(`/edit-recipe/${id}`)}
              >
                Edit
              </button>
              <button
                className="w-24 px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-800 focus:outline-none focus:shadow-outline"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;