import React, { useContext } from "react";
//Import context for Data in DB
import { dataContext } from "../../context/dataProvider";
import styles from "../Products/Products.module.scss";

import Products from "../Products/Products";

const Favorites = () => {
  //Get the data in DB from Context
  const { products, setProducts } = useContext(dataContext);

  let favoritedProducts = products.filter((product) => {
    console.log("inside favorited products");
    return product.favorited === true;
  });

  console.log("favoritedProducts", favoritedProducts);
  return (
    <div className={styles.container__products__grid}>
      {favoritedProducts &&
        favoritedProducts.map((product) => (
          <div key={product.id} className={styles.container__productCards}>
            <img
              className={styles.container__productCard__image}
              src={product.imageUrl}
            />
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
  );
};

export default Favorites;
