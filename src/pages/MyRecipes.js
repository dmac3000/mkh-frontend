import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CarouselContainer from "../components/CarouselContainer";
import { AuthContext } from "../AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    const message = localStorage.getItem("message");
    if (message) {
      console.log("Message from local storage:", message);
      localStorage.removeItem("message");
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      // If user is not logged in
      navigate("/login", {
        state: { message: "You must be logged in to view your recipes" },
      }); // Navigate to login page
    } else {
      const token = localStorage.getItem("token");
      console.log("Token: ", token);
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/my-recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRecipes(res.data);
          setLoading(false); // Set loading to false after successfully fetching the recipes
        })
        .catch((err) => {
          console.error(err);
          console.error(err.response); 
          setError("Failed to load recipes");
          setLoading(false);
        });
    }
  }, [isLoggedIn, navigate]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipes.length) {
    return (
      <CarouselContainer
        title="My Recipes"
        text={message ? message : ""}
        subtitle={
          <span>
            You have no recipes.{" "}
            <Link to="/create-recipe" className="text-totk-green-light">
              Create one?
            </Link>
          </span>
        }
        items={recipes}
      />
    );
  }

  return (
    <>
      <CarouselContainer
        title="My Recipes"
        text={message ? message : ""}
        subtitle=""
        items={recipes}
      />
    </>
  );
}
