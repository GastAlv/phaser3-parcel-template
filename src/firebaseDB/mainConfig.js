// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { addDoc, collection } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import axios from "axios";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE7KNOELOIQ8Mh-BxdVTiDGphOxjPZzH0",
  authDomain: "fichas-de-honor.firebaseapp.com",
  projectId: "fichas-de-honor",
  storageBucket: "fichas-de-honor.appspot.com",
  messagingSenderId: "116721027177",
  appId: "1:116721027177:web:230c502ad144f6b1793af8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


export  const db = firebase.firestore();
// export const test = async ()=>{

//   try {
//     const docRef = await addDoc(collection(db, "users"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
// fetch("https://api.ipify.org?format=json")
// .then((resp) => {resp.json(), console.log(resp.json);})
// .then(function(getIP) {
//   console.log(getIP);
// })
// .catch(function(error) {
//   console.log(error);
// });
// export const Winner = async ()=>{
//   try {

//   } catch (error) {
    
//   }
// };
