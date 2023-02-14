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

  //Get the heart shape for favorite item
  const favoriteItem = (favorited) => {
    return favorited ? (
      <FontAwesomeIcon icon={faSolideHeart} />
    ) : (
      <FontAwesomeIcon icon={faRegularHeart} />
    );
  };
  //Handle Favorite Change
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
    try {
      handleUpdateCart(product, indexOfQuantity).then(() => {
        getProducts().then((data) => {
          setProducts(data);
        });
      });
    } catch (error) {
      console.log("error in add to cart", error.message);
    }
  };

  return (
    <div>
      {productClicked &&
        productClicked.map((product, index) => (
          <div className={styles.container__productCard} key={index}>
            <div className={styles.container__productCard__body}>
              <div className={styles.container__productCard__Cards}>
                <div>
                  <img
                    className={styles.container__productCard__image}
                    src={product.imageUrl}
                  />
                </div>
                <div className={styles.container__modalCard__details}>
                  <div className={styles.product__name}>
                    <h2>{product.name}</h2>
                    <p
                    className={styles.product__favorite}
                    onClick={() => handleFavoriteChange(product)}
                  >
                    {favoriteItem(itemfavorited)}
                  </p>
                    <p>$ {product.price}</p>
                  </div>
                  <div className={styles.product__variants}>
                    <p>Size:</p>
                    <select onChange={handleSizeChange}>
                      {renderVariants(product.variants)}
                    </select>
                  </div>
                  <p>{product.quantity[indexOfQuantity]} in stock!</p>

                  <button
                    className={styles.button_addToCart}
                    onClick={() => handleAddToCart(product)}
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

export default ProductCard;
