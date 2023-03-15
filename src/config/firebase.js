// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVs7LFvDQQ2kvCTkxcyRzgtfVgb0FdB7Q",
  authDomain: "e-shop-db-9d473.firebaseapp.com",
  projectId: "e-shop-db-9d473",
  storageBucket: "e-shop-db-9d473.appspot.com",
  messagingSenderId: "755631525912",
  appId: "1:755631525912:web:50a9aa4babc9deefc6b36d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);





// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDjvBCPjVdl7kHmOLH9TgVJOfDaB13NWN4",
//   authDomain: "e-shop-2b71b.firebaseapp.com",
//   projectId: "e-shop-2b71b",
//   storageBucket: "e-shop-2b71b.appspot.com",
//   messagingSenderId: "484259425956",
//   appId: "1:484259425956:web:c07e1a1683551307c00031"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// //Initialize Cloud Firestore and get a reference to the service
// export const db = getFirestore(app);