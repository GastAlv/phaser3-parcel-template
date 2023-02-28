import firebase from "firebase/compat";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { db } from "./mainConfig";

const WinnersRef = collection(db, "winners");

export const saveWinner = async (winner) => {
    try {
        const docRef = await addDoc(collection(db, "winners"), {
            winner: winner,
            winnerId: window.crypto.randomUUID()
        });
        // console.log("Document written with ID: ", docRef.id);
        // console.log("winner: ", winner);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
let arrayWinners = [];
// const docRefWinners = doc(db,"winners","winner")
export const getListWinners = db.collection("winners").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        // console.log(doc.data());
        arrayWinners.push(doc.data())
        // console.log(arrayWinners);
    })
});
// let idUser ="1.1.1";
// console.log(JSON.parse(idUser));
// export const getWinner = async (name) => {
//     let w;
//     try {
//         const data = await getFirestore()
//         const winner =  collection(data, "winners");
//         const q = query(winner, where("winner", "==", "Babaros"));
//         // .collection("winners").where("winner", "==", "Babaros")
//         const snap = await getDocs(q);
//         console.log(snap.forEach(doc => w = doc.data()))
//     } catch (error) {
//         console.log("Error getting documents: ", error);
//     }
//     // db.collection("winners").get().then((snapshot) => {
//     //     snapshot.docs.forEach(doc => {
//     //         // (doc.data().winner === name)?[w = doc.data()]:[null];
//     //         console.log(doc.data());
//     //         // (doc.data().winner === name)?[w = doc.data().winner.toString(),console.log(w)]:[console.log("eroor")];
//     //         // console.log(doc.data().winner.toString() === "Babaros")
//     //         // if (doc.data().winner == name) {
//     //         //     w = doc.data();
//     //         //     return w;
//     //         // }else{
//     //         //     console.error("sa");
//     //         // }

//     //     })
//     // });
//     // return await console.log(w);
// }
let idUser ="1.1.1.1.1";

let  matchRef = db.collection('users').doc(idUser).collection('games').doc('game');
let match = {
  winner:"hola",
  loser:"aaa",
  MVP:"aaa",
  MVPKilss:4,
}
export const saveMatch = async(match)=>{
  try {
    setDoc(matchRef, match);
  } catch (error) {
    console.error("no se cargo la partida")
  }
}
let matchData;
export const findMatch = async(ref)=>{
    try {
        const matchSnap = await getDoc(ref);
        if (matchSnap.exists()) {
            console.log("Document data:", matchSnap.data());
            matchData = matchSnap.data();
            // console.log(matchTest);
            // return matchSnap.data();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");

        }
    } catch (error) {
        console.error("no se encontro la partida")
    }
}

// getListWinners;
// console.log(saveMatch(match));
// findMatch(matchRef);
// setTimeout(()=> console.log(matchData),2000)

// console.log(matchTest.then(res => res));

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

// export const getWinners = async () => {
//     try {
//         const docSnapWinners = await getDoc(docRefWinners);
//         if (docSnapWinners.exists()) {
//             // console.log("Document data:", docSnapWinners.data());
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }


// const subColRef = collection(db, "collection_name", "doc_name", "subcollection_name");

// const docRef = doc(db, "winners");
// const docSnap = await getDocs(collection(db, Winners));

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
/*
matchs(collection){
    matchID(document):(subCollection){
        winner:,
        MVP:,
        MVPKilss:,
    }
    matchID(document):(subCollection){
        winner:,
        MVP:,
        MVPKilss:,
    }
}
*/
// const matchsRef = doc(collection(db, "matchs"));

// // later...
// await setDoc(newCityRef, data);