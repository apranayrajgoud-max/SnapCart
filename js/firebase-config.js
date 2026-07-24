// ---------- Firebase Configuration ----------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmL_mjJyq47pBgxo12w0Ml1e1bH32sSYA",
  authDomain: "snap-cart-5a9a8.firebaseapp.com",
  projectId: "snap-cart-5a9a8",
  storageBucket: "snap-cart-5a9a8.firebasestorage.app",
  messagingSenderId: "564293107571",
  appId: "1:564293107571:web:37c0e12665d9296657cf06",
  measurementId: "G-JTCCKB4SS4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };