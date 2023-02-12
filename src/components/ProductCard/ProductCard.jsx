import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
  addToCart,
  getProducts,
  handleUpdateCart,
  handleUpdateFavorite,
} from "../../Data-utils/fetch";
import { dataContext } from "../../context/dataProvider";
import styles from "./ProductCard.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolideHeart } from "@fortawesome/free-solid-svg-icons";

const ProductCard = () => {
  const productId = useParams();
  const { products, setProducts } = useContext(dataContext);

  //Set size from select dropdown
  const [size, setSize] = useState("XS");
  const [indexOfQuantity, setIndexOfQuantity] = useState(0);
  const [toCartDB, setToCartDB] = useState([]);
  const [itemfavorited, setItemfavorited] = useState(undefined);
  const [quantity, setQuantity] = useState(undefined);
  const [productClicked, setProductClicked] = useState([]);

  //Getting the product clicked based on the card clicked
  useEffect(() => {
    if (products.length > 0) {
      let product = products.filter((product) => {
        return product.id === productId.id;
      });
      setProductClicked(product);
      setItemfavorited(product[0].favorited);
      setQuantity(product[0].quantity);
    }
  }, [products, productId.id]);

  //Get the size and index of size
  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setIndexOfQuantity(event.target.selectedIndex);
  };

  const handleQuantity = (quantity) => {
    return quantity[indexOfQuantity];
  };

  //Get the heart shape for favorite item
  const favoriteItem = (favorited) => {
    return favorited ? (
      <FontAwesomeIcon icon={faSolideHeart} />
    ) : (
      <FontAwesomeIcon icon={faRegularHeart} />
    );
  };

  const handleFavoriteChange = (product) => {
    try {
      handleUpdateFavorite(product).then(() => {
        getProducts().then((data) => {
          setProducts(data);
          favoriteItem(setItemfavorited(!itemfavorited));
        });
      });
    } catch (error) {
      console.log("Something went wrong.", error.message);
    }
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
  const handleAddToCart = (product) => {
    console.log("sending to addToCart", product);
    console.log("sending to addToCart", indexOfQuantity);
    try {
      handleUpdateCart(product, indexOfQuantity).then(() => {
        getProducts().then((data) => {
          setProducts(data);
        });
      });
    } catch (error) {
      console.log("error in add to cart",error.message)
    }
  };

  return (
    <div>
      {productClicked &&
        productClicked.map((product, index) => (
          <div className={styles.container__modal} key={index}>
            <div className={styles.container__modal__body}>
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
                    <p onClick={() => handleFavoriteChange(product)}>
                      {favoriteItem(itemfavorited)}
                    </p>
                  </div>
                  <p>Size:</p>
                  <select onChange={handleSizeChange}>
                    {renderVariants(product.variants)}
                  </select>
                  <p>{handleQuantity(quantity)} in stock!</p>
                  <p>$ {product.price}</p>
                  <button onClick={() => handleAddToCart(product)}>
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

export default ProductCard;
