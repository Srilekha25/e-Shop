import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../../context/dataProvider";
import { getCartProductsFromDB, deleteById } from "../../Data-utils/fetch";

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
  const handleDecrement = (id) => {
    if (count <= 1) {
      handleDelete(id);
    } else {
      setCount(count - 1);
    }
  };

  //Handles increment button
  const handleIncrement = (id, quantity) => {
      if (count === quantity) {
        setCount(quantity);
      } else {
        setCount(count + 1);
      }
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
              <table>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Delete</th>
                </tr>

                <tr>
                  <td>
                    <img
                      className={styles.container__cart__image}
                      src={product.imageUrl}
                    />
                  </td>
                  <td>
                    <p>{product.name}</p>
                  </td>
                  <td>
                    <p>{product.price}</p>
                  </td>
                  <td>
                    <p>{product.variant}</p>
                  </td>
                  <td>
                    <div className={styles.container__cart__quantity}>
                      <button onClick={() => handleDecrement(product.id)}>
                        -
                      </button>
                      <p> {count} </p>
                      <button onClick={() => handleIncrement(product.id, product.quantity)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              </table>
              <div></div>
            </div>
          ))
        : "Your Cart is Empty. Add items for your Cart!"}
    </div>
  );
};

export default Cart;
