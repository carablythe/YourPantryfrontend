import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';

const App = () => {

  const [newDish, setNewDish] = useState('');
  const [newIngredients, setNewIngredients] = useState('');
  const [newDirections, setNewDirections] = useState('');
  const [newURL, setNewURL] = useState('');
  const [newPicture, setNewPicture] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("")
  const [show, setShow] = useState(false);
  const [seeRecipes, setSeeRecipes] = useState (0);
  const [setDelete, seeSetDelete] = useState(false)
  const [seeDeleteButton, setSeeDeleteButton] = useState (0);

  // const [sortAlpha, setSortAlpha] = useState(null);


  const getRecipes = () => {
  axios
    .get('https://yourpantry.herokuapp.com/yourpantry')
    .then((response) => {
      setRecipes(response.data)
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

  const handleShow = (index) => {
    setShow(!show);
    setSeeRecipes(index)
  }

  const gonnaShow = () => {
   setShow(true);
  };

  const notGonnaShow = () => {
   setShow(false);
  };

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
          setNewDish("");
          setNewIngredients("");
          setNewDirections("");
          setNewURL("");
          setNewPicture("");
      })
    })
  }

      const handleEditDish = (recipeData) => {
        axios
            .put(`https://yourpantry.herokuapp.com/yourpantry/${recipeData._id}`,
              {
                dish: newDish
              }
            ).then(()=> {
              axios
                .get('https://yourpantry.herokuapp.com/yourpantry')
                .then((response) => {
                  setRecipes(response.data);
              })
            })
        }

        const handleEditIngredients = (recipeData) => {
          axios
              .put(`https://yourpantry.herokuapp.com/yourpantry/${recipeData._id}`,
                {
                  ingredients: newIngredients
                }
              ).then(()=> {
                axios
                  .get('https://yourpantry.herokuapp.com/yourpantry')
                  .then((response) => {
                    setRecipes(response.data);
                })
              })
          }

          const handleEditDirections = (recipeData) => {
            axios
                .put(`https://yourpantry.herokuapp.com/yourpantry/${recipeData._id}`,
                  {
                    directions: newDirections
                  }
                ).then(()=> {
                  axios
                    .get('https://yourpantry.herokuapp.com/yourpantry')
                    .then((response) => {
                      setRecipes(response.data);
                  })
                })
            }

            const handleEditURL = (recipeData) => {
              axios
                  .put(`https://yourpantry.herokuapp.com/yourpantry/${recipeData._id}`,
                    {
                      recipeURL: newURL
                    }
                  ).then(()=> {
                    axios
                      .get('https://yourpantry.herokuapp.com/yourpantry')
                      .then((response) => {
                        setRecipes(response.data);
                    })
                  })
              }

              const handleEditPicture = (recipeData) => {
                axios
                    .put(`https://yourpantry.herokuapp.com/yourpantry/${recipeData._id}`,
                      {
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

  const handleSeeDelete = (index) => {
            seeSetDelete(!setDelete);
            setSeeDeleteButton(index)
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


  return (
   <div className="page">
    <div className="op">
     <main>
      <h1>Your Pantry</h1>
      <section>
        <h2>No need to Shop!</h2>
        <h3>Use what's in your fridge and pantry!</h3>
        <br/>
        <h4>Search by main ingredient:
          <input placeholder="Enter Query" className="searchBar"
          onChange={event => setQuery(event.target.value)} />
        </h4>
        <br/>
        <h2>Got a Recipe to Share?</h2>
        <form className= "addRecipeForm"
          onSubmit = {handleNewRecipeFormSubmit} >
          Dish/Recipe Name:
          <input type ="text" className= "inputRecipeName" onChange={handleNewDishChange} value={newDish} />
          <br/>
          Main Ingredients (separated by commas):
          <input type ="text" className= "inputRecipe" onChange={handleNewIngredientsChange} value={newIngredients} />
          <br/>
          Directions/Preparation Method (optional):
          <input type ="text" className= "inputRecipe" onChange={handleNewDirectionsChange} value={newDirections} />
          <br/>
          Or instead of directions, add a recipe link(URL):
          <input type ="text" className= "inputRecipe" onChange={handleNewURLChange}
          value={newURL} />
          <br/>
          Add a photo(image URL) of the dish (optional):
          <input type ="text" className= "inputRecipe"  onChange={handleNewPictureChange} value={newPicture} /><br/>
          <input type="submit" className ="addRecipe" value="Add Recipe to Collection"/>
        </form>
      </section>
      <section>
        <h2>Browse Recipes Below:</h2>
        <ul>
          {recipes.filter((recipe) => {
            if (recipe.ingredients.includes(query)) {
              return recipe;
            } else if (
              recipe.ingredients.toLowerCase().includes(query.toLowerCase())
            ){
              return recipe;
            }
          })
          .map((recipe, index) => {
            return (
              <div className="recipeInfo" >
                 <li key={recipe._id} >
                    <div className ="recipeCardButton" onClick={() => handleShow(index)}><h3>{recipe.dish}</h3></div>

                        {show && seeRecipes === index ? (
                        <div className ="hidden">
                        <div onClick={notGonnaShow} className="X">
                               X
                        </div>
                          <h5>Ingredients: {recipe.ingredients}</h5>
                          <h5><a href= {recipe.recipeURL} target="_blank">
                            Directions: (click for recipe if no directions appear) {recipe.directions}</a>
                          </h5>
                          <img src= {recipe.picture} class="recipeImage"/>
                          <h5>
                            <em>You can edit this recipe below:</em>
                          </h5>
                          <form className= "editRecipeForm"
                            onSubmit = {handleNewRecipeFormSubmit}>
                          Dish/Recipe Name:
                          <input type ="text" className="editRecipeInput"
                            defaultValue = {recipe.dish}
                            onChange= {handleNewDishChange}/>
                          <button className = "editButton"
                            onClick = { (event) => {handleEditDish(recipe)} }>
                            Update
                          </button>
                          <br/>
                          Main Ingredients:
                          <input type ="text" className= "editRecipeInput"
                              defaultValue = {recipe.ingredients} onChange={handleNewIngredientsChange}/>
                          <button className = "editButton"
                            onClick = {(event)=> {handleEditIngredients(recipe)}}>
                            Update
                          </button>
                          <br/>
                          Directions/Preparation: <input type ="text"
                            className= "editRecipeInput"
                            defaultValue = {recipe.directions}  onChange={handleNewDirectionsChange}/>
                          <button className = "editButton"
                           onClick = {(event)=> {handleEditDirections(recipe)}}>
                            Update
                          </button>
                          <br/>
                          Recipe link (URL):
                          <input type ="text" className= "editRecipeInput"
                            defaultValue = {recipe.recipeURL}   onChange={handleNewURLChange} />
                          <button className = "editButton"
                            onClick = { (event) => {handleEditURL(recipe)} }>
                            Update
                          </button>
                          <br/>
                          Photo(URL) of the Dish:
                          <input type ="text" className= "editRecipeInput"
                            defaultValue = {recipe.picture}  onChange={handleNewPictureChange} />
                          <button className = "editButton"
                            onClick = { (event) => {handleEditPicture(recipe)} }>Update
                          </button>
                          <br/>
                          </form>
                          <button class = "removeButton" onClick={() => handleSeeDelete(index)}
                           >
                            Remove Recipe from Directory
                          </button>
                          {setDelete && seeDeleteButton === index ? (
                          <button class = "removeButton" onClick = {(event) => handleDelete(recipe)}>
                          <h2>Confirm Delete of this Recipe</h2>
                          </button>
                          ): null}
                        </div>
                      ): null}
                  </li>
                </div>
              )})
            }
          </ul>
        </section>
      </main>
    </div>
  </div>
);
}




export default App;
