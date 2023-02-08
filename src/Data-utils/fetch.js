import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

//Get the images for carousel
export const getImagesForCarousel = async () => {
  try {
    const collectionRef = collection(db, "carousel");
    const carasoulImages = await getDocs(collectionRef);
    const data = carasoulImages.docs.map((rawData) => {
      const id = rawData.id;
      const cleanedData = rawData.data();
      return { id, ...cleanedData };
    });
    return data;
  } catch (error) {
    console.log("error message:-", error.message);
  }
};
//Get all the products in DB
export const getProducts = async () => {
  try {
    const collectionRef = collection(db, "products");
    const carasoulImages = await getDocs(collectionRef);
    const data = carasoulImages.docs.map((rawData) => {
      const id = rawData.id;
      const cleanedData = rawData.data();
      return { id, ...cleanedData };
    });
    return data;
  } catch (error) {
    console.log("error message:-", error.message);
  }
};

export const updateProductsQuantity = async (id, quantity, index) => {
  try {
    const collection = collection(db, "products");
  } catch (error) {}
};

//Add products to cart
export const addToCart = async (name, url, price, quantity, size) => {
  const addToCartDB = { name, imageUrl: url, price, quantity, variant: size };
  console.log("adding to cat ->", addToCartDB);
  try {
    const collectionRef = collection(db, "Cart");
    const newDoc = await addDoc(collectionRef, addToCartDB);
    return newDoc.id;
  } catch (error) {
    console.log("error", error.message);
  }
};

//Get products from Cart
export const getCartProductsFromDB = async () => {
  try {
    const collectionRef = collection(db, "Cart");
    const cartProducts = await getDocs(collectionRef);
    const data = cartProducts.docs.map((rawData) => {
      const id = rawData.id;
      const cleanedData = rawData.data();
      return { id, ...cleanedData };
    });
    return data;
  } catch (error) {
    console.log("error message:-", error.message);
  }
};

//Delete products from Cart
export const deleteById = async (id) => {
  console.log("handle delete func", id);
  const docRef = doc(db, "Cart", id);
  try {
    await deleteDoc(docRef).then(() => {
      return true;
    });
  } catch (error) {
    console.log("error", error.message);
  }
};
