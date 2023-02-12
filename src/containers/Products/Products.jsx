import React, { useState, useContext, useEffect } from "react";
import { dataContext } from "../../context/dataProvider";
import { getProducts } from "../../Data-utils/fetch";
import styles from "./Products.module.scss";
import { NavLink } from "react-router-dom";

const Products = () => {
  //Get the data in DB from Context
  const {products,setProducts} = useContext(dataContext);

  return (
    <div>
      <div className={styles.container__products__grid}>
        {products &&
          products.map((product) => (
            <div key={product.id} className={styles.container__productCards}>
              <NavLink to={`/productCard/${product.id}`}>
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

export default Products;
