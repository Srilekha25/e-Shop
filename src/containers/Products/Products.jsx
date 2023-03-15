import React, { useContext } from "react";
import { dataContext } from "../../context/dataProvider";
import styles from "./Products.module.scss";
import { NavLink } from "react-router-dom";

const Products = () => {
  //Get the data in DB from Context
  const { products, setProducts } = useContext(dataContext);

  return (
    <div>
      <h2 className={styles.container__products__title}>Products</h2>
      <div className={styles.container__products__grid}>
        {products &&
          products.map((product) => (
            <div key={product.id} className={styles.container__productCards}>
              <NavLink to={`/productCard/${product.id}`} className={styles.navlink}>
                <img
                  className={styles.container__productCard__image}
                  src={product.imageUrl}
                />
                <div className={styles.container_product_details}>
                  <div>
                    <p>
                      {product.name}
                    </p>
                  </div>
                  <div>
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
