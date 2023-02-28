import firebase from "firebase/compat";
import { getDoc, setDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { getIp, ipPublic } from "../ipApi/ipApiConfig";
import { db } from "./mainConfig";


let idUser;
// getIp().then((ip)=>{
//   idUser = ip;
//   console.log(idUser);
// })

// let matchRef = db.collection('users').doc(idUser).collection('games').doc('game');
const matchRef = async () => {
  idUser = await getIp();
  return db.collection('users').doc(idUser).collection('games').doc('game')
}
// let match = {
//   winner: "hola",
//   loser: "aaa",
//   MVP: "aaa",
//   MVPKilss: 4,
// }
// export const saveMatch = async (match) => {
//   try {
//     setDoc(matchRef, match);
//   } catch (error) {
//     console.error("no se cargo la partida")
//   }
// }
let matchData;
// export const findMatch = async () => {
//   try {
//     const matchSnap = await getDoc(matchRef);
//     if (matchSnap.exists()) {
//       console.log("Document data:", matchSnap.data());
//       matchData = matchSnap.data();
//       // console.log(matchTest);
//       return matchSnap.data();
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   } catch (error) {
//     console.error("no se encontro la partida")
//   }
// }
export const saveMatch = async (match) => {
  try {
    setDoc((await matchRef()), match);
  } catch (error) {
    console.error("no se cargo la partida")
  }
};
export const findMatch = async () => {
  try {
    const matchSnap = await getDoc((await matchRef()));
    if (matchSnap.exists()) {
      console.log("Document data:", matchSnap.data());
      matchData = matchSnap.data();
      // console.log(matchTest);
      return matchSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.error("no se encontro la partida")
  }
};
