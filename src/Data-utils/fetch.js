import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
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

//Add products to cart
export const addToCart = async (id, name, url, price, quantity, size) => {
  const addToCartDB = {
    productId: id,
    name,
    imageUrl: url,
    price,
    quantity,
    variants: size,
    cartQuantity: 1,
  };

  try {
    const collectionRef = collection(db, "Cart");
    const newDoc = await addDoc(collectionRef, addToCartDB);
    return newDoc.id;
  } catch (error) {
    console.log("error", error.message);
  }
};

//Update quantity in products Collection
export const handleUpdateCart = async (productToUpdate, index) => {
  // Check if the product with the same size already exists in the cart
  const cartProducts = await getCartProductsFromDB();
  let checkProductExist = cartProducts.filter((product) => {
    return (
      product.productId === productToUpdate.id &&
      String(product.variants) === String(productToUpdate.variants[index])
    );
  });
  console.log("products already in cart", checkProductExist);

  if (checkProductExist.length > 0) {
    console.log("Product already exists in the cart");
    return "Product already exists in the cart";
  }

  // Check if there's enough stock available
  const productRef = doc(db, "products", productToUpdate.id);
  const productData = await getProducts();
  const updatedProduct = productData.filter(
    (productData) => productData.id === productToUpdate.id
  );
  console.log("products in hanlde", updatedProduct);
  console.log("products in quantity=>", updatedProduct[0].quantity[index]);
  if (updatedProduct[0].quantity[index] === 0) {
    console.log("Not enough stock available");
    return "Not enough stock available";
  }

  // Update the quantity in the "products" collection
  let updateQuantity = {};
  updateQuantity[`quantity.${index}`] = updatedProduct[0].quantity[index] - 1;
  await updateDoc(productRef, updateQuantity);

  // Add the product to the cart
  const newDoc = await addToCart(
    productToUpdate.id,
    productToUpdate.name,
    productToUpdate.imageUrl,
    productToUpdate.price,
    productToUpdate.quantity[index] - 1,
    productToUpdate.variants[index]
  );
  return newDoc.id;
};

//Update favorites in products Collection
export const handleUpdateFavorite = async (product) => {
  console.log("in fetch update for favorite", product.id);
  try {
    const collectionRef = doc(db, "products", product.id);
    let updateFavorited = {
      favorited: !product.favorited,
    };
    await updateDoc(collectionRef, updateFavorited);
  } catch (error) {
    console.log("error message in update product", error.message);
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

export const updateCartQuantity = async (product, message) => {
  let updateCart;
  let cartProducts;
  if (message === "DECREMENET") {
    console.log(" product.cartQuantity", product.cartQuantity);
    updateCart = {
      quantity: product.quantity - 1,
      cartQuantity : product.cartQuantity - 1,
    }
  }
  try {
    const collectionRef = doc(db, "Cart",product.id);
    await updateDoc(collectionRef, updateCart).then(()=>{
      cartProducts = getCartProductsFromDB().then((data)=>{
        console.log("data", data)
        return data;
      })
    })
    return cartProducts;
  } catch (error) {
    console.log("error", error.message);
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
