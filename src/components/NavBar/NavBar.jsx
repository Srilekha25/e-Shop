import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div>
      <NavLink to="/" className={styles.container__navbar}>Home</NavLink>
      <NavLink to="/products" className={styles.container__navbar}>Products</NavLink>
      <NavLink to="/favorites" className={styles.container__navbar}>Favorites</NavLink>
      <NavLink to="/cart" className={styles.container__navbar}>Cart</NavLink>
      <NavLink to="/searchBar">
        <input type="text"/>
        <button>Search</button>
      </NavLink>

    </div>
  )
}

export default NavBar