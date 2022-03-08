// import React from 'react' ;
// import {useState, useEffect} from 'react';
// import axios from 'axios';
// import './Popup.css'
//
// const Popup = (props) => {
//   const [recipes, setRecipes] = useState([]);
//   const [setDelete, seeSetDelete] = useState(false)
//   const [seeDeleteButton, setSeeDeleteButton] = useState (0);
//
//   const getRecipes = () => {
//     axios
//       .get('https://yourpantry.herokuapp.com/yourpantry')
//       .then((response) => {
//         setRecipes(response.data);
//     })
//     }
//
//   const handleSeeDelete = (index) => {
//       seeSetDelete(!setDelete);
//       setSeeDeleteButton(index)
//     }
//
//   useEffect(() => {
//     getRecipes()
//   }, [])
//
//   const handleDelete = (recipeData) => {
//     axios
//         .delete(`https://yourpantry.herokuapp.com/yourpantry/${recipeData._id}`
//         ).then(()=> {
//           axios
//             .get('https://yourpantry.herokuapp.com/yourpantry')
//             .then((response) => {
//               setRecipes(response.data);
//           })
//         })
//     }
//
//   return (props.trigger) ? (
//     <div className = "popup">
//       <div className ="popup-inner" >
//         {props.children}
//         <button className = "close-btn" onClick={()=> props.setTrigger(false)}>No, I don't want to delete it.</button>
//         {recipes.map((recipe, index) => {
//           return (
//           <div key={recipe._id} onClick={() =>handleSeeDelete(index)}>
//           {setDelete && seeDeleteButton === index ? (
//             <button className = "removeButton"  onClick = {(event) => {handleDelete(recipe)}}>
//             Yes, I want to delete this recipe.
//             </button>
//           ):null}
//           </div>
//         )
//       })}
//     </div>
//    </div>
//  ) : "";
// }
//
// export default Popup;
