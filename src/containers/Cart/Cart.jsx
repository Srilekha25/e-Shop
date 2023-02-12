import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../../context/dataProvider";
import {
  getCartProductsFromDB,
  deleteById,
  updateCartQuantity,
} from "../../Data-utils/fetch";

import styles from "./Cart.module.scss";

const Cart = () => {
  //Get the data in DB from Context
  const products = useContext(dataContext);

  //State to set products data from DB
  const [cartProducts, setCartProducts] = useState([]);

  //State for increment or decrement quantity of the product
  const [count, setCount] = useState(1);

  //Get the Cart products while page mounts
  useEffect(() => {
    getCartProductsFromDB().then((data) => {
      setCartProducts(data);
    });
  }, []);

  //Handles increment button
  const handleDecrement = (product) => {
    console.log("inside decrement");
    cartProducts.map((allCartProducts) => {
      if (product.productId === allCartProducts.productId) {
        if (product.cartQuantity > 1) {
          updateCartQuantity(product, "DECREMENET").then((data) => {
            setCartProducts(data);
          });
        }else if(product.cartQuantity === 1){
          alert("are u sure?");
          handleDelete(product.id);
        }else{
          ""
        }
      }
    });
  };

  //Handles increment button
  const handleIncrement = (product) => {
    console.log("inside increment");
    // console.log("product", product);
    // console.log(product.productId)
    // console.log(allCartProducts.productId)
    
      setCount(count + 1);
    
  };

  //Function to handle delete and render the page
  const handleDelete = (id) => {
    deleteById(id).then(() => {
      getCartProductsFromDB().then((data) => {
        setCartProducts(data);
      });
    });
  };

  return (
    <div>
      {cartProducts
        ? cartProducts.map((product) => (
            <div className={styles.container__cart__contents}>
              <img
                className={styles.container__cart__image}
                src={product.imageUrl}
              />
              <p>Product Name {product.name}</p>
              <p>Price: {product.price}</p>
              <p>Size: {product.variants}</p>
              <div className={styles.container__cart__quantity}>
                <button onClick={() => handleDecrement(product)}>-</button>
                <p> {product.cartQuantity} </p>
                <button onClick={() => handleIncrement(product)}>+</button>
              </div>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))
        : "Your Cart is Empty. Add items for your Cart!"}
    </div>
  );
};

export default Cart;
