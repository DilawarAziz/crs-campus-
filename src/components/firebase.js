import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD03RV8CtFkTbJNJcJ3jzHbDZAXUBwFKO0",
  authDomain: "campus-f5460.firebaseapp.com",
  projectId: "campus-f5460",
  storageBucket: "campus-f5460.appspot.com",
  messagingSenderId: "610266476200",
  appId: "1:610266476200:web:27d9682383aaac0c0b9c9d",
  measurementId: "G-BW72V945T6"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default app
export {storage}



