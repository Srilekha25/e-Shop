import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { dataContext } from "../../context/dataProvider";
import styles from "../Products/Products.module.scss";

const Favorites = () => {
  //Get the data in DB from Context
  const { products, setProducts } = useContext(dataContext);

  let favoritedProducts = products.filter((product) => {
    return product.favorited === true;
  });

  return (
    <div>
      <h2 className={styles.container__products__title}>Favorites</h2>
      <div className={styles.container__products__grid}>
        {favoritedProducts &&
          favoritedProducts.map((product) => (
            <div key={product.id} className={styles.container__productCards}>
              <NavLink
                to={`/productCard/${product.id}`}
                className={styles.navlink}
              >
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
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorites;
