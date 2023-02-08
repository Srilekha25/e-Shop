import React,{useContext} from 'react'
//Import context for Data in DB
import { dataContext } from "../../context/dataProvider";
import Products from '../Products/Products'

const Favorites = () => {
  //Get the data in DB from Context
  const products = useContext(dataContext);

  let favoritedProducts = products.filter((product)=>(
    product.favorited === true
  ))
  return (
    <></>
)}

export default Favorites