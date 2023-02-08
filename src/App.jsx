import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Import Containers for Router
import HomePage from "./containers/Home/HomePage";
import Products from "./containers/Products/Products";
import Favorites from "./containers/Favorites/Favorites";
import Cart from "./containers/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";

//Import Context
import { dataContext } from "./context/dataProvider";
import dataProvider from "./context/dataProvider";
import { cartContext } from "./context/cartProvider";
import cartProvider from "./context/cartProvider";
//Import function to fetch Images from DB
import { getImagesForCarousel, getProducts } from "./Data-utils/fetch";

//Import Styles
import styles from "./App.module.scss";

function App() {
  //State to store the carousel images from DB
  const [carousel, setCarousel] = useState([]);
  //State to store all products from DB
  const [products, setProducts] = useState([]);

  //Call function to Carousel Images from DB
  useEffect(() => {
    try {
      //addProduct();
      getImagesForCarousel().then(
        (data) => {
          setCarousel(data);
        },
        getProducts().then((product) => {
          setProducts(product);
        })
      );
    } catch (error) {
      console.log("error in useEffect app.jsx", error.message);
    }
  }, []);

  // console.log("products", products)
  return (
    <div>
      <dataContext.Provider value={products}>
          <BrowserRouter>
            <div>
              <div className={styles.container__header__flex}>
                <h3 className={styles.container__header__h3}>e-Shop</h3>
                <NavBar />
              </div>
              <Routes>
                <Route path="/" element={<HomePage carousel={carousel} />} />
                <Route path="/products" element={<Products />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/searchBar" element={<SearchBar />} />
              </Routes>
            </div>
          </BrowserRouter>
      </dataContext.Provider>
    </div>
  );
}

export default App;