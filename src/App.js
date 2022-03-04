import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";

//I can push Roc
const App = () => {
  const [newDish, setNewDish] = useState("");
  const [newIngredients, setNewIngredients] = useState("");
  const [newDirections, setNewDirections] = useState("");
  const [newPicture, setNewPicture] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  const getRecipes = () => {
    axios
      .get("https://yourpantry.herokuapp.com/yourpantry")
      .then((response) => {
        setRecipes(response.data);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleNewDishChange = (event) => {
    setNewDish(event.target.value);
  };

  const handleNewIngredientsChange = (event) => {
    setNewIngredients(event.target.value);
  };

  const handleNewDirectionsChange = (event) => {
    setNewDirections(event.target.value);
  };

  const handleNewPictureChange = (event) => {
    setNewPicture(event.target.value);
  };

  const handleNewRecipeFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://yourpantry.herokuapp.com/yourpantry", {
        dish: newDish,
        ingredients: newIngredients,
        directions: newDirections,
        picture: newPicture,
      })
      .then(() => {
        axios
          .get("https://yourpantry.herokuapp.com/yourpantry")
          .then((response) => {
            setRecipes(response.data);
            setNewDish("");
            setNewIngredients("");
            setNewDirections("");
          });
      });
  };

  const handleDelete = (recipeData) => {
    axios
      .delete(`https://yourpantry.herokuapp.com/yourpantry/${recipeData._id}`)
      .then(() => {
        axios
          .get("https://yourpantry.herokuapp.com/yourpantry")
          .then((response) => {
            setRecipes(response.data);
          });
      });
  };

  const handleEdit = (recipeData) => {
    axios
      .put(`https://yourpantry.herokuapp.com/yourpantry/${recipeData._id}`, {
        dish: newDish,
        ingredients: newIngredients,
        directions: newDirections,
        picture: newPicture,
      })
      .then(() => {
        axios
          .get("https://yourpantry.herokuapp.com/yourpantry")
          .then((response) => {
            setRecipes(response.data);
          });
      });
  };

  return (
    <div id="page">
      <div id="op">
        <main>
          <h1>Your Pantry</h1>
          <section>
            <h2>No need to Shop!, Use what's in your fridge and pantry!</h2>
            <br />
            <h4>
              {" "}
              <span>Search</span> by main ingredient(s):{" "}
              <input
                placeholder="Enter Query"
                onChange={(event) => setQuery(event.target.value)}
              />{" "}
            </h4>
            <br />
            <form onSubmit={handleNewRecipeFormSubmit}>
              Dish Name: <input type="text" onChange={handleNewDishChange} />
              <br />
              Ingredients:{" "}
              <input type="text" onChange={handleNewIngredientsChange} />
              <br />
              Directions:{" "}
              <input type="text" onChange={handleNewDirectionsChange} />
              <br />
              {/* Add a photo of the dish (URL):{" "}
              <input type="text" onChange={handleNewPictureChange} />
              <br /> */}
              <input type="submit" class="addRecipe" value="Add to List" />
            </form>
          </section>
          <section>
            <h2>Browse Recipes Below:</h2>
            <ul>
              {recipes
                .filter((recipe) => {
                  if (query === "") {
                    return recipe;
                  } else if (
                    recipe.ingredients
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  ) {
                    return recipe;
                  }
                })
                .map((recipe) => {
                  return (
                    <li key={recipe._id} class="recipeInfo">
                      <h3>{recipe.dish}</h3>
                      <h4>Ingredients: {recipe.ingredients}</h4>
                      <h4>Directions: {recipe.directions}</h4>
                      {/* <img src={recipe.picture} alt="recipePicture" /> */}
                      <h5>
                        {/* <em>
                          To edit this recipe's information, enter the new piece
                          of information in the form at the top of the page and
                          then click this button:{" "}
                        </em> */}
                        <button
                          class="editButton"
                          onClick={(event) => {
                            handleEdit(recipe);
                          }}
                        >
                          Edit Recipe
                        </button>
                      </h5>
                      <button
                        class="removeButton"
                        onClick={(event) => {
                          handleDelete(recipe);
                        }}
                      >
                        Remove Recipe
                      </button>
                    </li>
                  );
                })}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
