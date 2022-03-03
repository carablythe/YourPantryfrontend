import logo from './logo.svg';
import './App.css';

import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {

  const [newDish, setNewDish] = useState('');
  const [newIngredients, setNewIngredients] = useState('');
  const [newDirections, setNewDirections] = useState('');
  const [newURL, setNewURL] = useState('');
  const [newPicture, setNewPicture] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("")

  const getRecipes = () => {
  axios
    .get('https://yourpantry.herokuapp.com/yourpantry')
    .then((response) => {
      setRecipes(response.data);
  })
  }

  useEffect(() => {
    getRecipes()
  }, [])

  const handleNewDishChange = (event) => {
    setNewDish(event.target.value)
  }

  const handleNewIngredientsChange = (event) => {
    setNewIngredients(event.target.value)
  }

  const handleNewDirectionsChange = (event) => {
    setNewDirections(event.target.value)
  }

  const handleNewURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const handleNewPictureChange = (event) => {
    setNewPicture(event.target.value)
  }


  const handleNewRecipeFormSubmit = (event) => {
    event.preventDefault();
    axios.post(
      'https://yourpantry.herokuapp.com/yourpantry',
      {
        dish: newDish,
        ingredients: newIngredients,
        directions: newDirections,
        recipeURL: newURL,
        picture: newPicture

      }
    ).then(()=> {
      axios
        .get('https://yourpantry.herokuapp.com/yourpantry')
        .then((response) => {
          setRecipes(response.data);
      })
    })
  }

  const handleDelete = (recipeData) => {
    axios
        .delete(`https://yourpantry.herokuapp.com/yourpantry/${recipeData._id}`
        ).then(()=> {
          axios
            .get('https://yourpantry.herokuapp.com/yourpantry')
            .then((response) => {
              setRecipes(response.data);
          })
        })
    }


    const handleEdit = (recipeData) => {
      axios
          .put(`https://yourpantry.herokuapp.com/yourpantry/${recipeData._id}`,
            {
              dish: newDish,
              ingredients: newIngredients,
              directions: newDirections,
              recipeURL: newURL,
              picture: newPicture
            }
          ).then(()=> {
            axios
              .get('https://yourpantry.herokuapp.com/yourpantry')
              .then((response) => {
                setRecipes(response.data);
            })
          })
      }

  return (
    <main>
      <h1>Your Pantry</h1>
      <section>
        <h2>No need to Shop!</h2>
        <h3>Use what's in your fridge and pantry!</h3>
        <br/>
        <h4> Search by ingredient(s): <input placeholder="Enter Query" onChange={event => setQuery(event.target.value)} /> </h4>
        <br/>
        <h2>Got a Recipe to Share? Please Add it Here:</h2>
        <form onSubmit = {handleNewRecipeFormSubmit}>
        Dish/Recipe Name: <input type ="text" onChange={handleNewDishChange}/><br/>
        Main Ingredients (separated by commas): <input type ="text" onChange={handleNewIngredientsChange}/><br/>
        Directions/Preparation Method (optional): <input type ="text" onChange={handleNewDirectionsChange}/><br/>
        Or instead of directions, add a link(URL) to the recipe: <input type ="text" onChange={handleNewURLChange}/><br/>
        Add a photo(image URL) of the dish (optional): <input type ="text" onChange={handleNewPictureChange}/><br/>
        <input type="submit" class ="addRecipe" value="Add to List"/>
        </form>
      </section>
      <section>
      <h2>Browse Recipes "Your Pantry" Collection Below:</h2>
      <ul>
      {recipes.filter(recipe => {
                if (query === '') {
                  return recipe;
                } else if (recipe.ingredients.toLowerCase().includes(query.toLowerCase())) {
                  return recipe;
                }
              }).map((recipe) =>{
          return <li key={recipe._id} class = "recipeInfo">
            <h3>{recipe.dish}</h3>
            <h4>Ingredients: {recipe.ingredients}</h4>
            <h4>Directions: {recipe.directions}</h4>
            <h4>URL:{recipe.recipeURL}</h4>
            <img src= {recipe.picture}/>
          <h5><em>To edit this recipe's information, enter the new piece of information in the form at the top of the page and then click this button: </em><button class = "editButton" onClick = { (event) => { handleEdit(recipe) } }>Approve Changes to this Recipe's Information</button></h5>
          <button class = "removeButton" onClick = { (event) => { handleDelete(recipe)} }>Remove Recipe Above from Directory</button>
          </li>
        })
      }
      </ul>
      </section>
    </main>
  );
}


export default App;
