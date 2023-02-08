// import { collection } from "firebase/firestore";

// const variants = ["XS", "S", "M", "L", "XL", "XXL"];
// const name = ["flowers print", "animal print", "tie&dye"];
// const clothes = ["shirt", "t-shirt", "scarf"];

// const productsArray = [];
// export const newProduct = () => {
//   try {
//     name.forEach(
//       clothes.forEach(
//         productsArray.push({
//           name: `${name} ${clothes}`,
//           quantity: variants.reduce((acc, variant) => {
//             acc[variant] = Math.floor(Math.random() * 100);
//             return acc;
//           }, {}),
//           price: (Math.random() * 100).toFixed(2),
//           variants: variants,
//           imageUrl: "",
//           favorited: true,
//         })
//       )
//     );

//     console.log("productsArray", productsArray);
//     return productsArray;
//   } catch (error) {
//     console.log("error", error.message);
//   }
// };

// export const addProducts = async (productsArray) => {
//     try {
//       const collectionRef = collection(db, "products");
//       for (const product of productsArray) {
//         const productRef = collectionRef.doc();
//         await productRef.set({
//           ...product,
//           id: productRef.id,
//         });
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

// export const getProducts = async () => {

// };
