import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// ---------- DOM References ----------
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authError = document.getElementById('auth-error');
const submitBtn = document.getElementById('auth-submit-btn');

let mode = 'login'; // or 'signup'

// ---------- Tab Switching ----------
loginTab.addEventListener('click', () => {
  mode = 'login';
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  submitBtn.textContent = 'Login';
  authError.textContent = '';
});

signupTab.addEventListener('click', () => {
  mode = 'signup';
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  submitBtn.textContent = 'Sign Up';
  authError.textContent = '';
});

// ---------- Form Submit ----------
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  authError.textContent = '';

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    if (mode === 'signup') {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
    // Success — go to the shop
    window.location.href = 'index.html';
  } catch (err) {
    authError.textContent = friendlyError(err.code);
  }
});

// ---------- Friendly error messages ----------
function friendlyError(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'That email is already registered. Try logging in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password.';
    default:
      return 'Something went wrong. Please try again.';
  }
}