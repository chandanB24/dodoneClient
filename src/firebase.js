import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAIQh9ihZKeVsQ0n5lCq-PtzjlO4Bu87Ms",
  authDomain: "dodone-397813.firebaseapp.com",
  projectId: "dodone-397813",
  storageBucket: "dodone-397813.appspot.com",
  messagingSenderId: "494372254103",
  appId: "1:494372254103:web:da47e2b278a63566d554d2",
  measurementId: "G-MCZZZEDK4T"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);