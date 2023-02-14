// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck } from "firebase/app-check";
import { ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTMoWHSKARz1QstuZ3AFcwGd-XWwSAxSU",
  authDomain: "sendr-e4ade.firebaseapp.com",
  projectId: "sendr-e4ade",
  storageBucket: "sendr-e4ade.appspot.com",
  messagingSenderId: "169598791897",
  appId: "1:169598791897:web:bf9a2fdab755f023a20ec8",
  measurementId: "G-GSNQ2TRMCM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

// Initialize database

export const db = getFirestore();

// Get User Data

export function getUserData(user) {
  if (!user) {
    return;
  }
  return setDoc(doc(db, "users", user), {
    email: user,
  });
}

// Collection Reference

export const colRefUsers = collection(db, "users");

// Add documents

export default function addDefault() {
  // Nothing function for default export because everything else was Async
}

// export default function addBook() {
//   const addBookForm = document.querySelector(".add");
//   if (!addBookForm) return;
//   addBookForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     addDoc(colRef, {
//       title: addBookForm.title.value,
//       author: addBookForm.author.value,
//     }).then(() => {
//       addBookForm.reset();
//     });
//   });
// }

// ISS DATA
export async function getIssData() {
  try {
    const response = await fetch("http://api.open-notify.org/iss-now.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
