// firebase-config.js — إعدادات Firebase لمتجر سامح و سامي

const firebaseConfig = {
  apiKey: "AIzaSy...اكتب_بتاعك_هنا",
  authDomain: "pharmacy-admin.firebaseapp.com",
  projectId: "pharmacy-admin",
  storageBucket: "pharmacy-admin.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
