import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCartProductsFromDB,
  deleteById,
  updateCartQuantity,
} from "../../Data-utils/fetch";

import styles from "./Cart.module.scss";

const Cart = () => {
  //State to set products data from DB
  const [cartProducts, setCartProducts] = useState([]);
  //State to get quantity in the cart
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(undefined);

  //Get the Cart products while page mounts
  useEffect(() => {
    getCartProductsFromDB().then((data) => {
      setCartProducts(data);
      const totalPrice = data.reduce(
        (sum, product) => sum + product.price * product.cartQuantity,
        0
      );
      setTotal(totalPrice);
    });
  }, []);

  //Handles increment button
  const handleDecrement = (product) => {
    cartProducts.map((allCartProducts) => {
      if (product.productId === allCartProducts.productId) {
        if (product.cartQuantity > 1) {
          updateCartQuantity(product, "DECREMENET").then((data) => {
            setCartProducts(data);
            const totalPrice = data.reduce(
              (sum, product) => sum + product.price * product.cartQuantity,
              0
            );
            setTotal(total - product.price);
          });
        } else if (product.cartQuantity === 1) {
          alert("are u sure?");
          handleDelete(product.id);
        } else {
          ("");
        }
      }
    });
  };

  //Handles increment button
  const handleIncrement = (product) => {
    cartProducts.map((allCartProducts) => {
      setQuantity(product.quantity);
      if (product.productId === allCartProducts.productId) {
        if (Number(product.cartQuantity) === Number(quantity)) {
          updateCartQuantity(product, "MAX").then((data) => {
            setCartProducts(data);
            const totalPrice = data.reduce(
              (sum, product) => sum + product.price * product.cartQuantity,
              0
            );
            setTotal(total + product.price * (product.cartQuantity - quantity));
          });
        } else if (product.cartQuantity >= 1) {
          updateCartQuantity(product, "INCREMENET").then((data) => {
            setCartProducts(data);
            const totalPrice = data.reduce(
              (sum, product) => sum + product.price * product.cartQuantity,
              0
            );
            setTotal(total + product.price);
          });
        } else {
          ("");
        }
      }
    });
  };

  //Function to handle delete and render the page
  const handleDelete = (id) => {
    deleteById(id).then(() => {
      getCartProductsFromDB().then((data) => {
        setCartProducts(data);
        setTotal(
          total - cartProducts.find((product) => product.id === id).price
        );
      });
    });
  };

  return (
    <div className={styles.container__cart}>
      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map((product, index) => (
            <div className={styles.container__cart__contents} key={index}>
              <div>
                <img
                  className={styles.container__cart__image}
                  src={product.imageUrl}
                />
              </div>
              <div className={styles.container__cart__details}>
                <p>{product.name}</p>
                <p>$ {product.price}</p>
                <p>{product.variants}</p>
                <div className={styles.container__cart__buttons}>
                  <button onClick={() => handleDecrement(product)}>-</button>
                  <p> {product.cartQuantity} </p>
                  <button onClick={() => handleIncrement(product)}>+</button>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {total && (
            <div className={styles.total}>
              Total: ${Math.round(total).toFixed(2)}
            </div>
          )}
        </>
      ) : (
        <div className={styles.container__cart}>
          <h2>Your Cart is Empty.</h2>
          <Link to="/">Start Shopping</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
