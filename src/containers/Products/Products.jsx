import React, { useState, useContext } from "react";
import { dataContext } from "../../context/dataProvider";
import { addToCart, updateProductsQuantity } from "../../Data-utils/fetch";
import styles from "./Products.module.scss";

const Products = () => {
  //Get the data in DB from Context
  const products = useContext(dataContext);

  //State to open modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Get id of card when clicked on the screen
  const [idClicked, setIdClicked] = useState(0);

  //Set size from select dropdown
  const [size, setSize] = useState("XS");
  const [indexOfQuantity, setIndexOfQuantity] = useState(0);
  const [toCartDB, setToCartDB] = useState([]);

  // Function to open the modal
  const openModal = (id) => {
    setIsModalOpen(!isModalOpen);
    setIdClicked(id);
  };

  //Get the size and index of size
  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setIndexOfQuantity(event.target.selectedIndex);
  };

  //Getting the product clicked based on the card clicked
  let productClicked = products.filter((product) => {
    return product.id === idClicked;
  });

  const handleQuantity = (quantity) => {
    return quantity[indexOfQuantity]
  };
  
  //Get the heart shape for favorite item
  const favoriteItem = (favoritedItem) => {
    return favoritedItem ? "❤️" : "";
  };

  //Render for different variants
  const renderVariants = (variants) => {
    return variants.map((variant, index) => (
      <option key={index} value={variant}>
        {variant}
      </option>
    ));
  };

  //Sending ID for Cart.jsx
  const handleAddToCart = (name, url, price, quantity, id) => {
    setToCartDB([name, url, price, quantity, size]);
    console.log(
      "sending to addToCart",
      name,
      url,
      price,
      quantity,
      size,
      id,
      indexOfQuantity
    );
    addToCart(name, url, price, quantity, size).then(() => {
      updateProductsQuantity(id, quantity, indexOfQuantity).then((data) => {
        if(data === true){

        }
      });
    });
  };

  return (
    <div>
      {
        <div className={styles.container__products__grid}>
          {products &&
            products.map((product, index) => (
              <div
                key={index}
                className={styles.container__productCards}
                onClick={() => openModal(product.id)}
              >
                <div key={index}>
                  <img
                    className={styles.container__productCard__image}
                    src={product.imageUrl}
                  />
                </div>
                <div>
                  <div>
                    <label className={styles.container__productCard__name}>
                      {product.name}
                    </label>
                  </div>
                  <div className={styles.container__productCard__price}>
                    <p>$ {product.price}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      }

      {productClicked &&
        productClicked.map((product) => (
          <div className={styles.container__modal}>
            <div className={styles.container__modal__body}>
              <div>
                <button
                  className={styles.container__modal__close}
                  onClick={() => openModal()}
                >
                  &times;
                </button>
              </div>
              <div className={styles.container__for__ModalCards}>
                <div>
                  <img
                    className={styles.container__modalCard__image}
                    src={product.imageUrl}
                  />
                </div>
                <div className={styles.container__modalCard__details}>
                  <div>
                    <h2>{product.name}</h2>
                    <p>{favoriteItem(product.favorited)}</p>
                  </div>
                  <p>Size:</p>
                  <select onChange={handleSizeChange}>
                    {renderVariants(product.variants)}
                  </select>
                  <p>{handleQuantity(product.quantity)} in stock!</p>
                  <p>$ {product.price}</p>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.name,
                        product.imageUrl,
                        product.price,
                        product.quantity[indexOfQuantity],
                        product.id
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
